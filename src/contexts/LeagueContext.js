// contexts/LeagueContext.js
import React, { createContext, useState, useContext } from 'react';

const LeagueContext = createContext();

export const useLeague = () => useContext(LeagueContext);

export const LeagueProvider = ({ children }) => {
  const [selectedLeague, setSelectedLeague] = useState(null);

  const selectLeague = (league) => {
    setSelectedLeague(league);
  };

  return (
    <LeagueContext.Provider value={{ selectedLeague, selectLeague }}>
      {children}
    </LeagueContext.Provider>
  );
};
