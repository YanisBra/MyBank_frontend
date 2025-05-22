// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../services/authService"; 

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password); 
//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Login</h2>
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <button type="submit" className="btn btn-primary w-100">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, username);
      setIsSignUp(false);
      setSucces("Account created successfully. Please log in.");
    } catch (error) {
      console.error(error);
      setError("Error creating account. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">MY BANK</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
            {isSignUp && (
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 mb-2">
              {isSignUp ? "Sign Up" : "Login"}
            </button>

            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
