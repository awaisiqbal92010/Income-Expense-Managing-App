import React, { createContext, useReducer } from 'react';

const initialState = {
  isAuthenticated: false,
  user: null,
  transactions: [
    { id: 1, title: 'Freelance Project', amount: 1200, type: 'income', category: 'Work', date: '2026-07-18' },
    { id: 2, title: 'Groceries', amount: 85, type: 'expense', category: 'Food', date: '2026-07-19' },
    { id: 3, title: 'Netflix Subscription', amount: 15, type: 'expense', category: 'Entertainment', date: '2026-07-19' },
  ],
  budgets: [
    { id: 1, category: 'Food', limit: 300 },
    { id: 2, category: 'Entertainment', limit: 100 },
  ]
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT': return { ...state, isAuthenticated: false, user: null };
    case 'ADD_TRANSACTION': return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_BUDGET': 
      const exists = state.budgets.find(b => b.category === action.payload.category);
      if (exists) {
        return { ...state, budgets: state.budgets.map(b => b.category === action.payload.category ? action.payload : b) };
      }
      return { ...state, budgets: [...state.budgets, action.payload] };
    default: return state;
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const login = (user) => dispatch({ type: 'LOGIN', payload: user });
  const logout = () => dispatch({ type: 'LOGOUT' });
  const addTransaction = (transaction) => dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  const updateBudget = (budget) => dispatch({ type: 'UPDATE_BUDGET', payload: budget });

  return (
    <GlobalContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      transactions: state.transactions,
      budgets: state.budgets,
      login, logout, addTransaction, updateBudget
    }}>
      {children}
    </GlobalContext.Provider>
  );
};