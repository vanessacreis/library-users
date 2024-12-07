import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Plus } from "lucide-react";
import { dataWithError } from "remix-toast";
import { UserCard } from "~/components/UserCard";

export async function loader(): Promise<User[]> {
  try {
    const response = await fetch("https://674f9eeebb559617b26fa7f3.mockapi.io/library/users");
    return response.json();
  } catch (error) {
    return dataWithError([], "Erro ao buscar os usuários.");
  }
}

export default function UsersIndex() {
  const users = useLoaderData<typeof loader>();

  return (
    <div className="flex">
      <div className="w-[50%] flex flex-col gap-4 px-4">
        <div className="flex items-center gap-6">
          <h1 className="text-lg text-blue-500 font-bold">Lista de usuários</h1>
          <Link to="/users/new" className="text-blue-500">
            <Plus width={20}/>
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
