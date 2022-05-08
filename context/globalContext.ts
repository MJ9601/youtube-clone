import { createContext, FunctionComponent, ReactNode, useReducer } from "react";
import { User } from "../typing";

type Action = {
  type: string;
  payload: User;
};

type State = {
  user: User;
};

// export const GlobalContext = createContext<User>(null);

// export function StateProvider({
//   reducer,
//   initState,
//   children,
// }: {
//   reducer: string;
//   initState: null;
//   children: ReactNode;
// }) {
//   return (
//     <GlobalContext.Provider value={useReducer(reducer, initState)}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };
