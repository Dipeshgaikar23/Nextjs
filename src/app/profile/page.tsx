"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
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
    </div>
  )
}

export default ProfilePage;