import { NoteImg } from "./NoteImg.jsx";
import { NoteTxt } from "./NoteTxt.jsx";
import { NoteTodos } from "./NoteTodos.jsx";

  
export function DynamicCmp({ info, type }) {
  switch (type) {
    case 'NoteTxt':
      return <NoteTxt info={info}/>
    case 'NoteImg':
      return <NoteImg info={info} />
    case 'NoteTodos':
      return <NoteTodos info={info} />
    default:
      return <p>Unknown note type</p>
  }
}