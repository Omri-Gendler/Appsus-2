import { NotePreview } from "./NotePreview.jsx"
const {useState, Fragment} = React

export function NoteList({pinnedNotes, notes, onRemoveNote , onUpdateNote}) {
   
    if (!notes || notes.length === 0) {
        return <div className="no-notes">No notes to show</div>
    }

    const unpinnedNotes = notes.filter(note => !note.isPinned)

    return (
        <Fragment>
            {pinnedNotes && pinnedNotes.length > 0 && (
                <section>
                    <h2>Pinned</h2>
                    <ul className="note-list">
                        {pinnedNotes.map(note => (
                            <NotePreview
                                key={note.id}
                                note={note}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                            />
                        ))}
                    </ul>
                </section>
            )}

            {unpinnedNotes.length > 0 && (
                <section>
                    {pinnedNotes && pinnedNotes.length > 0 && <h2>Others</h2>}
                    <ul className="note-list">
                        {unpinnedNotes.map(note => (
                            <NotePreview
                                key={note.id}
                                note={note}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                            />
                        ))}
                    </ul>
                </section>
            )}
        </Fragment>
    )
}