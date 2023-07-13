import { onAuthStateChanged, signOut } from "firebase/auth";
import Nav from "../../components/Nav/Nav";
import SportEvent from "../../components/SportEvent/SportEvent";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import SignIn from "../SignIn/SignIn";

interface CurrentUser {
  id: string,
  email: string,
  displayName: string
};

const Home = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
    
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
        });
    };
    
  return (
    <>
          <Nav />
          <SportEvent /> 
    </>
  )
};

export default Home;