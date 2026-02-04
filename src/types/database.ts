export type Profile = {
  id: string
  username: string | null
  email: string | null
  role: string | null
  created_at: string
}

export type Account = {
  id: string
  user_id: string
  name: string
  account_number: string | null
  balance: number
  type: string | null
  currency: string | null
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  user_id: string
  name: string
  type: 'income' | 'expense'
  icon: string | null
  color: string | null
  created_at: string
  updated_at: string
}

export type Transaction = {
  id: string
  user_id: string
  account_id: string
  category_id?: string
  category_name?: string
  description: string | null
  amount: number
  type: 'income' | 'expense'
  date: string
  created_at: string
  updated_at: string
  // Joined fields
  category?: Category
  account?: Account
}
