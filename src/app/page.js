"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState();
  const onSubmit = async (e) => {
    //console.log(file);
    e.preventDefault();
    const data = new FormData();
    data.set("uploadFile", file);
    let result = await fetch("api/upload", {
      method: "POST",
      body: data,
    });
    result = await result.json();
    console.log(result);
    if (result.success) {
      alert("File Uploaded");
    } else {
      alert("File Upload Failed");
    }
  };
  return (
    <main className={styles.main}>
      <Link href="/addproduct">Add Product</Link>
      <Link href="/products">Products List</Link>

      {/* File Upload Section  */}

      <div>
        <h1>Upload Image</h1>
        <fom>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <button onClick={onSubmit} type="submit">
            Upload Image
          </button>
        </fom>
      </div>
    </main>
  );
}
