import { ActionFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { redirectWithError, redirectWithSuccess } from "remix-toast";

export async function action({ params }: ActionFunctionArgs) {
  const { id } = params;

  try {
    const response = await fetch(
      `https://674f9eeebb559617b26fa7f3.mockapi.io/library/users/${id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      return redirectWithError("/users", "Erro ao deletar o usuário. Tente novamente mais tarde.");
    } 
    return redirectWithSuccess('/users',"Usuário deletado com sucesso!");

  } catch (error) {
    return redirectWithError("/users", "Erro ao deletar o usuário. Tente novamente mais tarde.");
  }
}

export default function DeleteUser() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Tem certeza que deseja excluir este usuário?
        </h2>
        <div className="flex justify-end gap-4">
          <form method="post">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sim, deletar
            </button>
          </form>
          <button
            type="button"
            onClick={()=> navigate(-1)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
