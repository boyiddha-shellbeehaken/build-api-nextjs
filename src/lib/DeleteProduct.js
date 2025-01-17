"use client";

import { useRouter } from "next/navigation";

// Delete Product Component

export default function DeleteProduct(props) {
  const router = useRouter();
  const deleteRecord = async () => {
    let response = await fetch(
      "http://localhost:3000/api/products/" + props.id,
      {
        method: "DELETE",
      }
    );
    response = await response.json();
    if (response.success) {
      alert("Product Deleted");
      router.push("/products"); // when click on ok alert box button it direct to this path
    }
  };
  return <button onClick={deleteRecord}>Delete</button>;
}
