import { NotePreview } from "./NotePreview.jsx"
const {useState, Fragment,useRef, useEffect} = React

export function NoteList({pinnedNotes, notes, onRemoveNote , onUpdateNote, onSelectNote,selectedNoteId}) {
   
    if (!notes || notes.length === 0) {
        return <div className="no-notes">No notes to show</div>
    }


    const unpinnedNotes = notes.filter(note => !note.isPinned)

    return (
        <Fragment>
            {pinnedNotes && pinnedNotes.length > 0 && (
                <section>
                    <h3>Pinned</h3>
                    <ul className="note-list">
                        {pinnedNotes.map(note => (
                            <NotePreview
                                key={note.id}
                                note={note}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                                onSelectNote={onSelectNote} 
                            />
                        ))}
                    </ul>
                </section>
            )}

            {unpinnedNotes.length > 0 && (
                <section>
                    {pinnedNotes && pinnedNotes.length > 0 && <h3>Others</h3>}
                    <ul className="note-list">
                        {unpinnedNotes.map(note => (
                            <NotePreview
                                key={note.id}
                                note={note}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                                onSelectNote={onSelectNote} 
                            />
                        ))}
                    </ul>
                </section>
            )}
        </Fragment>
    )
}