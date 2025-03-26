import React, { createContext, useContext, ReactNode } from 'react';

// Define the structure of a dictionary object (can be more complex)
type Dictionary = {
  [key: string]: string; // Example, this can hold translations like { "hello": "hola" }
};

// Define the context type
interface DictionaryContextType {
  [key: string]: Dictionary; // Example: { en: { hello: "hello" }, es: { hello: "hola" } }
}

// Create the context with an empty object as the default value
const DictionaryContext = createContext<Dictionary | undefined>(undefined);

// The component that provides the context value
interface DictionaryProviderProps {
  dictionaries: DictionaryContextType;
  children: ReactNode;
}

export const DictionaryProvider: React.FC<DictionaryProviderProps> = ({ dictionaries, children }) => {
  return (
    <DictionaryContext.Provider value={dictionaries["en"]}>
      {children}
    </DictionaryContext.Provider>
  );
};

// A hook to use the context
export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
};
