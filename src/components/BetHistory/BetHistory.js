import React, {useEffect, useCallback, useState, useRef} from 'react';
import './BetHistory.css'

const BetHistory = ({betAmount, gameFinish, betCashOut, win, betPlaced, multiplier}) => {

    const [historyArray, setHistoryArray] = useState([]);
    const useFirstTime = useRef({firstTime: true});

    const showBetHistory = useCallback(() => {

        if(betPlaced){
            if(useFirstTime.current.firstTime){
                useFirstTime.current.firstTime = false;
            }

            if(historyArray.length > 2){
                if(win){
                    let prizeAmount = (Number(betAmount) * Number(betCashOut));
                    setHistoryArray(historyArray => [...historyArray, [betAmount+"$", betCashOut+"x", prizeAmount]].splice(1))
                }else{
                    setHistoryArray(historyArray => [...historyArray, [betAmount+"$", betCashOut+"x","0"]].splice(1))
                }
            }
            if(historyArray.length <= 2){
                if(win){
                    let prizeAmount = (Number(betAmount) * Number(betCashOut));
                    setHistoryArray(historyArray => [...historyArray, [betAmount+"$", betCashOut+"x", prizeAmount]])
                }else{
                    setHistoryArray(historyArray => [...historyArray, [betAmount+"$", betCashOut+"x", "0"]])
                }
            }
        }
    },[betAmount, win, betCashOut, historyArray])

    useEffect(()=>{
        if(gameFinish){
            showBetHistory()
        }
    }, [gameFinish])

    return(
        <section id="bet-history">
            <div id="bet-history_title">
                <h4 id="bet-history_title_legend">Historial de apuestas</h4>
                <div id="bet-history_title_items">
                    <p className="bet-history_title_item">Monto</p>
                    <p className="bet-history_title_item">Salida</p>
                    <p className="bet-history_title_item">Premio</p>
                </div>
            </div>
            {!useFirstTime.current.firstTime &&
            <div id="bet-history_results">
                {
                    !useFirstTime.current.firstTime &&
                    historyArray.map((elementArray, index) => (
                    <ul key={index} className="bet-history_results_list"> 
                        {elementArray.map((element, index) => (
                            <li className="bet-history_results_items" key={index}>{element}</li>
                        ))}
                        </ul>
                    ))
                }
            </div>
            }
        </section>
    )
}

export default BetHistory