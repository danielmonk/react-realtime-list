import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore, addTask, updateTask } from './Store'

export const TodoList = (uuid) => {
    const [newTaskText, setNewTaskText] = useState('')
    const { tasks, setTasks, list } = useStore({ uuid })
  
    return (
      <div className="container">
        <Link to="/" className="back"><button className="back">Back</button></Link>
        <h1 className="section">My Task List</h1>
        <div className="section sharing">
          <label>Sharing url: </label>
          <input className="right" type="text" readOnly value={window.location.href} />
        </div>
        <div className={'field-row section'}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setNewTaskText('')
            }}
          >
            <input
              id="newtask"
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="left"
            />
            <button type="submit" onClick={() => addTask(newTaskText, list.id)}>
              add task
            </button>
          </form>
        </div>
        <div className="section wrap">
          {tasks
            ? tasks.map((task) => {
                return (
                  <div key={task.id} className={'field-row list-item'}>
                    <input
                      checked={task.complete ? true : ''}
                      onChange={(e) => {
                        tasks.find((t, i) => {
                          if (t.id === task.id) {
                            tasks[i].complete = !task.complete
                            return true
                          } else {
                            return false
                          }
                        })
                        setTasks([...tasks])
                        updateTask(task.id, { complete: e.target.checked })
                      }}
                      type="checkbox"
                      id={`task-${task.id}`}
                    ></input>
                    <label htmlFor={`task-${task.id}`}>
                      {task.complete ? <del>{task.task_text}</del> : task.task_text}
                    </label>
                  </div>
                )
              })
            : ''}
        </div>
      </div>
    )
  }