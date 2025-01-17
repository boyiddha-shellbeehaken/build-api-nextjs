// Call DELETE API with static DB //
"use client";

// Delete User Component
export default function DeleteUser(props) {
  const id = props.id;
  //console.log(id);
  const handleDelete = async () => {
    let res = await fetch("http://localhost:3000/api/users/" + id, {
      method: "DELETE",
    });
    res = await res.json();
    if (res.success) {
      alert("Deleted");
    } else {
      alert("Error, Try again");
    }
  };
  return <button onChange={handleDelete}>Delete</button>;
}
