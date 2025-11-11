import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await login(email, password);
      console.log("✅ Logged in user:", userCredential.user);

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(" Firebase Login Error:", err);


      switch (err.code) {
        case "auth/invalid-email":
          toast.error("Invalid email address!");
          break;
        case "auth/user-disabled":
          toast.error("This user account has been disabled.");
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Try again!");
          break;
        default:
          toast.error("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input w-full pr-12"
                placeholder="Password"
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 text-xl"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>

            <div className="mt-2">
              <Link
                className="link link-hover text-blue-600"
                to="/auth/forgot-password"
                state={{ email }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-neutral mt-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="font-semibold text-center text-black pt-5">
              Don’t have an account?{" "}
              <Link className="text-secondary" to="/signup">
                Signup
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;