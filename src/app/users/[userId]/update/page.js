// Call PUT API with static DB//
"use client";

import React, { useState, useEffect } from "react";

import "./../../../style.css";

export default function Page({ params }) {
  const { userId } = React.use(params);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  //console.log(userId);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    let data = await fetch("http://localhost:3000/api/users/" + userId);
    data = await data.json();
    setName(data.name);
    setAge(data.age);
    setEmail(data.email);
  };

  const updateUser = async () => {
    //console.log(name, age, email);
    let data = await fetch("http://localhost:3000/api/users/" + userId, {
      method: "PUT",
      body: JSON.stringify({ name, age, email }),
    });
    data = await data.json();
    console.log(data);
    if (data.success) {
      alert("User information updated");
    } else {
      alert("Please try with correct info");
    }
  };
  return (
    <div>
      <h1>Update User Details:</h1>
      <input
        type="text"
        value={name}
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        value={age}
        placeholder="Enter Age"
        onChange={(e) => setAge(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        value={email}
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <button onClick={updateUser} className="btn">
        Update User
      </button>
    </div>
  );
}
