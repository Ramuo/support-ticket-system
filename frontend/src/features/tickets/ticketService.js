import axios from 'axios';

// Set the URL
const API_URL = '/api/tickets/';

//Create New ticket
const createTicket = async(ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ticketData, config)

    
    return response.data
}

const ticketService = {
    createTicket
}

export default ticketService
