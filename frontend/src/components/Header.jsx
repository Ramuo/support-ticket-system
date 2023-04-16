import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';



function Header() {
  // State
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.auth);
  
  // Functions 
  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };


  //rendered element
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className='btn' onClick={onLogOut}><FaSignOutAlt/>Déconnexion</button>
            </li>
          ) : (
            <>
            <li>
            <Link to='/login'>
              <FaSignInAlt/>Connexion
            </Link>
          </li>
          <li>
            <Link to='/register'>
              <FaUser/>S'inscrire
            </Link>
          </li>
          </>
          )}
          
        </ul>
    </header>
  )
}

export default Header