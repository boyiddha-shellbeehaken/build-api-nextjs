async function getUser(id) {
  let data = await fetch(`http://localhost:3000/api/users/${id}`);
  console.log(data);
  data = await data.json();
  return data;
}

export default async function Page({ params }) {
  const { userId } = await params;
  const user = await getUser(userId);
  //console.log(user);
  return (
    <div>
      <h2>User Details</h2>
      <h4>Name: {user.name}</h4>
      <h4>Email: {user.email}</h4>
      <h4>Age: {user.age}</h4>
    </div>
  );
}
