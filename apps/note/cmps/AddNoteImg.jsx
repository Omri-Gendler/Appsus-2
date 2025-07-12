const {useRef} = React

export function AddNoteImg({ 
  title, 
  setTitle, 
  url, 
  setUrl, 
  txt,
  setTxt,
  color,
  titleInputRef 
}) {
   

  function onFileChange(ev) {
    const file = ev.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setUrl(e.target.result) 
    }
    reader.readAsDataURL(file)
  }

    function onRemoveImage() {
    setUrl(null)
    }

return (
    <div className="note-expanded">
      <input
        ref={titleInputRef}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {!url && (
        <label className="file-upload-label">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
        </label>
      )}

      {url && (
        <div className="image-preview-container" style={{ marginTop: "10px" }}>
          <img
            src={url}
            alt="Preview"
            style={{
              maxWidth: "100px",
              maxHeight: "180px",
              borderRadius: "8px"
            }}
          />
          <button 
            type="button" 
            onClick={onRemoveImage} 
            className="remove-image-btn"
            style={{
              display: "block",
              marginTop: "5px",
              backgroundColor: "#fff",
              color: "black",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer"
            }}
          >
            Remove Image
          </button>
        </div>
      )}

      <textarea
        placeholder="Take a note..."
        className="note-txt"
        value={txt}
        onChange={(ev) => setTxt(ev.target.value)}
        style={{ backgroundColor: color }}
      />
    </div>
  )
}
