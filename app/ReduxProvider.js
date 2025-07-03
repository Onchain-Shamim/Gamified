"use client";
import { Provider } from "react-redux";
import { store } from "./features/store"; // Adjust the import path as necessary

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
