import React, {useState} from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import userIcon from '../../assets/user.svg';
import walletIcon from '../../assets/wallet.svg';

const Header = ({balance, username, updateBalance}) => { //utiliza el balance desde app para que se pueda actualizar desde el panel de juego

    const [modifyBalance, setModifyBalance] = useState(false);      
    const [modifyBalanceError, setModifyBalanceError] = useState(false);
    const [balanceToAdd, setBalanceToAdd] = useState(0);

    const handleModifyBalance = () => {                     //validaciones y seteo del balance cuando el usuario interactua con el monedero
        if(Number(balanceToAdd) <= 0 || !balanceToAdd){
            setModifyBalanceError(true)
        }else{
            setModifyBalance(false)
            let oldBalance = Number(localStorage.getItem("balance"));
            let newBalance = oldBalance + Number(balanceToAdd)
            localStorage.setItem("balance", newBalance)
            updateBalance();
        }
    }
    
    const addBalanceChange = (e) => {
        setBalanceToAdd(e.target.value) //input del modal del monedero
    }

return(
    <header id="header">
        <img src={logo} alt="logo" />
        <div id="header-balance" onClick={() => setModifyBalance(true)}>
            <img id="header-balance_icon" alt="wallet icon" src={walletIcon}/>
            <p>{balance}$</p> 
        </div>
        {
            modifyBalance &&   // renderiza el modal cuando el usuario lo clickea
            <div id="header-wallet">
                <button id="header-wallet_close" onClick={()=>setModifyBalance(false, setModifyBalanceError(false))}> x</button>
                <h2 id="header-wallet_greeting">¡Hola, {localStorage.getItem("username")}!</h2>
                <p id="header-wallet_instruction">Añade fondos a tu billetera</p>
                {
                    modifyBalanceError &&
                    <span id="header-wallet_error">Introduce un monto válido</span>  
                }
                <input type="number" onChange={addBalanceChange} min="1" id="header-wallet_input" />
                <button type="button" id="header-wallet_send" onClick={handleModifyBalance}>Añadir</button>
            </div>
        }
        <div id="header-profile">
            <img id="header-profile_icon" alt="profile icon" src={userIcon}/>
            <p>{username}</p>
        </div>
    </header>
);
}

export default Header;
