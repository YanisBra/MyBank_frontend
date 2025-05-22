

// import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../services/authService";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/dashboard">MyBank</Link>
//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link" to="/dashboard">Dashboard</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/operations">Operations</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/categories">Categories</Link>
//             </li>
//           </ul>
//           <button className="btn btn-outline-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          MyBank
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/categories"
                onClick={toggleNavbar}
              >
                Categories
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-outline-danger mt-2 mt-lg-0"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
