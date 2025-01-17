import Link from "next/link";

import "./../style.css";
import DeleteUser from "@/util/DeleteUser";

async function getUsers() {
  let data = await fetch("http://localhost:3000/api/users");
  data = await data.json();
  return data;
}

export default async function Page() {
  // Server Component can be async await
  const users = await getUsers();
  //console.log(users);
  return (
    <div>
      <h1>Users Page</h1>
      {users.map((item) => (
        <div key={item.id} className="user-item">
          <span>
            <Link href={`users/${item.id}`}>{item.name}</Link>
          </span>
          <span>
            <Link href={`users/${item.id}/update`}>{" -- Edit"}</Link>
          </span>
          <DeleteUser id={item.id} />

          {/* Client Component Can't Support async await but Server component does!
          Server Component Can't Support Event handling but Client component does!
          So we use separate client component for Event and
          Server Component for async await. Then import the client component in the server component */}
        </div>
      ))}
    </div>
  );
}
