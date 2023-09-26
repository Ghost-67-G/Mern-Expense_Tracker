import React from "react";

const Profile = () => {
  return (
    <div className="py-10 border  text-center rounded  ">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <img
        src="/pp2.png"
        alt="Profile"
        className="w-[10rem] h-auto rounded-full m-auto"
      />
      <h2> Remaing Balance 150000</h2>
      <div className="border border-t-2 text-center flex gap-10 px-10 ">
        <h2>Total Expense 5000</h2>
        <h2>Total Income 20000</h2>
      </div>
      <div>
        <h1 className="text-2xl">User Information</h1>

        <h1 className="text-start py-2 pl-5">Name</h1>
        <h1 className="text-start py-2 pl-5">Email</h1>
        <h1 className="text-start py-2 pl-5">Role</h1>
        <h1 className="text-start py-2 pl-5">Status</h1>
      </div>
    </div>
  );
};

export default Profile;
