"use client";

import axios from "axios";
import React from "react";

export default function ProfilePage() {
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
  };
  React.useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
}
