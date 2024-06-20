// contexts/LeagueContext.js
import React, { createContext, useState, useContext } from 'react';

const LeagueContext = createContext();

export const useLeague = () => useContext(LeagueContext);

export const LeagueProvider = ({ children }) => {
  const [selectedLeague, setSelectedLeague] = useState(null);



  return (
    <LeagueContext.Provider value={{ selectedLeague, setSelectedLeague }}>
      {children}
    </LeagueContext.Provider>
  );
};
