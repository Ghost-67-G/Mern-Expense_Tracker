import React from "react";
import Profile from "../Components/Profile";
import Header from "../Components/Header";

const Main = () => {
  return (
    <div className="flex p-20 gap-20 justify-center">
      <Profile />
      <Header />
    </div>
  );
};

export default Main;
