"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AppContextState {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  
}

const AppContext = createContext<AppContextState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [searchTerm, setSearchTerm] = useState<string>('');

  var contextValue : AppContextState ={
    searchTerm,
    setSearchTerm,
}
  return (
    <AppContext.Provider value={{...contextValue}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextState => {
  const context = useContext(AppContext);
  if (!context) {   
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context as AppContextState;
};