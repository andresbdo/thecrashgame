import React, {useState, useEffect, useCallback} from 'react';
import './BetBetter.css';

const BetBetter = ({betAmount, gameFinish, betCashOut, win}) => {

    const [bestBet, setBestBet] = useState([]);

    const showBestBet = useCallback(() => {
        if(win){
            let prizeAmount = (Number(betAmount) * Number(betCashOut));  //Terminada la partida si el usuario ganó agrega los resultados a un array
            setBestBet(bestBet => [...bestBet, [[betAmount+"$"], [betCashOut+"x"], [prizeAmount]]])
        }
    }, [betAmount, win, betCashOut, bestBet])

    useEffect(()=>{
        if(gameFinish){
                showBestBet() 
            }
    }, [gameFinish])
    
    return(
        <section id="bet-better">
            <div id="bet-better_title">
                <h4 id="bet-better_title_legend">Mejor apuesta</h4>
                <div id="bet-better_title_items">
                    <p className="bet-better_title_item">Monto</p>
                    <p className="bet-better_title_item">Salida</p>
                    <p className="bet-better_title_item">Premio</p>
                </div>
            </div>
            <div id="bet-better_results">
                <ul id="bet-better_results_list">
            {
                (bestBet.length !== 0) &&  // Para evitar que se ejecute al renderizar por primera vez o sin que el usuario apueste
                        //Devuelve el array con la mayor ganancia
                    (bestBet.reduce((subArrayAnterior, subArrayActual) => (subArrayActual[2] > subArrayAnterior[2] ? subArrayAnterior : subArrayActual)).map((item, index) => (<li className="bet-better_results_items" key={index}>{item}</li>)))  
            }   
                </ul>
            </div>
        </section>
    )
}

export default BetBetter;
