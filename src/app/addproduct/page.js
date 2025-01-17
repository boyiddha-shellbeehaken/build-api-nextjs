// Call POST API With MongoDB //
"use client";
import { useState } from "react";
import "../style.css";

export default function Page() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");

  const handleAddProduct = async () => {
    //console.log(name, price, color, company, category);
    let res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price, color, company, category }), // convert js {obj.} or array into json formatted string
    });
    res = await res.json(); // convert json string or json data into js {obj.} or js array
    if (res.success) {
      alert("New Product Added");
    } else {
      alert("Failed, Try again");
    }
  };
  return (
    <div>
      <h1>Add Product Page</h1>
      <input
        className="input-field"
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Enter Product Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleAddProduct} className="btn">
        Add Product
      </button>
    </div>
  );
}
