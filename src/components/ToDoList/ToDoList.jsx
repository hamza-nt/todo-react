import React from 'react';
import './ToDoList.css';
import modifIcon from '../../images/modif.png';
import deleteIcon from '../../images/delete.png';
import { useNavigate } from 'react-router-dom';

function ToDoList() {
    
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/add');
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
                <tr>
                    <td id='tr-task'>Learn React</td>
                    <td id='tr-desc'>Managing State, Escape Hatches, Effects</td>
                    <td id='tr-cat'>Programming</td>
                    <td id='tr-when'>-</td>
                    <td id='tr-prio'>High</td>
                    <td id='tr-ful'>30%</td>
                    <td><a><img className='modif-del' src={modifIcon}/></a></td>
                    <td><a><img className='modif-del' src={deleteIcon}/></a></td>
                </tr>
                <tr>
                    <td id='tr-task'>Shopping</td>
                    <td id='tr-desc'>Potatoes, Onions, Eggs, Olive Oil</td>
                    <td>Household</td>
                    <td>26.02.2023</td>
                    <td>High</td>
                    <td>0%</td>
                    <td><a><img className='modif-del' src={modifIcon}/></a></td>
                    <td><a><img className='modif-del' src={deleteIcon}/></a></td>
                </tr>
                <tr>
                    <td id='tr-task'>Buy the tickets</td>
                    <td id='tr-desc'>at cheaptickets.com/shanghai</td>
                    <td>Travel</td>
                    <td>12.01.2023 12:00</td>
                    <td>Medium</td>
                    <td>100%</td>
                    <td><a><img className='modif-del' src={modifIcon}/></a></td>
                    <td><a><img className='modif-del' src={deleteIcon}/></a></td>
                </tr>
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
