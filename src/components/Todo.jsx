import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
    const [todoList, setTodoList] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
    const [editId, setEditId] = useState(null);
    const inputRef = useRef();
    const editRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === '') {
            return;
        }
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = '';
    };

    const deleteTodo = (id) => {
        setTodoList((prvTodos) => prvTodos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id) => {
        setEditId(id);
        const todoToEdit = todoList.find((todo) => todo.id === id);
        if (todoToEdit) {
            editRef.current.value = todoToEdit.text;
        }
    };

    const saveEdit = (id) => {
        const updatedText = editRef.current.value.trim();
        if (updatedText === '') {
            return;
        }
        setTodoList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: updatedText } : todo
            )
        );
        setEditId(null);
    };

    const toggle = (id) => {
        setTodoList((prvTodos) =>
            prvTodos.map((todo) =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    };

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text-black text-3xl font-semibold'>To-Do List</h1>
            </div>
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='text-black bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add Your Task' />
                <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-lg font-medium cursor-pointer ml-2'>Add +</button>
            </div>
            <div>
                {todoList.map((item) => {
                    return (
                        <TodoItems
                            key={item.id}
                            text={item.text}
                            id={item.id}
                            isComplete={item.isComplete}
                            deleteTodo={deleteTodo}
                            toggle={toggle}
                            editTodo={editTodo}
                            editId={editId}
                            saveEdit={saveEdit}
                            editRef={editRef}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Todo;
