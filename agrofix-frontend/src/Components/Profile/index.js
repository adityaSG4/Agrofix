import React from 'react';
import Navbar from '../Navbar';
import Cookies from 'js-cookie';
import { ImProfile } from "react-icons/im";


const Profile = () => {
  const username = Cookies.get('username');
  const email = Cookies.get('email');
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="card p-4 shadow-sm">
          <h3 className="mb-3 text-success"><ImProfile size={40} className="text-success" />Profile</h3>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
