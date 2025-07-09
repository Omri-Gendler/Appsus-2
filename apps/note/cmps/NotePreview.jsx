import { NoteActions } from "./NoteActions.jsx";

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
  function handlePickColor(pickedColor) {
    const updatedNote = {
      ...note,
      style: {
        ...note.style,
        backgroundColor: pickedColor,
      },
    };
    onUpdateNote(updatedNote);
  }

  // Other handlers here (onEdit, onPin, onDelete)...

  return (
    <div className="note" style={{ backgroundColor: note.style.backgroundColor || "#fff" }}>
      <h1>{note.info.title}</h1>
      <p>{note.info.txt}</p>

      <NoteActions
        onEdit={() => {}}
        onPin={() => {}}
        onDelete={() => onRemoveNote(note.id)}
        onColor={handlePickColor}
        isInForm={false}
      />
    </div>
  );
}
