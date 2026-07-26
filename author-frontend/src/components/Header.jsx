import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../App";
import style from "../styles/components/Header.module.css";

const links = [
  { path: "/", title: "Me" },
  { path: "/new", title: "New" },
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

  return (
    <header className={`${style["header"]}`}>
      <div className={style["header--left"]}>
        <Link to="/" className={style["logo"]}>
          <h1>Odin Author</h1>
        </Link>
        <nav className={style["header__nav"]}>
          <ul>{navLinks}</ul>
        </nav>
      </div>
      {user.user ? (
        <div className={style["header--right"]}>
          <Link
            className={style["user-info"]}
            to={`/users/${user.user.id}`}
            aria-label="My profile"
          >
            <div className={`username author ${style["header__username"]}`}>
              <span>@{user.user["username"]}</span>
            </div>
          </Link>
        </div>
      ) : (
        <div
          className={`${style["header--right"]} ${style["header__actions"]}`}
        >
          <Link className="btn btn--primary" to="/log-in">
            Log in
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
