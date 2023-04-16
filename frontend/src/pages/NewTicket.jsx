import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {createTicket, reset} from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';




function NewTicket() {
    // // let's bring in user from Global state
    const {user} = useSelector((state)=> state.auth);

    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.tickets);

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setdescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            dispatch(reset());
            navigate('/tickets')
        }
        dispatch(reset());


    }, [dispatch, isError, isSuccess, navigate, message]);

    // FUNCTIONS
    //Onsubmit functions
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket({product, description}));
    }
    
    if(isLoading){
       return  <Spinner/>
    }


    // Rendered elements
    return (
    <>
        <BackButton url='/'/>
        <section className='heading'>
            <h1>Créer un nouveau Ticket</h1>
            <p>Remplissez le formulaire ci-dessous</p>
        </section>

        <section className='form'>
            <div className='form-group'>
                <label htmlFor='name'>Nom du client</label>
                <input 
                className='form-control' type="text" value={name} disabled/>
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email client</label>
                <input 
                className='form-control' type="text" value={email} disabled/>
            </div>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="product">Produit</label>
                    <select 
                    name="product" 
                    id="product" 
                    value={product} 
                    onChange={(e) => setProduct(e.target.value) }
                    >
                        <option value="iPhone">iPhone</option>
                        <option value="Macbook Pro">Macbook Pro</option>
                        <option value="iMac">iMac</option>
                        <option value="iPad">iPad</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                    name="description" 
                    id="description"  
                    className='form-control' 
                    placeholder='Description' 
                    value={description} onChange={(e) => setdescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Envoyer</button>
                </div>
            </form>
        </section>
    </>
    )
}

export default NewTicket