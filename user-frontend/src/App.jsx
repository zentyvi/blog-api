import { createContext, useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";

const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <UserContext value={{ user, setUser }}>
      <Header />
      <Outlet />
    </UserContext>
  );
};

export { App, UserContext };
