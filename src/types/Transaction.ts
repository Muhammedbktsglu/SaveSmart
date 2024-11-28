export interface User {
  username: string;
  profilePicture: string;
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  user: User;
}
