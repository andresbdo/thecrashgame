import React from 'react';
import './Login.css';
import logo from '../../assets/logo.svg'

const Login = ({usernameChange, incorrectUsername, incorrectBalance, balanceChange, handleLogin, handleGuestLogin}) => {

    return(
        <main id="login">
            <img id="login_logo" src={logo} alt="logo"/>
            <form id="login_form" onSubmit={e => e.preventDefault()} name="login_form">
                <label className="login_form_label" forhtml="login_username">Nombre de usuario</label>
                <input className="login_form_input" id="login_username" onChange={usernameChange} type="text" minLength="3" placeholder="Mínimo 3 caracteres"  required/>
                <label className="login_form_label" forhtml="login_balance">Monto inicial</label>
                <input className="login_form_input" id="login_balance" onChange={balanceChange} type="number" min="10" max="10000" placeholder="Mín 10$ Max 10.000$" required/>
                {
                    incorrectBalance &&
                        <p className="login_form_error">Introduzca un monto válido, entre 10$ y 10.000$</p>
                }
                {
                    incorrectUsername &&
                    <p className="login_form_error">El nombre de usuario debe tener al menos 3 caracteres</p>
                }
                <button id="login_form_button" type="button" onClick={handleLogin}> Entrar</button>
            </form>
            <div id="login_guest">
                <button  id="login_guest_button" onClick={handleGuestLogin}>Entrar como invitado</button>
            </div>
        </main>
    );
}

export default Login;