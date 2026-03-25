// import { useState ,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import Navbar from './components/Navbar'
// import { UUID } from 'mongodb'
// // import './App.css'

// function App() {
//   const [todo, settodo] = useState(" ")
//   const [todos, settodos] = useState([])
//   const [finished, setfinished] = useState(true)

//   const saveToLS = (params) => {
//     localStorage.setItem("todos", JSON.stringify(todos))
//   }

//   const handleadd = () =>{
//     settodos([...todos,{id: UUID(),todo,isCompleted: false}])
//     settodo("")
//     saveToLS()
//   }

//   return (
//     <>
//       <Navbar />

//       <div>
//         <div className="main my-5 bg-cyan-700 m-auto w-[50%] font-sans rounded-2xl min-h-[70vh]">
//           <div className="head text-center font-bold text-2xl pt-4">UTask Your Task Manager</div>
//           <div className="addtask m-4">
//             <input onChange={handlechange} value={todo} className="w-[70%] m-4 rounded-lg p-2" type="text" />
//             <button onClick={handleadd} disabled={todo.length<=3} className='save-btn py-2 px-5 bg-cyan-500 rounded-xl hover:bg-cyan-600'>Save</button>
//           </div>
//           <div className="line h-1 bg-cyan-950 w-[90%] m-auto">
//           </div>
//           <div className='flex mt-4 ml-8 gap-4'>
//             <input type="checkbox" name="" id="" />
//             <div className='font-bold'>Show Completed Tasks</div>
//           </div>
//           <div className="task-hd mt-4 ml-8 font-bold text-xl">Your Tasks</div>
//           <div className='tasksdisp mt-4 ml-8 flex gap-4'>
//             <input type="checkbox" name="" id="" />
//             <div>Your Tasks</div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default App

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    <>
      <Navbar/>

      <div className="min-h-screen bg-gradient-to-br from-violet-200 via-purple-200 to-pink-200 flex items-center justify-center p-4">

        <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-white/30">

          <h1 className='font-extrabold text-center text-3xl text-gray-800 mb-4'>
            ✨ iTask - Smart Todo Manager
          </h1>

          {/* Add Todo */}
          <div className="addTodo my-6 flex flex-col gap-4">
            <h2 className='text-xl font-semibold text-gray-700'>Add New Task</h2>

            <div className="flex items-center gap-3">
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                placeholder="Enter your task..."
                className='w-full rounded-full px-5 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm'
              />

              <button
                onClick={handleAdd}
                disabled={todo.length<=3}
                className='bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-105 transition-transform duration-200 disabled:opacity-50 px-5 py-2 text-sm font-semibold text-white rounded-full shadow-md'
              >
                Add
              </button>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2 my-4">
            <input
              id='show'
              onChange={toggleFinished}
              type="checkbox"
              checked={showFinished}
              className="accent-violet-600 w-4 h-4"
            /> 
            <label className='text-gray-700 font-medium' htmlFor="show">
              Show Completed Tasks
            </label>
          </div>

          <div className='h-[1px] bg-gray-300 w-full my-4'></div>

          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Your Tasks
          </h2>

          {/* Todos */}
          <div className="todos space-y-3 max-h-[400px] overflow-y-auto pr-2">

            {todos.length === 0 && (
              <div className='text-center text-gray-500 mt-5'>
                🚀 No tasks yet. Start adding!
              </div>
            )}

            {todos.map(item => {
              return (showFinished || !item.isCompleted) && 
              
              <div
                key={item.id}
                className="flex justify-between items-center bg-white shadow-md rounded-xl px-4 py-3 hover:shadow-lg transition duration-200"
              >

                <div className='flex items-center gap-4'>
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="accent-violet-600 w-4 h-4"
                  />

                  <div className={`text-gray-800 ${item.isCompleted ? "line-through text-gray-400" : ""}`}>
                    {item.todo}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e)=>handleEdit(e, item.id)}
                    className='bg-blue-500 hover:bg-blue-600 transition px-3 py-2 text-white rounded-lg shadow-sm'
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={(e)=>{handleDelete(e, item.id)}}
                    className='bg-red-500 hover:bg-red-600 transition px-3 py-2 text-white rounded-lg shadow-sm'
                  >
                    <AiFillDelete />
                  </button>
                </div>

              </div>
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default App