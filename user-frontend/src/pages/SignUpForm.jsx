import { useState } from "react";
import { Link } from "react-router";
import { registerUser, saveToken } from "../api/auth";
import FormInput from "../components/FormInput";
import { useContext } from "react";
import { UserContext } from "../App";
import Loader from "../components/Loader";
import style from "../styles/pages/Form.module.css";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      username,
      email,
      password,
    };

    try {
      const result = await registerUser(data);
      if (result.errors) {
        setError(result.errors);
      } else {
        setError(null);
        saveToken(result.token, result.user);
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
          <h2 className={style["auth-card__title"]}>Sign Up</h2>
          <p className={style["auth-card__subtitle"]}>
            Already have an account?{" "}
            <Link to="/log-in" className={style["auth-card__link"]}>
              Log in
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
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired={true}
            label="Email"
            error={error?.email}
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

export default SignUpForm;
