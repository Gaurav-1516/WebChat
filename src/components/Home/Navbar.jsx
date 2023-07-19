import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import {FiLogOut} from 'react-icons/fi'
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'


function Navbar() {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <span className="logo">WebChat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>
          <FiLogOut color='white' size={20}/>
        </button>
      </div>
    </div>
  )
}

export default Navbar