import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../App";
import { removeToken } from "../api/auth";

const links = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About" },
];

function Header() {
  const user = useContext(UserContext);
  const navLinks = links.map((link) => {
    return (
      <li key={link.path}>
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
    <header>
      <div>
        <h1>Odin Blog</h1>
        <nav>
          <ul>{navLinks}</ul>
        </nav>
      </div>
      {user.user ? (
        <div>
          <div>
            <div>
              <i className="fa-solid fa-user"></i>
            </div>
            <div>
              <span>@{user.user["username"]}</span>
            </div>
          </div>
          <div>
            <button type="button" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/log-in">Log in</Link>
          <Link to="/sign-up">Sign up</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
