import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Gestão de usuários</h1>
      <div>
        <Link
          to="/"
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Sair
        </Link>
      </div>
    </header>
  );
}
