import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'; 
import {FaUser} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../features/auth/authSlice'; //This is an action from the auth/authSlice
import Spinner from '../components/Spinner';




function Register() {
  // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formData;

  //Let's dispatch the register action from auth/authSlice
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Let's select pieces of our state (global state) from auth/authSlice
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);
 
  useEffect(()=> {
    if(isError){
      toast.error(message);
    }

    // Redirect if it is a success when logged in
    if(isSuccess || user){
      navigate('/');
    }

    dispatch(reset());

  }, [isError, isSuccess, user, message, navigate, dispatch]);


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

    // Check if psw not match
    if(password !== password2){
      toast.error('Password do not match')
    }else{
      //If psw match
      const userData ={
        name,
        email,
        password
      };

      //let's dispatch register and pass in userData
      dispatch(register(userData));
    }
  }; 

  if(isLoading){
    return <Spinner/>
  }

  // Rendered Elements
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser/>S'inscrire
        </h1>
        <p>Veuillez créer un compte</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
            className="form-control" 
            type="text"
            id='name'
            name='name'
            value={name}
            onChange={onChange}
            placeholder="Votre Nom"
            required
            />
          </div>
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
            <input
            className="form-control" 
            type="password"
            id='password2'
            name='password2'
            value={password2}
            onChange={onChange}
            placeholder="Confirmer mot de passe"
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

export default Register