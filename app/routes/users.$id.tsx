import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { PencilLine, Trash } from "lucide-react";
import { dataWithError } from "remix-toast";

export async function loader({ params }: LoaderFunctionArgs): Promise<User> {
  const { id } = params;

  try {
    const response = await fetch(`https://674f9eeebb559617b26fa7f3.mockapi.io/library/users/${id}`);
    return response.json();
  } catch (error) {
    return dataWithError([], "Erro ao buscar os usuários.");
  }
}

export default function UserDetail() {
  const user = useLoaderData<typeof loader>();
  const {pathname} = useLocation()

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  return (
    <div className="w-full py-8">
      {pathname.includes('edit') || pathname.includes('delete') ? 
        (
          <Outlet/>
        ) : (
        <div className="max-w-2xl mx-auto p-8 shadow-md rounded-lg">
            <div className="w-full flex items-center justify-between space-x-4">
              <div className="flex gap-4 items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-2 border-gray-300"
                  />
                <div>
                  <h1 className="text-2xl font-semibold">{user.name}</h1>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div>
                <Link to={`/users/${user.id}/edit`} className="hover:text-blue-500">
                  <PencilLine width={18}/>
                </Link>
                <Link to={`/users/${user.id}/delete`} className="hover:text-blue-500">
                  <Trash  width={18}/>
                </Link>
              </div>
            </div>

            <div className="mt-4">
              <div className="mt-2">
                <p><strong>Data de Criação:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                <p><strong>Data de Nascimento:</strong> {new Date(user.birthDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {user.status ? "Ativo" : "Inativo"}</p>
                <p><strong>Endereço:</strong> {user.street}, {user.city} - {user.zipCode}</p>
                <p><strong>Telefone:</strong> {user.phone}</p>
                <p><strong>Cartão da biblioteca:</strong> {user.libraryCard}</p>
              </div>

            </div>
          </div>
       )}
    </div>
  );
}
