import { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [nameFiml, setNameFiml] = useState("");

  return (
    <Context.Provider value={{ nameFiml, setNameFiml }}>
      <div>{children}</div>
    </Context.Provider>
  );
};
