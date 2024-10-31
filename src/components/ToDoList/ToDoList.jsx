import React, { useEffect, useState } from 'react';
import './ToDoList.css';
import modifIcon from '../../images/modif.png';
import deleteIcon from '../../images/delete.png';
import { useNavigate } from 'react-router-dom';

function ToDoList() {
    
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
        const response = await fetch('http://localhost:5000/todos');
        const data = await response.json();
        setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleClick = () => {
        navigate('/add');
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
    if (confirmed) {
        await fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE',
        });
        setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className='wrapper'>
      <div className="frame">
        <h2 className='h2-1'>React To-Do List</h2>
        <button className='btn-add' onClick={handleClick}><span class="text-add">Add a new to-do</span></button>
        <button className='btn-all'><span class="text-all">All</span></button>
        <button className='btn-todo'><span class="text-todo">To-do</span></button>
        <button className='btn-completed'><span class="text-add">Completed</span></button>
        <div class="sous-frame">
            <table>
                <thead>
                <tr>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>When</th>
                    <th>Priority</th>
                    <th>Fulfillment</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td id='tr-task'>{task.task}</td>
                      <td id='tr-desc'>{task.description}</td>
                      <td id='tr-cat'>{task.category}</td>
                      <td id='tr-when'>{task.when}</td>
                      <td id='tr-prio'>{task.priority}</td>
                      <td id='tr-ful'>{task.fulfillment}</td>
                      <td><button onClick={() => handleEdit(task.id)}><img className='modif-del' src={modifIcon}/></button></td>
                      <td><button onClick={() => handleDelete(task.id)}><img className='modif-del' src={deleteIcon}/></button></td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
        <footer>
          <p className='copyright'>Patryk Kielian © 2023 all rights reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default ToDoList;
