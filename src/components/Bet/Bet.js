import React, {useEffect, useState} from 'react';
import './Bet.css';

const Bet = ({setBet, isGameActive, betSuccess, outOfFunds, betAmountChange, cashOutChange, incorrectCashOut, incorrectBetAmount, betPlaced}) => {
    
    const [blockBet, setBlockBet] = useState(false);

    useEffect(() => {
        if(isGameActive || betPlaced){
            setBlockBet(true)
        }else{                          //bloquea el botón de apostar si el juego empezó o ya se hizo una apuesta
            setBlockBet(false)
        }
    }, [blockBet, betPlaced, isGameActive])

    return(
        <section id="bet">
            <form id="bet-form" onSubmit={e => e.preventDefault()}>
                <label className="bet_label" forhtml="bet-amount_input">Monto</label>
                <input className="bet_input" id="bet-amount_input" type="number" min="1" max={localStorage.getItem("balance")} onChange={betAmountChange} placeholder="Mínimo 1$"></input>
                {
                    outOfFunds && 
                    <span className="bet-form_error">Fondos insuficientes, haz click en tu monedero para agregar más</span>
                }
                {
                    incorrectCashOut && 
                    <span className="bet-form_error">Por favor introduce un número entre 1.1 y 9.9</span>
                }
                {
                    incorrectBetAmount && 
                    <span className="bet-form_error">La apuesta no puede ser 0. Introduce un número mayor</span>
                }
                {
                    betSuccess &&
                    <span className="bet-form_success">¡Apuesta hecha!</span>
                }
                <label className="bet_label" id="bet-out_label" forhtml="bet-out_input">Salida</label>
                <input className="bet_input" id="bet-out_input" type="number" min="1.1" step="0.1" max="15" onChange={cashOutChange} placeholder="Mínimo: 1.1x / Máximo: 9.9x"/>
                <button id="bet-send" type="button" disabled={blockBet} onClick={setBet}>Apostar</button>
            </form>
        </section>
    )
}

export default Bet;