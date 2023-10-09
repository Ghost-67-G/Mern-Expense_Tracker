import axios from "axios";
import React from "react";
import { BsCashStack } from "react-icons/bs";
import { MdAccountBalance } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
 const user = useSelector((store) => store.user);
  //const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const logout = async()=>{
    console.log("hello")
 await axios.get('/api/user/logout')
toast.success("logout Successfully")
window.location.reload()
  }
  return (
    <div className="py-10 md:w-1/4 sm:w-full border text-center rounded  ">
      <h2 className=":text-2xl  font-semibold mb-4">Your Profile</h2>
      <div className="border rounded-full inline-block py-4 bg-blue-300 px-2">
        <img
          src="/download.png"
          alt="Profile"
          className="w-[10rem] h-auto rounded-full m-auto"
        />
      </div>
      <div className="flex items-center justify-center my-6 gap-3">
        <MdAccountBalance color="#4b4bd5" size={30} />
        <span className="text-xl font-semibold">${user.totalBalance}</span>
      </div>
      <div className="border-t-2 border-b-2  justify-center  flex gap-10 px-10 ">
        <div className="flex my-3  items-center gap-3">
          <BsCashStack color="green" size={30} />
          <span className="text-xl font-semibold">${user.income}</span>
        </div>
        <div className="border"></div>
        <div className="flex items-center gap-3">
          <BsCashStack color="red" size={30} />{" "}
          <span className="text-xl font-semibold">${user.expense}</span>
        </div>
      </div>
      <div>
        <h1 className="text-2xl">User Information</h1>

        <h1 className="text-start py-2 pl-5">
          Name: <span>{user.userName}</span>
        </h1>
        <h1 className="text-start py-2 pl-5">
          Email: <span>{user.email}</span>
        </h1>
        <h1 className="text-start py-2 pl-5">
          Role: <span>{user.role}</span>
        </h1>
        <h1 className="text-start py-2 pl-5">
          Status: <span>{user.status}</span>
        </h1>
      </div>
      <button className="bg-red-500 rounded px-3 py-2 font-semibold text-white mt-2" onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
