import React, { useMemo, useState } from "react";
import { TabContext } from "./TabContext";

export const TabProvider = ({ children }) => {
  const [gamesCount, setAulasCount] = useState(0);

  const value = useMemo(
    () => ({ setAulasCount, countGames: gamesCount }),
    [gamesCount]
  );

  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  );
};
