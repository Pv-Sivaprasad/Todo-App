import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';
import edit from '../assets/edit.png'; 

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo, editId, saveEdit, editRef }) => {
    return (
        <div className='text-black flex items-center my-3 gap-2'>
            {editId === id ? (
                <>
                    <input ref={editRef} className='flex-1 text-black bg-transparent border-0 outline-none h-10 pl-2' type="text" defaultValue={text} />
                    <button onClick={() => saveEdit(id)} className='border-none rounded bg-blue-600 w-20 h-10 text-lg font-medium cursor-pointer'>Save</button>
                </>
            ) : (
                <>
                    <div onClick={() => toggle(id)} className='flex-1 flex items-center cursor-pointer'>
                        <img src={isComplete ? tick : not_tick} alt="" className='w-7' />
                        <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? 'line-through' : ''}`}>
                            {text}
                        </p>
                    </div>
                    <img onClick={() => editTodo(id)} src={edit} alt="" className='w-3.5 cursor-pointer' />
                    <img onClick={() => deleteTodo(id)} src={delete_icon} alt="" className='w-3.5 cursor-pointer' />
                </>
            )}
        </div>
    );
};

export default TodoItems;
