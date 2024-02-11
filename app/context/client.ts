import { createContext } from "react";

export interface ClientStyleContextData {
  reset: () => void;
  sheet: string;
}

export const ClientStyleContext = createContext<ClientStyleContextData>({
  reset: () => { },
  sheet: "",
});
