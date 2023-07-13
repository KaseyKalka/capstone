import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

interface CurrentUser {
    id: string,
    email: string,
    displayName: string
};

const SignOut = () => {
    const [user, setUser] = useState<CurrentUser | null>(null);

    const navigate = useNavigate();

  useEffect(() => {
     onAuthStateChanged(auth, (user) =>{
          if (user) {
              const email = user.email
              const id = user.uid
              const displayName = user.displayName
              // Type Narrowing
              if (typeof email === 'string' && typeof id === 'string' && typeof displayName === 'string'){
                  setUser({id: id, email: email, displayName: displayName})
              };
          };
      })
  });

  const handleSignOut = () => {
      signOut(auth).then(() => {
          setUser(null)
          navigate('/signin')
      });
  };
  return (
    <button onClick={handleSignOut}>Sign Out</button>
  )
}

export default SignOut