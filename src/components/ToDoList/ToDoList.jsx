import React from 'react';
import './ToDoList.css';

function ToDoList() {
  return (
    <div className='wrapper'>
      <div className="frame">
        <h2>React To-Do List</h2>
        <button className='btn-add'><span class="text-add">Add a new to-do</span></button>
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
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Learn React</td>
                    <td>Managing State, Escape Hatches, Effects</td>
                    <td>Programming</td>
                    <td>-</td>
                    <td>High</td>
                    <td>30%</td>
                </tr>
                <tr>
                    <td>Shopping</td>
                    <td>Potatoes, Onions, Eggs, Olive Oil</td>
                    <td>Household</td>
                    <td>26.02.2023</td>
                    <td>High</td>
                    <td>0%</td>
                </tr>
                <tr>
                    <td>Buy the tickets</td>
                    <td>at cheaptickets.com/shanghai</td>
                    <td>Travel</td>
                    <td>12.01.2023 12:00</td>
                    <td>Medium</td>
                    <td>100%</td>
                </tr>
                </tbody>
            </table>
        </div>
        <p className='copyright'>Patryk Kielian © 2023 all rights reserved</p>
      </div>
    </div>
  );
}

export default ToDoList;
