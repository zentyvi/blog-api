import { createContext, useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import "./styles/main.css";

const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <UserContext value={{ user, setUser }}>
      <div className="gradient-banner"></div>
      <div className="gradient-banner bottom"></div>
      <div id="main-wrapper">
        <Header />
        <Outlet />
      </div>
    </UserContext>
  );
};

export { App, UserContext };
