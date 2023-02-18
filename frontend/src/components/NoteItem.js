import {useSelector} from 'react-redux'

function NoteItem({note}) {
    // STATE
    const {user} = useSelector((state) => state.auth)


    //rendered elements
    return (
    <div className='note'style={{
        backgroundColor: note.isStaff ? 'rgba(0, 0, 0, 0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000'
    }}
    >
        <h4> Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span> }</h4>
        <p>{note.text}</p>
        <div className='note-date'>
            {new Date(note.createdAt).toLocaleString('en-FR')}
        </div>
    </div>
    )
}

export default NoteItem