/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call handleLogin function when login button is clicked
 */
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';
import { Provider } from 'react-redux';
import { store } from '../../states';
import { MemoryRouter } from 'react-router-dom';
expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginInput handleLogin={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'testemail@gmail.net');

    // Assert
    expect(emailInput).toHaveValue('testemail@gmail.net');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginInput handleLogin={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'wungapatuman');

    // Assert
    expect(passwordInput).toHaveValue('wungapatuman');
  });

  it('should call handleLogin function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginInput handleLogin={mockLogin} />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'testemail@gmail.net');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'wungapatuman');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'testemail@gmail.net',
      password: 'wungapatuman',
    });
  });
});
