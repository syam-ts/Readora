import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { UserState } from "../../config/UserStateConftg";
import { categories } from "../../utils/constants/categories";
import { apiInstance } from "../../api/axiosInstance/axiosInstance"; 
import { userProfileSchema } from "../../utils/validation/userProfileSchema";
import { ErrorComponent } from "../../components/errorComponents/ErrorComponent";

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
  const navigate = useNavigate();

  const userId = useSelector((state: UserState) => state.currentUser._id);

  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const { data } = await apiInstance.get(
          `/profile/${userId}`
        );

        setUser(data.user);
      };

      fetchUserData();
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const { data } = await apiInstance.get(
          `/profile/${userId}`
        );
        setUser(data.user);
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
    console.log("TH pre : 1st: ", preferencesInput);
    if (preferencesInput && !preferences.includes(preferencesInput)) {
      setPreferences((prev) => [...prev, preferencesInput]);
      setPreferencesInput("");
    }
  };
  console.log("Th rpe", preferences);

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
        const { data } = await apiInstance.put(
          `/user/profile`,
          {
            userId,
            name: user.name,
            profilePicture: user.profilePicture,
            phone: user.phone,
            dob: user.dob,
            gender: user.gender,
            location: user.location,
            preferences: preferences,
          }
        );

        if (data.success) {
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
    <div className="w-full grid justify-center px-4 py-20 font-sans text-gray-800">
      <label className="text-lg">Profile Picture</label>
      <div className="flex">
        <input
          type="file"
          accept="image/*"
          placeholder={user.profilePicture}
          onChange={(e) => handleImageChange(e)}
          className="text-gray-700 text-sm"
        />
        <img src={user.profilePicture} className="w-16 h-16 rounded-full" />
      </div>

      <div>
        <div className="text-sm text-gray-700 pt-5">
          <div className="flex gap-4">
            <label className="text-lg">Name</label>
            <input
              onChange={(e) => onChangeHandler(e)}
              name="name"
              value={user.name}
              className="text-sm font-semibold outline-none underline"
            />
            <ErrorComponent
              error={error}
              e1="Name is required"
              e2="Invalid name (minimum 5 characters)"
              e3="Invalid name (maximum 20 characters)"
            />
          </div>

          <div className="flex gap-3 pt-5">
            <label className="text-lg">Phone</label>
            <input
              onChange={(e) => onChangeHandler(e)}
              name="phone"
              className="outline-none text-sm underline"
              value={user.phone?.toString()}
            />
            <ErrorComponent
              error={error}
              e1="Phone Number is required"
              e2="Invalid Number (must be positive)"
              e3="Invalid Number (must be at least 10 digits)"
            />
          </div>

          <div className="pt-5">
            <form className="w-44 flex gap-5">
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                Gender
              </label>
              <select
                onChange={(e) => onChangeHandler(e)}
                name="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>{user.gender}</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </form>
          </div>

          <div className="flex gap-3 pt-5">
            <label className="text-lg">Location</label>
            <input
              onChange={(e) => onChangeHandler(e)}
              name="location"
              value={user.location}
              className="text-sm font-semibold outline-none underline"
              placeholder={user.location}
            />
            <ErrorComponent
              error={error}
              e1="Location is required"
              e2="Invalid location (minimum 5 characters)"
              e3="Invalid location (maximum 20 characters)"
            />
          </div>

          <div className="flex gap-3 pt-5">
            <p className="text-lg">Date of Birth</p>
            <p>
              <input
                onChange={(e) => onChangeHandler(e)}
                name="dob"
                type="date"
                value={String(user.dob)}
                className="outline-none text-sm underline"
              />
            </p>
            <ErrorComponent
              error={error}
              e1="Date of Birth is required"
              e2="Date of Birth must be a valid date"
              e3="Date of Birth cannot be in the future"
            />
          </div>

          <div className="pt-3">
            <div className="flex flex-wrap gap-2">
              <div className="">
                <label className="text-lg">Preferences</label>

                <div className="flex flex-wrap gap-2 mb-2">
                  {preferences.map((preference) => (
                    <span
                      key={preference}
                      className="text-xs bg-neutral-100 px-3 p-4 py-1 rounded-full flex items-center"
                    >
                      {preference}
                      <button
                        onClick={() => removePreference(preference)}
                        className="ml-2 text-neutral-400 hover:text-neutral-600"
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>

                <div className="grid gap-2">
       
                  <div className="flex gap-5">
                    <select
                      name="prefrences"
                      onChange={(e) => setPreferencesInput(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 w-[10rem] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {categories.map((category: string) => (
                        <div>
                          <option value={category}>{category}</option>
                        </div>
                      ))}
                    </select>

                    <button
                      onClick={addPreference}
                      className="text-xs text-white font-bold bg-sky-600 rounded-md w-[5rem] py-3 hover:text-black transition cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <ErrorComponent
                  error={error}
                  e1="Preferences required"
                  e2="Minimum 3 preferences needed"
                  e3="Maximum 5 preferences are allowed"
                />

                <div>
                  <button
                    onClick={submitForm}
                    className="rounded-md bg-sky-600 py-1.5 mt-6 px-10 cursor-pointer text-center text-sm text-white font-bold"
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
    </div>
  );
};

export default ProfileEdit;
