// interface PageProps {
//   params: {
//     id: string;
//   };
// }

export default async function UserProfile({ params }: any) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">ProfilePage 
       <span className="bg-orange-400 p-2 mx-2 rounded text-black">{id}</span> 
        </p>
    </div>
  );
}
