import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaSearch, FaList } from "react-icons/fa";
import "../css/sidebar.css"; // Ensure this path is correct

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="list-unstyled">
        <strong className="sidebar-title">Itune</strong>
        
        <div className="sidebar-section">
          <li>
            <Link to="/songs">
              <FaHome className="sidebar-icon" /> <span>Home</span>
            </Link>
          </li>
        </div>
        
        <hr />

        <div className="sidebar-section">
          <p className="sidebar-heading">Your Library</p>
          <li>
            <Link to="/favorities">
              <FaHeart className="sidebar-icon" /> <span>Favorites</span>
            </Link>
          </li>
          <li>
            <Link to="/playlist">
              <FaList className="sidebar-icon" /> <span>Playlist</span>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <FaSearch className="sidebar-icon" /> <span>Search</span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Sidebar;
