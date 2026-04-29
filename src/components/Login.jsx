import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="button-row">
        <button onClick={login} disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
        <button className="secondary-button" onClick={signup} disabled={loading}>
          Signup
        </button>
      </div>
    </div>
  );
}
