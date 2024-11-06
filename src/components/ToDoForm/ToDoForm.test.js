import { render, screen, waitFor } from '@testing-library/react';
import ToDoForm from './ToDoForm';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { mockTaskData } from '../../tests/mocks';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn();

describe('Composant ToDoForm', () => {

  test('Rendu du ToDoForm', () => {
    render(
      <MemoryRouter>
        <ToDoForm />
      </MemoryRouter>
    );
    const formElement = screen.getByTestId('todo-form');
    expect(formElement).toBeInTheDocument();
  });

  test('Affichage du Formulaire', () => {
    render(
      <MemoryRouter>
        <ToDoForm />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fulfillment/i)).toBeInTheDocument();
  });

  test('Simuler envoi du Fomulaire', async () => {
    render(
      <MemoryRouter>
        <ToDoForm />
      </MemoryRouter>
    );
    userEvent.type(screen.getByLabelText(/name/i), 'Nouvelle tâche');
    userEvent.type(screen.getByLabelText(/description/i), 'Description test');
    userEvent.type(screen.getByLabelText(/category/i), 'Test');
    userEvent.type(screen.getByLabelText(/date/i), '12/12/2024');
    userEvent.type(screen.getByLabelText(/time/i), '10:00');
    userEvent.selectOptions(screen.getByLabelText(/priority/i), 'High');
    userEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('Récupération des données depuis une base de données simulée', async () => {
    // Mock fetch pour retourner les données simulées
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTaskData[0]), // Renvoie la première tâche de mockTaskData
      })
    );
    
    render(
      <MemoryRouter initialEntries={['/todos/e1f1']}>
        <Routes>
          <Route path="/todos/:id" element={<ToDoForm />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue(mockTaskData[0].task);
      expect(screen.getByLabelText(/description/i)).toHaveValue(mockTaskData[0].description);
      expect(screen.getByLabelText(/category/i)).toHaveValue(mockTaskData[0].category);
      expect(screen.getByLabelText(/date/i)).toHaveValue("04/12/2024");
      expect(screen.getByLabelText(/time/i)).toHaveValue("09:00");
      expect(screen.getByLabelText(/priority/i)).toHaveValue(mockTaskData[0].priority);
      expect(screen.getByLabelText(/fulfillment/i)).toHaveValue("6");
    });
  });
});