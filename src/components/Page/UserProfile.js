import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../auth/useAuth';

const UserProfile = () => {

  const { user, getUserProfile } = useContext(UserContext)
  const [updateUser, setUpdateUser] =useState(null)
  const [loading, setLoading] =useState(true)
  useEffect(()=>{
    console.log(user);
    if(user) {
    getUserProfile(user)
    .then(res => {
      setUpdateUser(res)
      setLoading(false)
    })
    }
  },[getUserProfile, user])
  
  return (
    <>

{loading ? <h1 className="card-text text-center mt-5 pt-5">Loading ......</h1> : (
      <div className="container">
        <div className="card border-primary m-auto d-block">
          <img className="card-img-top w-25 d-block m-auto" src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="" />
          <div className="card-body">
            <h4 className="card-title text-center">{updateUser && updateUser.name}</h4>
            <p className="card-text text-center">{user.email}</p>
          </div>
        </div>
      </div>
    )  }
    </>
  );

};

export default UserProfile;