import { useContext, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../App";
import { removeToken } from "../api/auth";
import style from "../styles/components/Header.module.css";

const links = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About" },
];

function Header() {
  const user = useContext(UserContext);
  const navLinks = links.map((link) => {
    return (
      <li key={link.path} className={style["header__link"]}>
        <Link to={link.path}>{link.title}</Link>
      </li>
    );
  });

  const handleLogOut = () => {
    if (confirm("Are you sure that you want to log out?")) {
      removeToken();
      user.setUser(null);
    }
  };

  return (
    <header className={`${style["header"]}`}>
      <div className={style["header--left"]}>
        <Link to="/" className={style["logo"]}>
          <h1>Odin Blog</h1>
        </Link>
        <nav className={style["header__nav"]}>
          <ul>{navLinks}</ul>
        </nav>
      </div>
      {user.user ? (
        <div className={style["header--right"]}>
          <div className={style["user-info"]}>
            <div className={`avatar ${style["header__avatar"]}`}>
              <i className="fa-solid fa-user"></i>
            </div>
            <div className={`username ${style["header__username"]}`}>
              <span>@{user.user["username"]}</span>
            </div>
          </div>
          <div>
            <button
              className={`btn btn--danger ${style["log-out-button"]}`}
              type="button"
              onClick={handleLogOut}
              aria-label="Log out"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${style["header--right"]} ${style["header__actions"]}`}
        >
          <Link className="btn btn--secondary" to="/sign-up">
            Sign up
          </Link>
          <Link className="btn btn--primary" to="/log-in">
            Log in
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
