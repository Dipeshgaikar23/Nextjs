"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] =  React.useState<any>(null);
  const getData = async () => {
    try {                     

      const response = await axios.get("/api/users/me");
      console.log("user data", response.data.user);
      toast.success("User data fetched successfully");
      setUserData(response.data.user);
    }catch(error: any){
      console.log("get user data failed", error.message)
      toast.error("Error occured")
    }
  }
  const logout = async () => {
    try {

      const response = await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push('/login');

    } catch (error:any) {

      console.log("logout failed", error.message)
      toast.error("Error occured")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
    <div >ProfilePage</div>
    <button
    onClick={logout}
    className='bg-blue-400 text-white mt-4 p-2 rounded-lg cursor-pointer'
    >Logout</button>
    <button
    onClick={getData}
    className='bg-blue-400 text-white mt-4 p-2 rounded-lg cursor-pointer'
    >Get User Details</button>
    {userData && (<div className="mt-4">
      <h2 className="text-xl font-bold mb-2">User Details:</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>)}
    </div>
  )
}

export default ProfilePage;