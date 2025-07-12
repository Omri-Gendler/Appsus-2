
import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

const componentsMap = {
  NoteTxt,
  NoteImg,
  NoteTodos,
}

export function DynamicCmp({ info, type }) {
  const Component = componentsMap[type]
  if (!Component) return <p>Unknown note type: {type}</p>
  return <Component info={info} />
}
