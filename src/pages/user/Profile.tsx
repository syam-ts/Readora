import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiInstance } from "../../api/axiosInstance/axiosInstance";
import ProfileShimmer from "../../components/shimmer/ProfileShimmer";

interface User {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  phone: number;
  location: string;
  gender: string;
  dob: number;
  preferences: string[];
  noOfArticles: number;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    profilePicture: "",
    phone: 0,
    location: "",
    gender: "",
    dob: 0,
    preferences: [""],
    noOfArticles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await apiInstance.get(`/user/profile`);

        setUser(data.user);
      } catch (err) {
        console.log("ERROR: ", err);
      } finally {
      setLoading(false);
    }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <ProfileShimmer />
        </div>
      ) : ( 
        <div className="w-full max-w-4xl mx-auto px-4 py-44 font-sans text-gray-800">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/*  Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 object-cover border border-gray-300 rounded-xl"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                {/* Name */}
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                {/* Email */}
                <p className="text-sm text-gray-500">{user.email}</p>
                <Link
                  to="/Profile/edit"
                  className="inline-block text-blue-600 underline text-sm mt-1"
                >
                  Edit
                </Link>
              </div>

              {/* Info */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <p className="text-gray-400">Phone</p>
                  <p>{user.phone}</p>
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-400">Gender</p>
                  <p>{user.gender}</p>
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-400">Location</p>
                  <p>{user.location}</p>
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-400">Date of Birth</p>
                  <p>{new Date(user.dob).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <p className="text-gray-400 mb-2">Preferences</p>
                <div className="flex flex-wrap gap-3">
                  {user.preferences.map((pref: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-sm px-3 py-1 rounded-full border border-gray-300"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
   
       
    </div>
  );
};

export default Profile;
