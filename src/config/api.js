// API Configuration for different environments
const isDevelopment = import.meta.env.MODE === 'development' || 
                      (typeof window !== 'undefined' && window.location.hostname === 'localhost');

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000' 
  : '/api'; // Use relative path for production

export const API_ENDPOINTS = {
  transactions: `${API_BASE_URL}/transactions`,
  budgets: `${API_BASE_URL}/budgets`,
};

// For production, we'll use localStorage as fallback
export const STORAGE_KEYS = {
  transactions: 'expense_tracker_transactions',
  budgets: 'expense_tracker_budgets',
  user: 'expense_tracker_user'
};

// Sample data for demo purposes
export const SAMPLE_TRANSACTIONS = [
  {
    id: 1,
    type: 'expense',
    category: 'Food',
    amount: 1500,
    description: 'Lunch at restaurant',
    date: '2025-07-01'
  },
  {
    id: 2,
    type: 'income',
    category: 'Salary',
    amount: 50000,
    description: 'Monthly salary',
    date: '2025-07-01'
  },
  {
    id: 3,
    type: 'expense',
    category: 'Transport',
    amount: 800,
    description: 'Metro card recharge',
    date: '2025-07-02'
  },
  {
    id: 4,
    type: 'expense',
    category: 'Shopping',
    amount: 3200,
    description: 'Clothing purchase',
    date: '2025-07-02'
  },
  {
    id: 5,
    type: 'income',
    category: 'Freelance',
    amount: 15000,
    description: 'Website development project',
    date: '2025-07-03'
  }
];
