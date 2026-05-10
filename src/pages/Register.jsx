import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-15">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-lg">Sign up</legend>

        <label className="label">Name</label>
        <input 
          type="text" 
          className="input" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="label">Email</label>
        <input 
          type="email" 
          className="input" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input 
          type="password" 
          className="input" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister} className="btn btn-neutral mt-4">Sign up</button>
        <label className="label mt-2">
          Already have an account?
          <NavLink to="/login">
            <span className="link text-black ">Login</span>
          </NavLink>
        </label>
      </fieldset>
    </div>
  );
}

export default Register;
