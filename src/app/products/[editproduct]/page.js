//Call PUT API With MongoDB //
"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import "../../style.css";
import Link from "next/link";

export default function Page({ params }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");

  // In Server side we use params( dynamic routing id) directly as a props
  // But in client side as param return a promise It must be resolved first

  // :: Way 1/2:: useParams Hook to get params in client components  => in Page({params}) props don't need
  //const params = useParams();
  //const id = params.editproduct;

  // :: Way 2/2:: useParams Hook to get params in client components  => in Page({params}) props don't need
  //const params = useParams();
  //const { editproduct } = params;

  //:: Way 3:: using React use ==> params must be in Page({params}) as props

  const { editproduct } = React.use(params);

  useEffect(() => {
    //console.log(editproduct);
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let productData = await fetch(
      "http://localhost:3000/api/products/" + editproduct
    );
    productData = await productData.json();
    //console.log(productData);
    if (productData.success) {
      let res = productData.result;
      setName(res.name);
      setPrice(res.price);
      setColor(res.color);
      setCompany(res.company);
      setCategory(res.category);
    }
  };

  const updateProduct = async () => {
    //console.log(name, age, email);
    let data = await fetch(
      "http://localhost:3000/api/products/" + editproduct,
      {
        method: "PUT",
        body: JSON.stringify({ name, price, color, company, category }),
      }
    );
    data = await data.json();
    console.log(data);
    if (data.success) {
      alert("Product information updated");
    } else {
      alert("Please try with correct info");
    }
  };

  return (
    <div>
      <h1>Update Product Page</h1>
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
      <button onClick={updateProduct} className="btn">
        Update Product
      </button>
      <Link href={"/products"}>Got to Product List</Link>
    </div>
  );
}
