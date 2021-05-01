import React, { useState, useEffect } from 'react';
import './notes.styles.scss';
import { saveNote, getNotes } from '../../firebase/firebase.utils';
import Swal from 'sweetalert2';
import Item from './item/item.component';

export default function NotesSpace({ user }) {
  let id = user ? user.uid : null;
  const [tasks, setTasks] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const [newTask, setNewTask] = useState('');
  const [display, setDisplay] = useState('none');
  const [cursor, setCursor] = useState('');

  let handleChange = (e) => {
    e.preventDefault();
    let val = e.target.value;
    if (val.length <= 40) {
      setNewTask(val);
      setDisplay('none');
      setCursor('pointer');
    } else {
      setDisplay('block');
      setCursor('not-allowed');
    }
  };

  let handleClick = (e) => {
    //SAVE THE NOTE TO DB
    e.preventDefault();
    if (newTask)
      saveNote(newTask, id)
        .then((res) => {
          console.log(res);
          //update the task arr
          setTasks((prevState) => {
            let newSatte = [...prevState, res];
            return newSatte;
          });

          setNewTask('');
          Swal.fire({
            icon: 'success',
            text: `Yay! it's saved`,
          });
        })
        .catch((err) => {
          console.log(err, 'err saving the note');
        });
  };

  useEffect(() => {
    getNotes(id)
      .then((res) => {
        setDone(res.filter((item) => item.data().done === true));
        setInProgress(res.filter((item) => item.data().done === false));
        setTasks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return id ? (
    <div className='notes_container'>
      <span id='title'>Place your notes, tasks and more! 📝</span>
      <div className='addTasks'>
        <input
          type='text'
          name='addTask'
          className='newTask'
          onChange={handleChange}
          value={newTask}
        />
        <button style={{ cursor: `${cursor}` }} onClick={handleClick}>
          Add
        </button>
        <span id='warning' style={{ display: `${display}` }}>
          {' '}
          keep it simple, divide your work..!
        </span>
      </div>
      <div className='tasks'>
        <span style={{float:"left"}}>sort</span>
        {tasks
          ? tasks.map((item, idx) => {
              return (
                <Item
                  key={idx}
                  userId={id}
                  noteId={item.id}
                  note={item.data().task}
                  checked={item.data().done}
                />
              );
            })
          : null}
      </div>
    </div>
  ) : null;
}
