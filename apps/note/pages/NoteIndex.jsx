import { NoteList } from "../cmps/NoteList.jsx"
import {AddNote } from "../cmps/AddNote.jsx"
import { noteService } from "../services/note.service.js"

import { Modal } from "../cmps/Modal.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { NoteEdit } from "../cmps/NoteEdit.jsx"



const { NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex({ logo }) {
    
    const [notes, setNotes] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)


    
    
    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])
    
   const pinnedNotes = notes ? noteService.createPinnedList(notes) : []
    
    function onRemoveNote(noteId) {
        console.log('Deleting note id:', noteId)
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

function onCloseModal() {
  setShowModal(false)
  setSelectedNote(null)
}


function onSaveEditedNote(updatedNote) {
  noteService.save(updatedNote).then(savedNote => {
    setNotes(prev =>
      prev.map(note => note.id === savedNote.id ? savedNote : note)
    )
    setShowModal(false)
    setSelectedNote(null)
    showSuccessMsg('Note saved!')
  }).catch(() => {
    showErrorMsg('Failed to save note')
  })
}


function onSelectNote(note) {
    console.log('on selected', note)
  setSelectedNote(note) 
  setShowModal(true)
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





if (!notes) return <div className="container">Loading...</div>
return  <div className="notes-container">
    
            <aside className="notes-side-bar-container">
              <div className="notes-side-bar">
                <div className="sidebar-link">
                  <NavLink to="/note" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343">
                      <path d="M479.79-96Q450-96 429-117.15T408-168h144q0 30-21.21 51t-51 21ZM336-216v-72h288v72H336Zm-15-120q-62-38-95.5-102.5T192-576q0-120 84-204t204-84q120 0 204 84t84 204q0 73-33.5 137.5T639-336H321Zm23-72h272q38-31 59-75t21-93q0-90.33-62.77-153.16-62.77-62.84-153-62.84Q390-792 327-729.16 264-666.33 264-576q0 49 21 93t59 75Zm136 0Z" />
                    </svg>
                    <span>Notes</span>
                  </NavLink>
                </div>

                <div className="sidebar-link">
                  <NavLink to="/Reminders" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343">
                      <path d="M192-216v-72h48v-240q0-87 53.5-153T432-763v-53q0-20 14-34t34-14q20 0 34 14t14 34v53q85 16 138.5 82T720-528v240h48v72H192Zm288-276Zm-.21 396Q450-96 429-117.15T408-168h144q0 30-21.21 51t-51 21ZM312-288h336v-240q0-70-49-119t-119-49q-70 0-119 49t-49 119v240Z" />
                    </svg>
                    <span>Reminders</span>
                  </NavLink>
                </div>

                <div className="sidebar-link">
                  <NavLink to="/Labels" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343">
                      <path d="M168-192q-29.7 0-50.85-21.16Q96-234.32 96-264.04v-432.24Q96-726 117.15-747T168-768h420q16.85 0 31.92 7.5Q635-753 646-739l194 259-194 259q-11 14-26.08 21.5Q604.85-192 588-192H168Zm0-72h420l162-216-162-216H168v432Zm210-216Z" />
                    </svg>
                    <span>Labels</span>
                  </NavLink>
                </div>

                <div className="sidebar-link">
                  <NavLink to="/Edit-labels" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343">
                      <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                    </svg>
                    <span>Edit Labels</span>
                  </NavLink>
                </div>

                <div className="sidebar-link">
                  <NavLink to="/Archive" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343">
                      <path d="m480-276 144-144-51-51-57 57v-150h-72v150l-57-57-51 51 144 144ZM216-624v408h528v-408H216Zm0 480q-29.7 0-50.85-21.15Q144-186.3 144-216v-474q0-14 5.25-27T165-741l54-54q11-11 23.94-16 12.94-5 27.06-5h420q14.12 0 27.06 5T741-795l54 54q10.5 11 15.75 24t5.25 27v474q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm6-552h516l-48-48H270l-48 48Zm258 276Z" />
                    </svg>
                    <span>Archive</span>
                  </NavLink>
                </div>

                <div className="sidebar-link">
                  <NavLink to="/Deleted" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343">
                      <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                    </svg>
                    <span>Deleted</span>
                  </NavLink>
                </div>
              </div>
            </aside>

                <main className="notes-main-content">
                    <AddNote onAddNote={onAddNote} />
                    
                    <NoteList
                        notes={notes}
                        pinnedNotes={pinnedNotes}
                        onRemoveNote={onRemoveNote}
                        onUpdateNote={onUpdateNote}
                        onSelectNote={onSelectNote} 
                        selectedNoteId={selectedNote ? selectedNote.id : null}
                        />

                </main>
                <Modal isOpen={showModal} onClose={onCloseModal}>
                    <NoteEdit
                        note={selectedNote}
                        onSave={(updatedNote) => {
                        onUpdateNote(updatedNote)
                        onCloseModal()
                        showSuccessMsg('Note saved!')
                        }}
                    />
                    </Modal>




            </div>

}


