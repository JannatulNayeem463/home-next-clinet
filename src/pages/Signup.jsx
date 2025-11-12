import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, name, photoURL);
      console.log(signup);
      toast.success("Account created successfully 🎉");
      navigate("/");
    } catch (err) {
      console.error("🔥 Signup Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">Create an Account</h2>

        <form onSubmit={handleSignup} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Full Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label className="label">Photo URL (optional)</label>
            <input
              type="text"
              name="photoURL"
              className="input"
              placeholder="Profile photo URL"
              value={formData.photoURL}
              onChange={handleChange}
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input w-full pr-12"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-neutral mt-4"
              disabled={loading}
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <p className="font-semibold text-center pt-5">
              Already have an account?{" "}
              <Link className="text-secondary" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;