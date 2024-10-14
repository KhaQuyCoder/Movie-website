import React from "react";
import axios from "axios";
import { createContext } from "react";
export const ContextApi = createContext();

export const FetchApi = ({ children }) => {
  const FetchData = async (url, setData) => {
    try {
      const result = await axios.get(url);
      setData(result.data.data.items);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <ContextApi.Provider value={{ FetchData }}>{children}</ContextApi.Provider>
  );
};
