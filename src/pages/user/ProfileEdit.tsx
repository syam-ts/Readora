import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react"; 
import { categories } from "../../utils/constants/categories"; 
import { userProfileSchema } from "../../utils/validation/userProfileSchema";
import { ErrorComponent } from "../../components/errorComponents/ErrorComponent";
import { apiInstance } from "../../services/axios/axiosInstance/axiosInstance";

interface User {
  name: string;
  profilePicture: string;
  phone: number | null;
  dob: number | null;
  gender: string;
  location: string;
  preferences: string[];
}

const ProfileEdit: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    profilePicture: "",
    phone: null,
    dob: null,
    gender: "",
    location: "",
    preferences: [""],
  });
  const [preferences, setPreferences] = useState<string[]>([]);
  const [preferencesInput, setPreferencesInput] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
 

  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const { data } = await apiInstance.get(
          `/user/profile`
        );
        setUser(data.user);
        setPreferences(data.user.preferences)
      };

      fetchUserData();
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }, []);

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
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
    const file = e.target.files?.[0];

    if (!file || Array(file).length === 0) {
      setImageError(["Profile Picture required"]);
      return;
    }

    const validTypes: string[] = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 3 * 1024 * 1024; // 3MB

    if (!validTypes.includes(file.type)) {
      setImageError([
        "Invalid file type. Only JPEG, PNG, and WEBP are allowed",
      ]);
      return;
    }

    if (file.size > maxSize) {
      setImageError(["File size must be under 3MB"]);
      return;
    }

    setImageError([]);
    const reader = new FileReader();
    reader.onloadend = () => {
      onChangeHandler({
        target: { name: "profilePicture", value: reader.result },
      });
    };
    reader.readAsDataURL(file);
  };
  console.log("Image Error: ", imageError);

  const submitForm = async () => {
    try {
      const data = {
        name: user.name,
        profilePicture: user.profilePicture,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        location: user.location,
        preferences: preferences,
      };

      const validForm = await userProfileSchema.validate(data, {
        abortEarly: false,
      });

      if (validForm) {
        setLoading(true);
        const { data } = await apiInstance.put(
          `/user/profile`,
          {
            name: user.name,
            profilePicture: user.profilePicture,
            phone: user.phone,
            dob: user.dob,
            gender: user.gender,
            location: user.location,
            preferences: preferences,
          }, {
            withCredentials: true
          }
        );

        if (data.success) {
          setLoading(false);
          navigate("/profile");
        }
      } else {
        await userProfileSchema.validate(
          { user },
          {
            abortEarly: false,
          }
        );
      }
    } catch (error: unknown) {
      const err = error as { errors: string[] };
      console.log("VALIDATION ERROR: ", err.errors);
      setError(err.errors);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-6 py-10 font-sans text-gray-800 nunito-regular">
  <h2 className="text-2xl font-bold mb-8 text-center">Edit Profile</h2>

  {/* Profile Picture */}
  <div className="mb-6">
    <label className="block text-lg font-medium mb-2">Profile Picture</label>
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-sm text-gray-700 border border-gray-300 rounded-md file:mr-3 file:py-1 file:px-3 file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      />
      <img
        src={user.profilePicture}
        alt="Profile"
        className="w-16 h-16 rounded-full object-cover border border-gray-300"
      />
    </div>
  </div>

  {/* Name */}
  <div className="mb-5">
    <label className="block text-lg font-medium mb-1">Name</label>
    <input
      onChange={onChangeHandler}
      name="name"
      value={user.name}
      className="w-full border-b-2 border-gray-300 outline-none text-sm py-2 focus:border-sky-600"
    />
    <ErrorComponent
      error={error}
      e1="Name is required"
      e2="Invalid name (minimum 5 characters)"
      e3="Invalid name (maximum 20 characters)"
    />
  </div>

  {/* Phone */}
  <div className="mb-5">
    <label className="block text-lg font-medium mb-1">Phone</label>
    <input
      onChange={onChangeHandler}
      name="phone"
      className="w-full border-b-2 border-gray-300 outline-none text-sm py-2 focus:border-sky-600"
      value={user.phone?.toString()}
    />
    <ErrorComponent
      error={error}
      e1="Phone Number is required"
      e2="Invalid Number (must be positive)"
      e3="Invalid Number (must be at least 10 digits)"
    />
  </div>

  {/* Gender */}
  <div className="mb-5">
    <label className="block text-lg font-medium mb-1">Gender</label>
    <select
      onChange={onChangeHandler}
      name="gender"
      className="w-22 bg-white border border-gray-300 text-sm rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
    >
      <option>{user.gender}</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>

  {/* Location */}
  <div className="mb-5">
    <label className="block text-lg font-medium mb-1">Location</label>
    <input
      onChange={onChangeHandler}
      name="location"
      value={user.location}
      placeholder="Enter your location"
      className="w-full border-b-2 border-gray-300 outline-none text-sm py-2 focus:border-sky-600"
    />
    <ErrorComponent
      error={error}
      e1="Location is required"
      e2="Invalid location (minimum 5 characters)"
      e3="Invalid location (maximum 20 characters)"
    />
  </div>

  {/* Date of Birth */}
  <div className="mb-5">
    <label className="block text-lg font-medium mb-1">Date of Birth</label>
    <input
      onChange={onChangeHandler}
      name="dob"
      type="date"
      value={String(user.dob)}
      className="w-full border-b-2 border-gray-300 outline-none text-sm py-2 focus:border-sky-600"
    />
    <ErrorComponent
      error={error}
      e1="Date of Birth is required"
      e2="Date of Birth must be a valid date"
      e3="Date of Birth cannot be in the future"
    />
  </div>

  {/* Preferences */}
  <div className="mb-5">
    <label className="block text-lg font-medium mb-2">Preferences</label>

    {/* Selected Preferences */}
    <div className="flex flex-wrap gap-2 mb-4">
      {preferences.map((preference) => (
        <span
          key={preference}
          className="bg-gray-200 text-sm px-4 py-1 rounded-full flex items-center"
        >
          {preference}
          <button
            onClick={() => removePreference(preference)}
            className="ml-2 text-gray-500 hover:text-red-600"
          >
            ×
          </button>
        </span>
      ))}
    </div>

    {/* Add Preference */}
    <div className="flex items-center gap-4">
      <select
        name="prefrences"
        onChange={(e) => setPreferencesInput(e.target.value)}
        className="bg-white border border-gray-300 text-sm rounded-md p-1 w-[10rem]"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button
        onClick={addPreference}
        className="readora-theme text-white px-4 py-1 text-sm font-medium rounded-md  hover:bg-sky-500 transition"
      >
        Add
      </button>
    </div>

    <ErrorComponent
      error={error}
      e1="Preferences required"
      e2="Minimum 3 preferences needed"
      e3="Maximum 5 preferences are allowed"
    />
  </div>

  {/* Submit Button */}
  <div className="text-center">
    <button
      onClick={submitForm}
      className="readora-theme hover:bg-sky-700 text-white font-semibold px-28 py-2 rounded-md text-sm"
      type="button"
    >
      {
        loading ? <p>Loading...</p> : <p>Save</p>
      }
    </button>
  </div>
</div>

  );
};

export default ProfileEdit;
