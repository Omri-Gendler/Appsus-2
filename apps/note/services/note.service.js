import { loadFromStorage, makeId, makeLorem, saveToStorage } from '../services/util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = 'noteDB'

const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#fff' },
        info: {
            title: 'hellow',
            txt: 'hi kdfiknfeifnefn ejnfeinfienf ejknfebnfeinbf jenfiewfieqfipeq ejfneif njebnfie ienwflibnfeibf. ejkfbewjkbfjeb hkeb wfkjekwhbf kbnefiewbf ewfjnewfbn'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: './img/noteImgs/horse.jpeg',
            title: 'Bobi and Me',
            txt: ''
        },
        style: { backgroundColor: '#fff' }
    },
    {
        id: 'n103',
        createdAt: 1112230,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#fce4ec' },
        info: {
            title: 'Grocery List',
            txt: 'Milk, Eggs, Bread, Butter, Tomatoes'
        }
    },
    {
        id: 'n104',
        createdAt: 1112240,
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: './img/noteImgs/beach.jpeg',
            title: 'Summer Memories',
            txt: 'Vacation in Greece 🏖️'
        },
        style: { backgroundColor: '#e3f2fd' }
    },
    {
        id: 'n105',
        createdAt: 1112250,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#fff3e0' },
        info: {
            title: 'Meeting Notes',
            txt: 'Discuss Q3 roadmap and budget approvals.'
        }
    },
    {
        id: 'n106',
        createdAt: 1112260,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: './img/noteImgs/cat.jpeg',
            title: 'Sleepy Cat',
            txt: 'So cute!'
        },
        style: { backgroundColor: '#f3e5f5' }
    },
    {
        id: 'n107',
        createdAt: 1112270,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#f1f8e9' },
        info: {
            title: 'Books to Read',
            txt: '1984, Sapiens, Atomic Habits, The Alchemist'
        }
    },
    {
        id: 'n108',
        createdAt: 1112280,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: './img/noteImgs/mountain.jpeg',
            title: 'Nature Escape',
            txt: ''
        },
        style: { backgroundColor: '#e0f7fa' }
    },
    {
        id: 'n109',
        createdAt: 1112290,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#ede7f6' },
        info: {
            title: 'App Ideas',
            txt: 'Mood tracker, Plant care reminder, Daily doodle app'
        }
    },
    {
        id: 'n110',
        createdAt: 1112300,
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: './img/noteImgs/sunset.jpeg',
            title: 'Golden Hour',
            txt: 'Captured this yesterday!'
        },
        style: { backgroundColor: '#fff8e1' }
    }
];


_createNotes()



const loggedinUser = {
    enote: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const noteService = {
    query,
    get,
    add,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    createPinnedList
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.subject))
            }
            return notes
        })
}

function get(bookId) {
    return storageService.get(NOTE_KEY, bookId)
        .then(_setNextPrevCarId)
}

function remove(bookId) {
    return storageService.remove(NOTE_KEY, bookId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(subject = '') {
    return { subject }
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createNotes() {
   let notes = loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
    saveToStorage(NOTE_KEY, gNotes)
    }
}



function add(note) {
    note.id = makeId()
    gNotes.unshift(note)
    saveToStorage('noteDB', gNotes)
    return Promise.resolve(note)
}

function createPinnedList(notes) {
    const pinned =notes.filter(note => note.isPinned)
    saveToStorage('pinnedNotes', pinned)
    return pinned
}

console.log()

function updateNote(updatedNote) {
  const notes = loadFromStorage(NOTE_KEY)
  const idx = notes.findIndex(note => note.id === updatedNote.id)
  if (idx !== -1) {
    notes.splice(idx, 1, updatedNote)
    saveToStorage(NOTE_KEY, notes)
  }
  return notes
}