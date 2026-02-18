import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BriefContextType {
  fullName: string;
  email: string;
  productType: string;
  setFullName: (name: string) => void;
  setEmail: (email: string) => void;
  setProductType: (type: string) => void;
}

const BriefContext = createContext<BriefContextType | undefined>(undefined);

export const BriefProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [productType, setProductType] = useState<string>('');

  return (
    <BriefContext.Provider
      value={{
        fullName,
        email,
        productType,
        setFullName,
        setEmail,
        setProductType,
      }}
    >
      {children}
    </BriefContext.Provider>
  );
};

export const useBrief = (): BriefContextType => {
  const context = useContext(BriefContext);
  if (context === undefined) {
    throw new Error('useBrief must be used within a BriefProvider');
  }
  return context;
};

