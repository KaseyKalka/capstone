import { Link } from 'react-router-dom';
import './Nav.css';
import { styled } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const StyledLink = styled(Link)`
    color: White;
    text-decoration: none;
    margin: 1rem;
    position: relative;
`

interface CurrentUser {
    id: string,
    email: string,
    displayName: string
};

const Nav = () => {

    const [user, setUser] = useState<CurrentUser | null>(null);
    
    useEffect(() => {
       onAuthStateChanged(auth, (user) =>{
            if (user) {
                console.log(user)
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
        <div className=''>
            <nav>
                <img src='../../assets/img/lighting.png' className='logo'/>
                <ul>
                    <li><StyledLink to='/'>Watch List</StyledLink></li>
                    <li><StyledLink to='/nfl'>NFL</StyledLink></li>
                    <li><StyledLink to='/nba'>NBA</StyledLink></li>
                    <li><StyledLink to='/mlb'>MLB</StyledLink></li>
                    <li><StyledLink to='/nhl'>NHL</StyledLink></li>
                </ul>
                <img src="../../assets/img/Deault_pfp.png" className='profile-pic'/>
            </nav>
        </div>
    </>
  )
};

export default Nav
