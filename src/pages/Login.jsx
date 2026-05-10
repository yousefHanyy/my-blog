import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const token = response.data.accessToken;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful!");

      navigate("/");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-15">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs  border p-4">
        <legend className="fieldset-legend text-lg">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label ">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="btn btn-neutral mt-4">
          Login
        </button>

        <label className="label mt-2">
          Don't have an account?
          <NavLink to="/register">
            <span className="link text-black ">Sign up</span>
          </NavLink>
        </label>
      </fieldset>
    </div>
  );
}

export default Login;
