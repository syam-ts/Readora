import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  phone: number;
  dob: number;
  preferences: string[];
}

const ProfileEdit: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    profilePicture: "",
    phone: 0,
    dob: 0,
    preferences: [""],
  });
  const [formData, setFormData] = useState<User>({
    name: user.name,
    email: "",
    password: "",
    profilePicture: user.profilePicture,
    phone: user.phone,
    dob: user.dob,
    preferences: user.preferences,
  });
  const [preferences, setPreferences] = useState<string[]>([]);
  const [preferencesInput, setPreferencesInput] = useState("");
  const navigate = useNavigate();

  const userId = useSelector((state: any) => state.currentUser._id);

  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const { data } = await axios.get(
          `http://localhost:3000/user/profile/${userId}`
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

  const submitForm = async () => {
    try {
      console.log('The form: ', formData)
      const body = {
        userId,
        name: formData.name || user.name,
        profilePicture: formData.profilePicture || user.profilePicture,
        phone: formData.phone || user.phone,
        dob: formData.dob || user.dob,
        preferences: preferences || user.preferences
      };

      const { data } = await axios.post(
        "http://localhost:3000/user/profile-edit",
        {
          body,
        }
      );

      console.log("The result after edit: ", data);

      if (data.success) {
        navigate("/profile");
      }


    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-44 font-sans text-gray-800">
      <div className="flex items-center gap-4 mb-10">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="grid">
          <input onChange={(e) => onChangeHandler(e)} name='name' value={formData.name} className="text-2xl font-semibold" placeholder={user.name} />
          <input className="text-sm font-regular" placeholder={user.email} />
        </div>
      </div>

      <div className="space-y-6 text-sm text-gray-700">
        <div>
          <input
          onChange={(e) => onChangeHandler(e)} name='phone'
            className="text-gray-500 mb-1 outline-none"
            placeholder="phone"
          />
        </div>

        <div>
          <p className="text-gray-400 mb-1 ">Date of Birth</p>
          <p>
            <input onChange={(e) => onChangeHandler(e)} name='dob' placeholder="date" className="outline-none" />
          </p>
        </div>

        {/* <div>
          <p className="text-gray-400 mb-1">Password</p>
          <p className="text-gray-500 italic">••••••••••</p>
        </div> */}

        <div> 
          <div className="flex flex-wrap gap-2">
            {/* {user.preferences?.map(pref => (
              <span
                keyuser.pref}
                className="bg-gray-100 text-sm px-3 py-1 rounded-full"
              >
                {pref}
              </span>
            ))} */}
            <div className="mb-12">
              <label className="text-xs text-neutral-500 block mb-2">
                Preferences
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {preferences.map((preference) => (
                  <span
                    key={preference}
                    className="text-xs bg-neutral-100 px-3 py-1 rounded-full flex items-center"
                  >
                    {preference}
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
