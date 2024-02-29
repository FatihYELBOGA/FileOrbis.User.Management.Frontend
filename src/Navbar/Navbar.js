import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const navbarStyle = 
{
  display: 'flex',
  justifyContent: 'center', // Adjust alignment as needed
  backgroundColor: '#5F5F5F',
  
  minHeight: '60px', // Set a minimum height for the navbar
};

const linkStyle = 
{
  textDecoration: 'none',
  backgroundColor: "#9F9F9F",
  color: 'white', // Adjust link color
  marginLeft: "100px",
  marginRight: "100px",
  fontSize: '16px',
  fontWeight: "bold",
  padding: '17px',
  borderRadius: "10px",
  borderBottom: '2px solid transparent',
  transition: 'border-color 0.3s ease',
};

const activeLinkStyle = 
{
  borderBottomColor: '#1976D2', // Adjust the active link color
};

function Navbar () 
{
  return (
    <div style={navbarStyle}>
      <Link to="/" style={linkStyle} activeStyle={activeLinkStyle}>
        SHOW USERS
      </Link>
      <Link to="/add-user" style={linkStyle} activeStyle={activeLinkStyle}>
        ADD USER
      </Link>
      
    </div>
  );
};

export default Navbar;
