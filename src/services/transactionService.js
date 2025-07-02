import { API_ENDPOINTS, STORAGE_KEYS, SAMPLE_TRANSACTIONS } from '../config/api.js';

// Utility to generate unique IDs
const generateId = () => Date.now() + Math.random();

// Initialize localStorage with sample data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.transactions)) {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(SAMPLE_TRANSACTIONS));
  }
};

// Transaction Service
export const transactionService = {
  // Get all transactions
  async getAll() {
    try {
      // Try API first
      const response = await fetch(API_ENDPOINTS.transactions);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('API not available');
    } catch (error) {
      // Fallback to localStorage
      console.log('Using localStorage fallback for transactions:', error.message);
      initializeStorage();
      const stored = localStorage.getItem(STORAGE_KEYS.transactions);
      return stored ? JSON.parse(stored) : SAMPLE_TRANSACTIONS;
    }
  },

  // Add new transaction
  async add(transaction) {
    const newTransaction = {
      ...transaction,
      id: generateId(),
      date: transaction.date || new Date().toISOString().split('T')[0]
    };

    try {
      // Try API first
      const response = await fetch(API_ENDPOINTS.transactions, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction)
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('API not available');
    } catch (error) {
      // Fallback to localStorage
      console.log('Using localStorage fallback for adding transaction:', error.message);
      const stored = localStorage.getItem(STORAGE_KEYS.transactions);
      const transactions = stored ? JSON.parse(stored) : [];
      transactions.push(newTransaction);
      localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
      return newTransaction;
    }
  },

  // Update transaction
  async update(id, updatedTransaction) {
    try {
      // Try API first
      const response = await fetch(`${API_ENDPOINTS.transactions}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTransaction)
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('API not available');
    } catch (error) {
      // Fallback to localStorage
      console.log('Using localStorage fallback for updating transaction:', error.message);
      const stored = localStorage.getItem(STORAGE_KEYS.transactions);
      const transactions = stored ? JSON.parse(stored) : [];
      const index = transactions.findIndex(t => t.id === id);
      
      if (index !== -1) {
        transactions[index] = { ...transactions[index], ...updatedTransaction };
        localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
        return transactions[index];
      }
      throw new Error('Transaction not found');
    }
  },

  // Delete transaction
  async delete(id) {
    try {
      // Try API first
      const response = await fetch(`${API_ENDPOINTS.transactions}/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        return true;
      }
      throw new Error('API not available');
    } catch (error) {
      // Fallback to localStorage
      console.log('Using localStorage fallback for deleting transaction:', error.message);
      const stored = localStorage.getItem(STORAGE_KEYS.transactions);
      const transactions = stored ? JSON.parse(stored) : [];
      const filteredTransactions = transactions.filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(filteredTransactions));
      return true;
    }
  }
};
