import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote , onUpdateNote}) {

    if (!notes || notes.length === 0) {
        return <div className="no-notes">No notes to show</div>
    }
    return (
        <div >
            <ul className="note-list grid">
                {notes.map(note => (
                    < NotePreview
                        key={note.id}
                        note={note}
                        onRemoveNote={onRemoveNote}
                        onUpdateNote={onUpdateNote}
                    />
                ))}
                {console.log(notes)}
            </ul>
        </div>
    )
}
