import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';



export const useAuthStatus = () => {
    // State
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    // Let's get the user from the state
    const {user} = useSelector((state)=> state.auth);

    useEffect(()=>{
        if(user){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }

        setCheckingStatus(false)
    }, [user]);

    return {loggedIn, checkingStatus}
}