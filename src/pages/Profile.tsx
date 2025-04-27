import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiInstance } from "../api/axiosInstance/axiosInstance";

interface User {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  phone: number;
  dob: number;
  preferences: string[];
}

const Profile: React.FC = () => {

    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
        profilePicture: '',
        phone: 0,
        dob: 0,
        preferences: [''],
    })

    const userId = useSelector((state: any) => state.currentUser._id);


    useEffect(() => {
     try{
        const fetchUserData = async () => {

            const {data} = await apiInstance.get(`http://localhost:3000/profile/${userId}`);

            setUser(data.user);
        };

        fetchUserData();
     }catch(err){
        console.log('ERROR: ',err);
     }
    }, [])



  return (
    <div className="max-w-2xl mx-auto px-4 py-28 font-sans text-gray-800">
      <div className="flex items-center gap-4 mb-10">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <button className='underline text-blue-600'>
            <Link to='/Profile/edit'>
            Edit
            </Link>
          </button>
        </div>
      </div>

      <div className="space-y-6 text-sm text-gray-700">
        <div>
          <p className="text-gray-400 mb-1">Phone</p>
          <p>{user.phone}</p>
        </div>

        <div>
          <p className="text-gray-400 mb-1">Date of Birth</p>
          <p>{new Date(user.dob).toLocaleDateString()}</p>
        </div>

        {/* <div>
          <p className="text-gray-400 mb-1">Password</p>
          <p className="text-gray-500 italic">••••••••••</p>
        </div> */}

        <div>
          <p className="text-gray-400 mb-2">Preferences</p>
          <div className="flex flex-wrap gap-2">
            {/* {user.preferences?.map(pref => (
              <span
                keyuser.pref}
                className="bg-gray-100 text-sm px-3 py-1 rounded-full"
              >
                {pref}
              </span>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
