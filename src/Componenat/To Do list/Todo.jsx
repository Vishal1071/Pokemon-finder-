import { useState } from 'react'
import './Todo.css'
import { IoMdCheckmark } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const handleinputChange = (value) => {
    setInputValue(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) return;
    if (task.includes(inputValue)) { setInputValue(""); return; }
    setTask((prevTasks) => [...prevTasks, inputValue]);
    setInputValue("");
  };

  setInterval(() => {
    const now = new Date(); 
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    setDateTime(`${date} - ${time}`);
  }, 1000)

  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curTast) => curTast !== value);
    setTask(updatedTask);
  }
  const handleclear = () => {
    setTask([]);
  }

  return (
    <>
      <section className='todo-container'>
        <header>
          <h1>To-do list</h1>
        </header>
        <h2 className='data-time'>{dateTime}</h2>
        <section className='form'>
          <form action="" onSubmit={handleFormSubmit}>
            <div>
              <input type="text"
                className='todo-input'
                autoComplete='off'
                value={inputValue}
                onChange={(e) => handleinputChange(e.target.value)} />
            </div>

            <div>
              <button type='submit' className='todo-btn'>Add Task</button>
            </div>

          </form>
          <section className='myUnOrdList'>
            <ul>
              {
                task.map((curTast, index) => {
                  return <li key={index} className='todo-item'>
                    <span>{curTast}</span>
                    <button className='check-btn'><IoMdCheckmark /></button>
                    <button className='delete-btn' onClick={() => handleDeleteTodo(curTast)}><MdDeleteForever /></button>
                  </li>
                })
              }
            </ul>
          </section>
          <button className='clear-btn' onClick={handleclear}>All clear</button>
        </section>
      </section>
    </>
  )
}

export default Todo
