import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {FaSignInAlt} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {login, reset} from '../features/auth/authSlice'; //This is an action from the auth/authSlice
import Spinner from '../components/Spinner';


function Login() {
  // State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  //Let's dispatch the register action from auth/authSlice
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Let's select pieces of our state (global state) from auth/authSlice
  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message);
    }

    // Redirect 
    if(isSuccess || user){
      navigate('/');
    }

    dispatch(reset());

  }, [isLoading, isSuccess, isError, message, user, navigate, dispatch]);


  // Functions
  // Function onChange
  const onChange = (e) =>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function onSubmit
  const onSubmit = (e) =>{
    e.preventDefault();

    //Let's get userData from the form
    const userData = {
      email,
      password
    };

    //let's dispatch login and pass in userData
    dispatch(login(userData));

  }; 

  if(isLoading){
    return <Spinner/>
  }

  // Rendered Elements
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/>Connexion
        </h1>
        <p>Veuillez vous connecter pour obtenir de l'aide</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
            className="form-control" 
            type="email"
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder="Votre email"
            required
            />
          </div>
          <div className="form-group">
            <input
            className="form-control" 
            type="password"
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder="Votre mot de passe"
            required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Envoyer</button>
          </div>
        </form>
      </section>
    </> 
  )
}

export default Login