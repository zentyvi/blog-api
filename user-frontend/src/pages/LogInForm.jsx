import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser, saveToken } from "../api/auth";
import FormInput from "../components/FormInput";
import { UserContext } from "../App";
import Loader from "../components/Loader";
import style from "../styles/pages/Form.module.css";

function LogInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      username,
      password,
    };

    try {
      const result = await loginUser(data);
      if (result.errors) {
        setError(result.errors);
      } else {
        setError(null);
        saveToken(result.token, result.user);
        navigate("/");
        user.setUser(result.user);
        window.location.reload();
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={style["auth-page"]}>
      <div className={style["auth-card"]}>
        <div className={style["auth-card__header"]}>
          <h2 className={style["auth-card__title"]}>Log in</h2>
          <p className={style["auth-card__subtitle"]}>
            Do not have an account?{" "}
            <Link to="/Sign-up" className={style["auth-card__link"]}>
              Sign up
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className={style["auth-form"]}>
          <FormInput
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isRequired={true}
            label="Username"
            error={error?.username}
          />

          <FormInput
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired={true}
            label="Password"
            error={error?.password}
          />

          <div className={style["auth-form__submit"]}>
            <button type="submit" className="btn btn--primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LogInForm;
