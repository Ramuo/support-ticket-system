import {Link} from 'react-router-dom'
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa';

function Home() { 
  return (
    <>
      <section className="heading">
        <h1 >Avez-vous besoin d'aide?</h1>
        <p>Veuillez choisir parmi une option ci-dessous</p>
      </section>

      <Link to='/new-ticket' className='btn btn-reverse btn-block' >
        <FaQuestionCircle/> Créer un nouveau ticket
      </Link>

      <Link to='/tickets' className='btn btn-block' >
        <FaTicketAlt/> Voir mes tickets
      </Link>
      
    </>
  )
}

export default Home