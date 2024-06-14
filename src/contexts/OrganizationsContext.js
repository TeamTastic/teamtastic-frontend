import React, { createContext, useState, useContext } from 'react';

const OrganizationsContext = createContext();

export const OrganizationsProvider = ({ children }) => {
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  return (
    <OrganizationsContext.Provider value={{ currentOrganization, setCurrentOrganization, organizations, setOrganizations }}>
      {children}
    </OrganizationsContext.Provider>
  );
};

export const useOrganizations = () => useContext(OrganizationsContext);
