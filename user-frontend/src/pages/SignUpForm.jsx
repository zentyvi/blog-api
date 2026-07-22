import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser, saveToken } from "../api/auth";
import FormInput from "../components/FormInut";
import { useContext } from "react";
import { UserContext } from "../App";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
        navigate("/");
        user.setUser(result.user);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div>
        <div>
          <h2>Sign Up</h2>
          <p>
            Already have an account? <Link to="/sign-up">Log in</Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <FormInput
            name="username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            isRequired={true}
            label="Username"
            error={error?.username}
          />

          <FormInput
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            isRequired={true}
            label="Email"
            error={error?.email}
          />

          <FormInput
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            isRequired={true}
            label="Password"
            error={error?.password}
          />

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUpForm;
