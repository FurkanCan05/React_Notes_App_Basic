import "./style/app.scss"
import "./style/style.scss"
import { useState } from "react"

export default function App() {
  const [inputText, setInputText] = useState('')
  const [notes, setNotes] = useState([
    {
      note: "Learn HTML",
      isDone: false,
    },
    {
      note: "Learn CSS ",
      isDone: false,
    },
    {
      note: "Learn Javascript",
      isDone: false,
    },
    {
      note: "Work Hard",
      isDone: false,
    },
  ])

  //Add new note
  const addNote = () => {
    if(inputText.trim().length !== 0){
      setNotes((oldNotes)=>[
        ...oldNotes,
        {
          note : inputText,
          isDone : false,
        }
      ])
    }
    setInputText('')
  }

  //Mark done-undone
  const markDone = (val, index) => {
    setNotes(notes.map((note, i)=>{
      if(i === index){
        return {...note, isDone : val}
      }
      else{
        return note
      }
    }))
  }

  //Delete note
  const deleteNote = (index) => {
    setNotes(notes.filter(note => notes.indexOf(note) !== index))
  }

  //Delete completed notes
  const clearCompleted = ()=>{
    setNotes(notes.filter(note => note.isDone === false))
  }

  //Press enter in input
  const pressEnter = (key) => {
    if (key === "Enter") {
      addNote();
    }
  }

  return (
    <div className="app">
      <div className="container">
        <p className="title">TODO APP</p>
        <div className="new-note">
          <button type="button" onClick={()=>addNote()}>
            <ion-icon name="add-outline"></ion-icon>
          </button>
          <input
            type="text"
            placeholder="Type your note here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e)=>pressEnter(e.key)}
          />
        </div>
        <ul>
          {notes.length < 1 ? (
            <p className="no-note-message">No notes here. Add one now!</p>
          ) : null}
          {notes.map((note, i) => {
            return (
              <li key={i} className={note.isDone ? "done-todo" : null}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={note.isDone}
                  title={notes.isDone ? "Check undone" : "Check done"}
                  onClick={(e)=>markDone(e.target.checked, i)}
                ></input>
                <p className={note.isDone ? "done-p" : null}>{note.note}</p>
                <ion-icon
                  name="trash-outline"
                  title="Delete note"
                  onClick={()=>deleteNote(i)}
                ></ion-icon>
              </li>
            );
          })}
        </ul>
        <footer>
          <p>{notes.length} items left</p>
          <button type="button" onClick={()=>clearCompleted()}>Clear Complated</button>
        </footer>
      </div>
    </div>
  );
}
