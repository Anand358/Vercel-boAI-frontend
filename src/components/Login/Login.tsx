import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../ProtectedRouting/AuthContext";
import cat from "@/assets/login_cat.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedIn");
    if (savedUser && savedUser === "true") {
      // Automatically attempt login with saved credentials
      login();
      navigate("/choose");
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    attemptLogin();
  };

  const attemptLogin = async () => {
    if (!userName || !password) {
      alert("Please fill all the fields");
      return;
    }

    const URL = `${
      import.meta.env.VITE_BASE_URL
    }/auth?username=${userName}&password=${password}`;

    try {
      const response = await axios.post(URL, {
        username: userName,
        password: password,
      });

      if (response.data.success) {
        login();
        alert("Login successful!");
        localStorage.setItem("loggedIn", "true");
        navigate("/choose");
      } else {
        alert("Login failed: Invalid credentials");
        // Clear storage if credentials are invalid
        localStorage.removeItem("loggedIn");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/2 bg-[#1c1c1c] relative">
        <div className="flex flex-col justify-center items-center h-screen">
          <form
            className="w-full max-w-md p-8"
            onSubmit={(e) => {
              console.log(e);
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Username"
              className="bg-[#383838] placeholder:text-[#666666] p-3 rounded-lg w-full my-2"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-[#383838] placeholder:text-[#666666] p-3 rounded-lg w-full my-2"
            />
            <button
              type="submit"
              className="px-5 py-4 bg-gradient-to-br from-[#ff4f05] to-[#ff9c01] rounded-xl font-bold mt-2.5"
            >
              L O G I N
            </button>
          </form>
        </div>
        <div
          className="absolute right-0 w-[120px]"
          style={{ top: "50%", transform: "translate(0, -50%)" }}
        >
          <img src={cat} alt="Login cat" className="w-full" />
        </div>
      </div>
      <div className="w-1/2 bg-[#111111]">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="text-[#606060] text-xl">Request Access</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
