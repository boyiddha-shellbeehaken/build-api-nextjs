// POST API Call with static DB //
"use client";
import { useState } from "react";
import "./../style.css";

export default function Page() {
  // client component can't be async await but it's insider function can use async await
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = async () => {
    //console.log(name, age, email);
    let res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({ name, age, email }),
    });
    res = await res.json();
    //console.log(res);
    if (res.success) {
      alert("new user added");
    }
  };

  return (
    <div className="add-user">
      <h1>Add New user</h1>
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
      <button onClick={handleClick} className="btn">
        Add User
      </button>
    </div>
  );
}
