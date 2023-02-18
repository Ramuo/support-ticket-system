import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStatus} from '../hooks/useAuthStatus';
import Spinner from './Spinner';

function PrivateRoute() {
    // let's bring in loggedIn & checkingStatus
    const {loggedIn, checkingStatus} = useAuthStatus() 

    if(checkingStatus){
        return <Spinner/>
    }

  return loggedIn ? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoute