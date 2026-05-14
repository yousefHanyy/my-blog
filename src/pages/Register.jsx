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
    <div className="flex justify-center items-center  px-2 sm:px-4 py-8">
      <div className="w-full max-w-sm md:max-w-md bg-[#fff8f5] border-2 border-[#1d1b19] overflow-hidden">
        <div className="h-2 bg-[#1d1b19]"></div>

        <div className="p-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1d1b19] mb-2 font-['Space_Mono']">
              Create Account
            </h1>
            <p className="text-sm text-[#434840] font-['Source_Sans_3']">
              Join PixelPulp and start sharing your ideas.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="space-y-5 md:space-y-6"
          >
            <div>
              <label className="block text-xs md:text-sm font-bold text-[#43643d] uppercase tracking-wide mb-2 font-['Source_Sans_3']">
                Display Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 md:py-3 border-2 border-[#1d1b19] text-sm text-[#1d1b19] placeholder-gray-400 focus:outline-none focus:bg-[#e8e1de]"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-[#43643d] uppercase tracking-wide mb-2 font-['Source_Sans_3']">
                Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@pixelpulp.net"
                className="w-full px-3 py-2 md:py-3 border-2 border-[#1d1b19] text-sm text-[#1d1b19] placeholder-gray-400 focus:outline-none focus:bg-[#e8e1de]"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-[#43643d] uppercase tracking-wide mb-2 font-['Source_Sans_3']">
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 md:py-3 border-2 border-[#1d1b19] text-sm text-[#1d1b19] placeholder-gray-400 focus:outline-none focus:bg-[#e8e1de]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 md:py-4 bg-[#43643d] border-2 border-[#1d1b19] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#354c2d] transition-colors font-['JetBrains_Mono'] cursor-pointer mt-6 md:mt-8"
            >
              → Create Account
            </button>
          </form>

          <div className="flex items-center gap-3 my-5 md:my-6">
            <div className="flex-1 h-0.5 bg-[#1d1b19]"></div>
            <span className="text-xs text-[#6f5b3c] font-['Source_Sans_3']">
              or
            </span>
            <div className="flex-1 h-0.5 bg-[#1d1b19]"></div>
          </div>

          <div className="text-center">
            <p className="text-xs text-[#434840] font-['Source_Sans_3'] mb-2">
              Already have an account?
            </p>
            <NavLink
              to="/login"
              className="inline-block w-full py-2 md:py-3 border-2 border-[#1d1b19] text-[#1d1b19] font-bold uppercase text-sm tracking-wide hover:bg-gray-100 transition-colors font-['JetBrains_Mono'] cursor-pointer"
            >
              Back to Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
