declare global {
  interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    status: 'active' | 'inactive'
    birthDate: string;
    libraryCard: number;
    street: string;
    city: string;
    zipCode: string
    createdAt: string
  }
}

export {User};
