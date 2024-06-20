import React from 'react';
import { Navigate } from 'react-router-dom';
import { useOrganizations } from '../contexts/OrganizationsContext';

const ProtectedRoute = ({ element }) => {
  const { currentOrganization } = useOrganizations();

  if (!currentOrganization) {
    return <Navigate to="/organizations" />;
  }

  return element;
};

export default ProtectedRoute;
