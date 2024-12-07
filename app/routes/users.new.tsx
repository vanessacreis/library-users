import { Form} from "@remix-run/react";
import { z } from "zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { dataWithError, redirectWithSuccess } from "remix-toast";
import { useState } from "react";

const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  avatar: z.string().url("URL do avatar inválida"),
  status: z.string(),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  street: z.string().min(1, "Rua é obrigatória"),
  city: z.string().min(1, "Cidade é obrigatória"),
  zipCode: z.string().min(1, "CEP é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
});

function generateLibraryCard(): string {
  return Math.random().toString().slice(2, 10); 
}

export async function action ({ request }: ActionFunctionArgs) {
  const formData = new URLSearchParams(await request.text());
  const user = Object.fromEntries(formData);

  try {
    const parsedUser = userSchema.parse(user); 
    const libraryCard = generateLibraryCard();

    const response = await fetch("https://674f9eeebb559617b26fa7f3.mockapi.io/library/users/", {
      method: "POST",
      body: JSON.stringify({...parsedUser, libraryCard}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return dataWithError(null, "Erro ao criar o usuário!"); 
    }

    return redirectWithSuccess('/users', 'Usuário criado com sucesso')
  } catch (error) {
    return dataWithError(null, "Erro ao criar o usuário!");
  }
}

export default function NewUser() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleGenerateAvatar = () => {
    if (name) {
      const avatarUrl = `https://robohash.org/${name.toLowerCase().replace(/\s+/g, '')}.png`;
      setAvatar(avatarUrl);
    } else {
      alert("Por favor, insira o nome primeiro.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Criar Novo Usuário</h1>
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
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
            Avatar (URL)
          </label>
          <div className="flex items-center gap-2">
            <input
              id="avatar"
              name="avatar"
              type="url"
              value={avatar}
              disabled
              className="mt-1 p-2 border rounded-lg w-full"
              required
              />
              <button
                type="button"
                onClick={handleGenerateAvatar}
                className="mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Gerar
              </button>
          </div>
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
            required
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Criar Usuário
          </button>
        </div>
      </Form>
    </div>
  );
}
