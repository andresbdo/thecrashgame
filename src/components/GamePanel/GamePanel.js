import React from 'react';
import './GamePanel.css';
import bomb from '../../assets/bomb.svg'
import explossion from '../../assets/explosion.svg'


const GamePanel = ({multiplier, crash, gameFinish, isGameActive, betCashOut,  win}) => {

    return(
        <section id="game-panel">
            <div id="game-panel_new-round">
            {
                !isGameActive &&  // mensaje entre terminada la partida y comenzada la otra
                <h3 id="game-panel_new-round">Empezando nueva ronda...</h3>
            }
            </div>
            <div  id="game-panel_multiplier">
                <h1>{multiplier.toFixed(1)}x</h1> 
            </div>
            <div id="game-panel_bomb">
            {
                isGameActive && //muestra una bomba mientras el contador esté sumando y si termina muestra una explosión
                    (gameFinish ? (<img id="game-panel_explosion_image" src={explossion} alt="explosion"/>) : (<img id="game-panel_bomb_image" src={bomb} alt="bomb"/>))
            }
            </div>
            <div id="game-panel_winner">
                {
                    isGameActive && win ?
                    (<h2>¡Ganador!</h2>) : (<h3>...</h3>) //mensaje si el usuario gana
                }
            </div>
        </section>
    );
}

export default GamePanel;