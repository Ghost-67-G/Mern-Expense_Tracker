import React from "react";
import Profile from "../Components/Profile";
import Header from "../Components/Header";

const Main = () => {
  return (
    <div className="md:flex sm:block md:p-12 sm:p-5 gap-20 justify-center">
      <Profile />
      <Header />
    </div>
  );
};

export default Main;
