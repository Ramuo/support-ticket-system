import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {FaPlus} from 'react-icons/fa';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {getTicket, closeTicket} from '../features/tickets/ticketSlice';
import {getNotes, createNote, reset as notesReset } from '../features/notes/noteSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
};

Modal.setAppElement('#root')




function Ticket() {
    //State
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState('');
  

    //Redux selector
    // Ticket
    const {ticket, isLoading, isError, isSuccess, message} = useSelector((state) => state.tickets);
    //Note
    const {notes, isLoading: notesIsLoading } = useSelector((state) => state.notes);

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {ticketId} = useParams();

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));

        // eslint-disable-next-line
    }, [isError, message, ticketId]);

     // FUNCTIONS
    // Function to close ticket
    const onTicketClose = () =>{
        dispatch(closeTicket(ticketId));
        toast.success('Ticket closed');
        navigate('/tickets');
    };

     //Function create note submit
     const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({ noteText, ticketId }))
 
        closeModal();
     }


    if(isLoading || notesIsLoading){
        return <Spinner/>
    }
    if(isError){
        return <h3>Something went wrong</h3>
    }

    // Function to Open/close
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false)
    

    // Rendered element
    return (
    <div className='ticket-page'>
        <header className="ticket-header">
            <BackButton url='/tickets'/>
            <h2>
                tcket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                </span>
            </h2>
            <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-FR')}</h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className="ticket-desc">
                <h3>Description of issue</h3>
                <p>{ticket.description}</p>
            </div>
            <h2>Notes</h2>
        </header>
        

        {ticket.status !== 'closed' && (
            <button onClick={openModal} className="btn"> <FaPlus/> Add Note</button>
        )}

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles} contentLabel = 'Add Note'
        >
            <h2>Add Note</h2>
            <button 
            className='btn-close' 
            onClick={closeModal }>
                X
            </button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea 
                    name="noteText" 
                    id="noteText" 
                    className='form-control' 
                    placeholder='Note text'
                    value={noteText}
                    onChange={(e)=> setNoteText(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className="form-group">
                    <button className="btn" type='submit'>Submit</button>
                </div>
            </form>
        </Modal>

        {notes.map((note) => (
            <NoteItem key={note._id} note={note}/>
        ))}


        {ticket.status !== 'closed' && (
            <button 
            onClick={onTicketClose}
            className="btn btn-block btn-danger"
            >
                Close Ticket
            </button>
        ) 
        }
    </div>
    )
}

export default Ticket