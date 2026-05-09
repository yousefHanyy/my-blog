import { NavLink } from "react-router";

function Register() {
  return (
    <div className="flex justify-center mt-15">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-lg">Sign up</legend>

        <label className="label">Name</label>
        <input type="name" className="input" placeholder="Name" />

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <label className="label">Confirm Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4">Sign up</button>
        <label className="label mt-2">
          Already have an account?
          <NavLink to="/login">
            <a className="link text-black ">Login</a>
          </NavLink>
        </label>
      </fieldset>
    </div>
  );
}

export default Register;
