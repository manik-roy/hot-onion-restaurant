import React, { useContext } from 'react';
import { UserContext } from '../auth/useAuth';

const UserProfile = () => {

  const { user } = useContext(UserContext)
  
  return (
    <>
{user ? (
      <div className="container">
        <div className="card border-primary m-auto d-block">
          <img className="card-img-top w-25 d-block m-auto" src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="" />
          <div className="card-body">
            <h4 className="card-title text-center">{user.name}</h4>
            <p className="card-text text-center">{user.email}</p>
          </div>
        </div>
      </div>
    ) : <h1 className="card-text text-center mt-5 pt-5">Loading ......</h1>}
    </>
  );

};

export default UserProfile;