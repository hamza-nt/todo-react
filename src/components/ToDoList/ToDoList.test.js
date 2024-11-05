import { render, screen } from '@testing-library/react';
import ToDoList from './ToDoList';
import { MemoryRouter } from 'react-router-dom';
describe('Composant ToDoForm', () => {

    test('Affichage de la liste des tâches', async () => {
        render(
            <MemoryRouter>
                <ToDoList />
            </MemoryRouter>
        );
        const listElement = screen.getByTestId('todo-list');
        expect(listElement).toBeInTheDocument();
    });

});