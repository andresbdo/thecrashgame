import React, { useState } from 'react';
import Login from '../components/Login/Login';
import Header from '../components/Header/Header';
import Main from './Main';
import './App.css'

const App = () => {

    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [incorrectUsername, setIncorrectUsername] = useState(false);
    const [balance, setBalance] = useState(localStorage.getItem("balance"));
    const [incorrectBalance, setIncorrectBalance] = useState(false);
    const [logIn, setLogIn] = useState(false);

    const handleLogin = () => {    // Validación del form
        console.log(username);
        if(username !== null){
            if(username.length > 2){
                if(balance >= 10 && balance <= 10000){
                localStorage.setItem("isLogged", true)
                localStorage.setItem("username", username); 
                localStorage.setItem("balance", balance);
                setLogIn(true) //cambio de ruta
                }else{
                    setIncorrectBalance(true);
                    setTimeout(()=>{
                        setIncorrectBalance(false)
                    }, 2000)
                }
            }else{
                setIncorrectUsername(true);
                setTimeout(()=>{
                    setIncorrectUsername(false)
                }, 2000)
            }
        }else{
            setIncorrectUsername(true);
                setTimeout(()=>{
                    setIncorrectUsername(false)
                }, 2000)
        }
    }

    const handleGuestLogin = ()  => {  // opcion invitado
        setUsername("Invitado");
        setBalance(100);
        localStorage.setItem("isLogged", true);
        localStorage.setItem("username", "Invitado");
        localStorage.setItem("balance", "100");
        setLogIn(true) // cambio de ruta
    }

    const handleGetBalance = () => {
        setBalance(localStorage.getItem("balance"))
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
        console.log(username);
    }

    const onBalanceChange = (e) => {
        setBalance(e.target.value);
    }

    if(!localStorage.getItem("isLogged")){
        return(
            <>
            <Login incorrectUsername={incorrectUsername} incorrectBalance={incorrectBalance} handleLogin={handleLogin} handleGuestLogin={handleGuestLogin} usernameChange={onUsernameChange} balanceChange={onBalanceChange}/>
            <footer id="footer"><p id="footer_link">Icons made by <a className="footer_links_link" href="https://smashicons.com/" title="Smashicons">Smashicons</a> from <a className="footer_links_link" href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p></footer>    
            </>
        );
    }else if(localStorage.getItem("isLogged") === "true" || logIn){
        return(
            <>
                <Header balance={balance} username={username} updateBalance={handleGetBalance}/>
                <Main updateBalance={handleGetBalance}/>
            </>
        )
    }
}

export default App;