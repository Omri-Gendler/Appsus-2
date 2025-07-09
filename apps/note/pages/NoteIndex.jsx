import { NoteList } from "../cmps/NoteList.jsx"
import {AddNote } from "../cmps/AddNote.jsx"
import { noteService } from "../services/note.service.js"
import { Modal } from "../cmps/Modal.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex({ logo }) {
    
    const [notes, setNotes] = useState(null)
    const [showModal, setShowModal] = useState(false)
    
    
    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])
    
   const pinnedNotes = notes ? noteService.createPinnedList(notes) : []
    
    function onRemoveNote(noteId) {
        noteService.remove(noteId)
        .then(() => {
            showSuccessMsg('Note Removed Successfully!')
            setNotes((prevNotes) =>
                prevNotes.filter(note => note.id !== noteId)
        )
    })
    .catch(err => {
        console.log(err)
        showErrorMsg('Problem removing Note')
    })
}

function onUpdateNote(updatedNote) {
  noteService.save(updatedNote).then(savedNote => {
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === savedNote.id ? savedNote : note))
    )
  })
}





function onAddNote(noteToSave) {
    noteService.add(noteToSave)
    .then(savedNote => {
        showSuccessMsg('Note Added Successfully!')
        setNotes(prevNotes => [...prevNotes, savedNote])
    })
    .catch(err => {
        console.error('Error saving note:', err)
        showErrorMsg('Problem adding Note')
    })
}



logo = "https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"

if (!notes) return <div className="container">Loading...</div>
return  <div className="notes-container">
    
                {/* <aside className="notes-side-bar">
    
                    {logo && (
                        <div className="notes-logo-container">
                            <img src={logo} alt="Section Logo" className="header-logo"/>
                        </div>
                    )}
                    <div className="notes-side-bar">
                        <span><Link to='/notes'>Notes</Link></span>
                        <span><Link to='/starred'>Reminders</Link></span>
                        <span><Link to='/snoozed'>Labels</Link></span>
                        <span><Link to='/sent'>Edit labels</Link></span>
                        <span><Link to='/drafts'>Drafts</Link></span>
                        <span><Link to='/trash'>Trash</Link></span>
                    </div>
                </aside> */}
                <main className="notes-main-content">
                    <AddNote onAddNote={onAddNote} />
                    
                    <NoteList notes={notes} pinnedNotes={pinnedNotes} logo={logo} onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote} />
                </main>
            </div>

}


