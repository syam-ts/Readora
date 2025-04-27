import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProfileSchema } from "../utils/validation/userProfileSchema";
import { ErrorComponent } from "../components/ErrorComponent";
import { apiInstance } from "../api/axiosInstance/axiosInstance";

interface User {
  name: string;
  profilePicture: string;
  phone: number | null;
  dob: number | null;
  preferences: string[];
}

const ProfileEdit: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    profilePicture: "",
    phone: null,
    dob: null,
    preferences: [""],
  });
  const [preferences, setPreferences] = useState<string[]>([]);
  const [preferencesInput, setPreferencesInput] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const userId = useSelector((state: any) => state.currentUser._id);
  
  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const { data } = await apiInstance.get(
          `http://localhost:3000/profile/${userId}`
        );
        
        setUser(data.user);
      };
      
      fetchUserData();
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }, []);
  
  const [formData, setFormData] = useState<User>({
    name: user.name,
    profilePicture: user.profilePicture,
    phone: user.phone,
    dob: user.dob,
    preferences: user.preferences,
  });
  console.log('The form', formData, user)

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addPreference = () => {
    if (preferencesInput && !preferences.includes(preferencesInput)) {
      setPreferences((prev) => [...prev, preferencesInput]);
      setPreferencesInput("");
    }
  };

  const removePreference = (preference: string) => {
    setPreferences(preferences.filter((p) => p !== preference));
  };



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // const file = e.target.files[0];
    // if (!file) return;

    // const data = new FormData();
    // data.append("file", file);
    // data.append("upload_preset", "devlink-userProfle"),
    //   data.append("cloud_name", "dusbc29s2");

    // console.log("file", [...data.entries()]);
    // const response = await cloudinaryInstance.post("", data);
    // console.log("finl imag: ", response.data?.url);




    const file = e.target.files?.[0];

    
    if (!file || Array(file).length === 0) {
      setImageError(['Profile Picture required']);
      return;
    };

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 3 * 1024 * 1024; // 3MB

    if (!validTypes.includes(file.type)) {
      setImageError(['Invalid file type. Only JPEG, PNG, and WEBP are allowed']);
      return;
    }

    if (file.size > maxSize) {
      setImageError(['File size must be under 3MB']);
      return;
    }

    setImageError([]);
    const reader = new FileReader();
    reader.onloadend = () => {
      onChangeHandler({ target: { name: 'profilePicture', value: reader.result } });
    };
    reader.readAsDataURL(file);
  };
  console.log('Image Error: ', imageError)


  const submitForm = async () => {
    try {
      const data = {
        name: formData.name,
        profilePicture: formData.profilePicture,
        phone: formData.phone,
        dob: formData.dob,
        preferences: preferences
      }

      console.log('THE FORM: ', data);

      const validForm = await userProfileSchema.validate(data, {
        abortEarly: false
      });


      if (validForm) {

        const body = {
          userId,
          name: formData.name || user.name,
          profilePicture: formData.profilePicture || user.profilePicture,
          phone: formData.phone || user.phone,
          dob: formData.dob || user.dob,
          preferences: preferences || user.preferences
        };

        const { data } = await apiInstance.put(
          "http://localhost:3000/user/profile",
          {
            body,
          }
        );


        if (data.success) {
          navigate("/profile");
        }

      } else {
        await userProfileSchema.validate({ formData }, {
          abortEarly: false
        });
      }


    } catch (error: unknown) {
      const err = error as { errors: string[] };
      console.log("VALIDATION ERROR: ", err.errors);
      setError(err.errors);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-44 font-sans text-gray-800">


      <div className="grid">
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          placeholder={user.profilePicture}
          onChange={(e) => handleImageChange(e)}
          className="text-gray-700 text-sm"
        />
        <img src={formData.profilePicture} className='w-16 h-16 rounded-full' />
      </div>

      <ErrorComponent error={imageError}
        e1='Profile Picture required'
        e2='Invalid file type. Only JPEG, PNG, and WEBP are allowed'
        e3='File size must be under 3MB'
      />

      <div className="space-y-6 text-sm text-gray-700">
        <div className="grid">
          <label>Name</label>
          <input onChange={(e) => onChangeHandler(e)} name='name' value={formData.name}
            className="text-2xl font-semibold outline-none" placeholder={user.name} />
        </div>

        <ErrorComponent error={error}
          e1='Name is required'
          e2='Invalid name (minimum 5 characters)'
          e3='Invalid name (maximum 20 characters)'
        />



        <div className='grid'>
          <label>Phone</label>
          <input
            onChange={(e) => onChangeHandler(e)}
            name='phone'
            className="text-gray-500 mb-1 outline-none"
            type='number'

            placeholder={user.phone ? String(user.phone) : "Enter phone number"}
          />
        </div>

        <ErrorComponent error={error}
          e1='Phone Number is required'
          e2='Invalid Number (must be positive)'
          e3='Invalid Number (must be at least 10 digits)'
        />

        <div>
          <p className="text-gray-400 mb-1 ">Date of Birth</p>
          <p>
            <input onChange={(e) => onChangeHandler(e)} name='dob'
              type='date'
              placeholder={String(user.dob)}
              className="outline-none" />
          </p>
        </div>

        <ErrorComponent error={error}
          e1='Date of Birth is required'
          e2='Date of Birth must be a valid date'
          e3='Date of Birth cannot be in the future'
        />


        <div>
          <div className="flex flex-wrap gap-2">

            <div className="mb-12">
              <label>Preferences</label>

              <div className="flex flex-wrap gap-2 mb-2">
                {preferences.map((preference) => (
                  <span
                    key={preference}
                    className="text-xs bg-neutral-100 px-3 p-4 py-1 rounded-full flex items-center"
                  >
                    {preferences}
                    <button
                      onClick={() => removePreference(preference)}
                      className="ml-2 text-neutral-400 hover:text-neutral-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  name="tags"
                  value={preferencesInput}
                  onChange={(e) => setPreferencesInput(e.target.value)}
                  placeholder="Enter a preference"
                  className="w-2/4 text-xs placeholder-neutral-400 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none"
                />
                <button
                  onClick={addPreference}
                  className="text-xs text-neutral-600 hover:text-black transition cursor-pointer"
                >
                  Add
                </button>
              </div>

              <ErrorComponent error={error}
                e1='Preferences required'
                e2='Minimum 3 preferences needed'
                e3='Maximum 5 preferences are allowed'
              />

              <div>
                <button
                  onClick={submitForm}
                  className="rounded-md bg-sky-500 py-1 mt-6 px-4 border border-transparent cursor-pointer text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                  type="button"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
