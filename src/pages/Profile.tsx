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
  location: string;
  gender: string;
  dob: number;
  preferences: string[];
  noOfArticles: number
}

const Profile: React.FC = () => {

  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    profilePicture: '',
    phone: 0,
    location: "",
    gender: "",
    dob: 0,
    preferences: [''],
    noOfArticles: 0
  })

  const userId = useSelector((state: any) => state.currentUser._id);


  useEffect(() => {
    try {
      const fetchUserData = async () => {

        const { data } = await apiInstance.get(`http://localhost:3000/profile/${userId}`);

        setUser(data.user);
      };

      fetchUserData();
    } catch (err) {
      console.log('ERROR: ', err);
    }
  }, [])



  return (
    <div className="w-full justify-center flex mx-auto px-4 py-28 font-sans text-gray-800">
      <div className=" items-center gap-4 mb-10">

        <div className='flex gap-5 py-5'>
          <div>
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
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
          <div className='flex gap-5'>
            <p className="text-gray-400 mb-1">Phone</p>
            <p>{user.phone}</p>
          </div>
          <div className='flex gap-5'>
            <p className="text-gray-400 mb-1">Gender</p>
            <p>{user.gender}</p>
          </div>
          <div className='flex gap-5'>
            <p className="text-gray-400 mb-1">Location</p>
            <p>{user.location}</p>
          </div>

          <div className='flex gap-5'>
            <p className="text-gray-400 mb-1">Date of Birth</p>
            <p>{new Date(user.dob).toLocaleDateString()}</p>
          </div>



          {/* <div>
          <p className="text-gray-400 mb-1">Password</p>
          <p className="text-gray-500 italic">••••••••••</p>
        </div> */}

          <div>
            <p className="text-gray-400 mb-2">Preferences</p>
            <div className="flex flex-wrap gap-3 pt-3">
              {
                user.preferences.map((pref: string) => (
                  <p className='bg-gray-200 text-sm px-3 py-1 rounded-full'>{pref}</p>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
