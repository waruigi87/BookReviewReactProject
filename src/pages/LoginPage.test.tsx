import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import LoginPage from './LoginPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const MockLoginPage = () =>{
    return (
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>
    )
}

describe('LoginPage Component', ()=>{


    //stateがloginならばHeading が"Login"であることを確認
    test( 'stateがloginならばHeading が"Login"であることを確認', ()=>{
        render(<MockLoginPage />);

        const headingElement = screen.getByRole('heading', { name: 'Login' });
        expect(headingElement).toBeInTheDocument();
    });

    //Emailが入力されたらValueが変わることを確認
    test( 'Emailが入力されたらValueが変わることを確認', ()=>{
        render(<MockLoginPage />);

        const emailInput = screen.getByPlaceholderText('Email id') as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
    });

    //Passwordが入力されたらValueが変わることを確認
    test( 'Passwordが入力されたらValueが変わることを確認', ()=>{
        render(<MockLoginPage />);
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput.value).toBe('password123');
    });

    //LoginボタンがクリックされたらhandleSubmitが呼ばれることを確認 入力欄が空の場合はバリデーションエラーが表示されることを確認
    test( 'LoginボタンがクリックされたらhandleSubmitが呼ばれることを確認 入力欄が空の場合はバリデーションエラーが表示されることを確認', async ()=>{
        render(<MockLoginPage />);
        const loginButton = screen.getByRole('button', { name: 'submit button' });
        fireEvent.click(loginButton);

        const errorMessage = await screen.findByText('メールアドレスとパスワードを入力してください。');
        expect(errorMessage).toBeInTheDocument();
    });
    //フォームとボタンのコンポーネントが存在する（正しくレンダリングされている）ことを確認する。
    test( 'フォームとボタンのコンポーネントが存在する（正しくレンダリングされている）ことを確認する', ()=>{
        render(<MockLoginPage />);
        const formElement = screen.getByRole('form', { name: 'auth-form' });
        const loginButton = screen.getByRole('button', { name: 'submit button' });
        expect(formElement).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });


});






