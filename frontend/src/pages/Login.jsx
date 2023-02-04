import {useState} from 'react';
import {toast} from 'react-toastify';
import {FaSignInAlt} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../features/auth/authSlice'; //This is an action from the auth/authSlice


function Login() {
  // State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  //Let's dispatch the register action from auth/authSlice
  const dispatch = useDispatch()

  // Let's select pieces of our state (global state) from auth/authSlice
  const {user, isLoading, isSuccess, message} = useSelector(state => state.auth)


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


  // Rendered Elements
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/>Login
        </h1>
        <p>Please login to get support</p>
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </> 
  )
}

export default Login