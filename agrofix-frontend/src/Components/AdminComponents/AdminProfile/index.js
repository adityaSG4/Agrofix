import React from 'react';
import Cookies from 'js-cookie';
import Navbar from '../../Navbar';
import { ImProfile } from "react-icons/im";

const AdminProfile = () => {

    const username = Cookies.get('username');
    const email = Cookies.get('email');
    const role = Cookies.get('role');

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="card p-4 shadow-sm">
                    <h3 className="mb-3 text-success"><ImProfile size={40} className="text-success" /> Profile</h3>
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Role:</strong> {role}</p>
                </div>
            </div>
        </>
    );
};

export default AdminProfile;
