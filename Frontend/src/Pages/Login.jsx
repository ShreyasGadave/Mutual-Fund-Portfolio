import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/AniketLogo.svg";
import Navbar from "../Components/Common/Navbar";
import { auth, LogIn, SignUp } from "../Services/Firebase";
import { CgDanger } from "react-icons/cg";

const Login = () => {

  const [loginData, setLoginData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const navigate=useNavigate();

  const user_auth = async (e) => {
    e.preventDefault();

    const { Name, Email, Password } = loginData;

    if (!Email || !Password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      console.log("Before login:", { Email, Password });

      await LogIn(Email, Password);
      resetForm();
      navigate("/admin/profile"); // Redirect only on successful login
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message || "Login failed. Please try again.");
      // Do NOT navigate here on error
    }
  };
  
  // const LoginLogin = async (e) => {
  //   e.preventDefault();

  //   if (!loginData.Email || !loginData.Password) {
  //     alert("Please fill in all fields before submitting.");
  //     return;
  //   }

  //   console.log("Before sending:", loginData);

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BACKEND_URL}/admin`, // ✅ Corrected endpoint
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(loginData),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log("Response from server:", data);

  //     if (response.ok) {
  //       localStorage.setItem("token", data.token); // ✅ Store JWT token
  //       resetForm();
  //       navigate("/admin/profile")
  //       ; // ✅ Use React Router to navigate
  //     } else {
  //       alert(data.message || "Login failed. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Error submitting data:", err.message);
  //     alert("Failed to submit data. Please try again.");
  //   }
  // };

  const resetForm = () => {
    setLoginData({ Name: "", Email: "", Password: "" });
  };

  return (
    <>
      <Navbar />
      <div className="px-5 pb-10">
        <div className="flex flex-col sm:flex-row m-auto w-fit border rounded bg-gradient-to-b from-blue-200 to-purple-400 justify-center mt-10 sm:mt-30">
          <div className=" flex items-center flex-col sm:static">
            <div className=" md:py-20 px-5 mt-10 flex flex-col items-center justify-center">
              <div>
                <img src={Logo} alt="" className="h-18" />
              </div>
              <div>
                <p className="text-gray-600 font-bold text-3xl mt-4 ">
                  Aniket Managave
                </p>
              </div>
              <p className="text-base font-semibold max-w-xs mt-4 text-center text-gray-600 ">
                Seeking a knowledgeable Mutual Fund Distributor or Financial
                Advisor?
              </p>
              <button
                onClick={() => navigate("/#Connect")}
                className="border border-gray-600 px-3 py-1  mt-5 rounded-full"
              >
                Connect Us
              </button>
            </div>
          </div>
          <div className="p-5 mt-4 sm:mt-0 sm:p-20 border bg-white border-gray-300 rounded-t-3xl   sm:rounded-l-3xl  sm:rounded-tr   ">
            <div className=" ">
              {/* <img alt="Your Company" src={Logo}  /> */}
              <h2 className=" font-bold text-3xl mt-5 sm:mt-0 sm:text-5xl leading-10">
                Hey <br/>
                Welcome Back!
              </h2>
              <p className="text-base mt-1 sm:mt-0 text-gray-500">
                We are very happy to see you back!
              </p>
            </div>

            <div className="mt-4">
              {/*  onSubmit={LoginLogin}> */}
              <form>
                {/* <div className="mt-3">
                  <label htmlFor="name" className=" text-base font-semibold ">
                    Name
                  </label>
                  <div>
                    <input
                      id="Name"
                      name="Name"
                      type="text"
                      placeholder="Name"
                      required
                      value={loginData.Name}
                      onChange={(e) =>
                        setLoginData({ ...loginData, Name: e.target.value })
                      }
                      autoComplete="current-password"
                      className="border border-gray-200 rounded bg-gray-50 px-4 py-1 w-full"
                    />
                  </div>
                </div> */}

                <div className="mt-5">
                  <label htmlFor="email" className=" text-base font-semibold ">
                    Email
                  </label>
                  <div>
                    <input
                      id="email"
                      name="Email"
                      type="email"
                      required
                      value={loginData.Email}
                      placeholder="commitcommunity@gmail.com"
                      onChange={(e) =>
                        setLoginData({ ...loginData, Email: e.target.value })
                      }
                      autoComplete="email"
                      className="border border-gray-200 rounded text-gray-500 bg-gray-50 px-4 py-1 w-full"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="password"
                    className=" text-base font-semibold "
                  >
                    Password
                  </label>
                  <div>
                    <input
                      id="password"
                      name="Password"
                      type="password"
                      placeholder="********"
                      required
                      value={loginData.Password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, Password: e.target.value })
                      }
                      autoComplete="current-password"
                      className="border border-gray-200 rounded bg-gray-50 px-4 py-1 w-full"
                    />
                  </div>
                </div>

                <div className="mt-5 mb-10">
                  <label className=" text-gray-500 text-sm mt-4 flex items-center gap-2">
                    <input type="checkbox" /><p>Remember Me as Login.</p> 
                  </label>
                  <button
                    type="submit"
                    onClick={user_auth}
                    className="border mt-3 border-blue-500 bg-blue-500 text-sm sm:text-base font-semibold text-white py-1 w-full rounded"
                  >
                    Log in
                  </button>
                  <p className="text-center text-gray-500 text-sm mt-4 flex justify-center items-center gap-1"> <CgDanger className="h-9"/>Admin Privileges Needed</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
