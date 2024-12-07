import { Link } from "@remix-run/react"

export const UserCard = ({user}: {user: User})=>{
  return (
    <div
      key={user.id}
      className="bg-white shadow-md rounded-lg p-4 flex items-start gap-4 hover:shadow-lg transition-shadow"
    >
      <img
        src={user.avatar}
        alt={user.name}
        className="w-24 h-24 rounded-full border-2 border-gray-300"
      />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{user.email}</p>
          <Link
            to={`/users/${user.id}`}
            className="text-sm text-blue-600 font-medium mt-auto hover:underline"
          >
            Ver Detalhes
          </Link>
        </div>
    </div>
  )
}