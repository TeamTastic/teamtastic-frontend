import React, { createContext, useState, useContext } from 'react';

const OrganizationsContext = createContext();

export const OrganizationsProvider = ({ children }) => {
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [invitationTokens, setInvitationTokens] = useState({}); // Añadir tokens de invitación

  return (
    <OrganizationsContext.Provider value={{ currentOrganization, setCurrentOrganization, organizations, setOrganizations, invitationTokens, setInvitationTokens }}>
      {children}
    </OrganizationsContext.Provider>
  );
};

export const useOrganizations = () => useContext(OrganizationsContext);
