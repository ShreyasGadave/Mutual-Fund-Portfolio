import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/AniketLogo.svg";
import Navbar from "../Components/Navbar";

const Admin = () => {

  const navigate = useNavigate(); // ✅ React Router navigation
  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });

  const AdminLogin = async (e) => {
    e.preventDefault();

    if (!loginData.Email || !loginData.Password) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    console.log("Before sending:", loginData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin`, // ✅ Corrected endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token); // ✅ Store JWT token
        resetForm();
        navigate("/admin/profile"); // ✅ Use React Router to navigate
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting data:", err.message);
      alert("Failed to submit data. Please try again.");
    }
  };

  const resetForm = () => {
    setLoginData({ Email: "", Password: "" });
  };

  return (
    <>
    <Navbar/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={Logo} className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-normal tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={AdminLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={loginData.Email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, Email: e.target.value })
                  }
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={loginData.Password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, Password: e.target.value })
                  }
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-red-500 to-blue-500 px-3 py-1.5 text-sm/6 font-base text-white shadow-sm hover:from-indigo-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin;
