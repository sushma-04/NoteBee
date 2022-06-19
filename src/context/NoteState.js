import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"
  const noteInitial = []
  const [notes, setNotes] = useState(noteInitial)

  //fetchnotes
  const getNote = async () => {
    // http://localhost:5000/api/notes/fetchallnotes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }
  //add 
  const addNote = async (title, description, tag) => {
    //      http://localhost:5000/api/notes/addnote
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }
  //delete            
  const deleteNote = async (id) => {
    console.log("delete note" ,id);
    //                            http://localhost:5000/api/notes/deletenote/626944e14fe99a1763a35c79
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //update note
  const editNote = async (id, title, description, tag) => {
    //http://localhost:5000/api/notes/updatenote/626944e14fe99a1763a35c79
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;