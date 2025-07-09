const {useState} = React
import { ColorPick } from "./ColorPick.jsx";

export function NoteActions({ onEdit, onPin, onDelete, onColor, isInForm }) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  function toggleColorPicker(ev) {
    ev.stopPropagation();
    setShowColorPicker(prev => !prev);
  }

  function handlePickColor(color) {
    onColor(color);           // Notify parent of new color
    setShowColorPicker(false); // Close modal after picking
  }

  return (
    <div className="note-actions">
      <button type="button" onClick={toggleColorPicker}>
        🎨
      </button>

      {showColorPicker && (
        <div className="color-modal-container">
          <ColorPick onPickColor={handlePickColor} onClose={() => setShowColorPicker(false)} />
        </div>
      )}

      {isInForm && <button type="submit" className="submit-btn">Submit</button>}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onPin}>Pin</button>
      {!isInForm && <button onClick={onDelete}>Delete</button>}
    </div>
  );
}
