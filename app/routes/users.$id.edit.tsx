import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { z } from "zod";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { dataWithError, redirectWithError, redirectWithSuccess } from "remix-toast";

const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  status: z.string(),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  street: z.string().min(1, "Rua é obrigatória"),
  city: z.string().min(1, "Cidade é obrigatória"),
  zipCode: z.string().min(1, "CEP é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
});

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Error("Usuário não encontrado.");
  }

  try {
    const response = await fetch(`https://674f9eeebb559617b26fa7f3.mockapi.io/library/users/${id}`);
    
    if (!response.ok) {
      return redirectWithError('/users', "Não foi possível carregar os dados do usuário.");
    }

    const user = await response.json();
    return { user };

  } catch (error) {
    return redirectWithError('/users', "Não foi possível carregar os dados do usuário.");
  }
}

export async function action ({ request, params }: ActionFunctionArgs) {
  const formData = new URLSearchParams(await request.text());
  const user = Object.fromEntries(formData);

  try {
    const parsedUser = userSchema.parse(user); 

    const response = await fetch(
      `https://674f9eeebb559617b26fa7f3.mockapi.io/library/users/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify(parsedUser),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return dataWithError([], "Erro ao editar o usuário!")
    }
    return redirectWithSuccess('/users', "Usuário editado com sucesso")
  } catch (error) {

    return redirectWithError('/users', "Erro ao editar o usuário!")  
  }
}

export default function EditUser() {
  const { user } = useLoaderData<typeof loader>(); 
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-8 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Editar Usuário</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 p-2 border rounded-lg w-full"
            defaultValue={user.name}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 p-2 border rounded-lg w-full"
            defaultValue={user.email}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="mt-1 p-2 border rounded-lg w-full"
            defaultValue={user.phone}
            required
          />
        </div>
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
            Data de Nascimento
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            className="mt-1 p-2 border rounded-lg w-full"
            defaultValue={user.birthDate}
            required
          />
        </div>
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Rua
          </label>
          <input
            id="street"
            name="street"
            type="text"
            className="mt-1 p-2 border rounded-lg w-full"
            defaultValue={user.street}
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Cidade
          </label>
          <input
            id="city"
            name="city"
            type="text"
            className="mt-1 p-2 border rounded-lg w-full"
            defaultValue={user.city}
            required
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            CEP
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            className="mt-1 p-2 border rounded-lg w-full"
            defaultValue={user.zipCode}
            required
          />
        </div>
        <div>
          <label htmlFor="libraryCard" className="block text-sm font-medium text-gray-700">
            Cartão da biblioteca
          </label>
          <input
            disabled
            id="libraryCard"
            name="libraryCard"
            type="text"
            className="mt-1 p-2 border rounded-lg w-full cursor-not-allowed bg-gray-200 text-gray-500"
            value={user.libraryCard}
            required
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="mt-1 p-2 border rounded-lg w-full"
            defaultValue={user.status}
            required
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
        <div className="mt-4 flex gap-4 justify-end">
          <button
              type="button"
              onClick={()=> navigate(-1)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Atualizar Usuário
            </button>
        </div>
      </Form>
    </div>
  );
}
