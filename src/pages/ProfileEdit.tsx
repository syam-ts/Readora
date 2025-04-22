import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

            const {data} = await axios.get(`http://localhost:3000/user/profile/${userId}`);

            setUser(data.user);
        };

        fetchUserData();
     }catch(err){
        console.log('ERROR: ',err);
     }
    }, [])



  return (
    <div className="max-w-2xl mx-auto px-4 py-44 font-sans text-gray-800">
      <div className="flex items-center gap-4 mb-10">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className='grid'>
          <input className="text-2xl font-semibold" placeholder={user.name} /> 
          <input className="text-sm font-regular" placeholder={user.email} /> 
          <button className='flex underline text-blue-600'>Edit</button>
        </div>
      </div>

      <div className="space-y-6 text-sm text-gray-700">
        <div>
          
          <input className="text-gray-400 mb-1" value={user.phone} /> 
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

export default ProfileEdit;
