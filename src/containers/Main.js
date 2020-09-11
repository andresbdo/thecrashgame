import React, {useState, useRef, useCallback, useEffect} from 'react';
import Bet from '../components/Bet/Bet';
import GamePanel from '../components/GamePanel/GamePanel';
import LastResults from '../components/LastResults/LastResults';
import BetHistory from '../components/BetHistory/BetHistory';
import BetBetter from '../components/BetBetter/BetBetter'
import './Main.css';

const Main = ({updateBalance}) => {

  const [multiplier, setMultiplier] = useState(1);  // contador
  const [isGameActive, setIsGameActive] = useState(false); 
  const [crash, setCrash] = useState(0); // numero aleatorio en el que para el multiplier
  const [gameFinish, setGameFinish] = useState(false);
  const [betAmount, setBetAmount] = useState(0); //monto a apostar ingresado por el usuario
  const [cashOut, setCashOut] = useState(0);  // salida ingresada por el usuario    
  const [betCashOut, setbetCashOut] = useState(0); //Fijar la salida ingresada
  const [outOfFunds, setOutOfFunds] = useState(false);              // validacion del "form" de bet
  const [incorrectCashOut, setIncorrectCashOut] = useState(false);     // validacion del "form" de bet
  const [incorrectBetAmount, setIncorrectBetAmount] = useState(false);  // validacion del "form" de bet
  const [betSuccess, setBetSuccess] = useState(false); //validacion del form 
  const [betPlaced, setBetPlaced] = useState(false);  // apuesta hecha correctamente
  const [win, setWin] = useState(false);  
  const useFirstTime = useRef({firstTime: true}); //Si es la primera vez que se renderiza el componente

  const makeRandomNumber = (min, max) => {  //genera el numero a usar en el crash
    return min + (max - min) * Math.random()
  }


  const gameStart = useCallback(() => {
    if(useFirstTime.current.firstTime === false){
      setGameFinish(false)
      if(!isGameActive){
        setCrash(makeRandomNumber(1.1, 9.9).toFixed(1))
        setIsGameActive(true);
      }
    }
  }, [isGameActive])

  const gameFinished = useCallback(() => {
    setGameFinish(true)
    setWin(false)
    setBetPlaced(false)
    setTimeout(() => {
      reset();            //reiniciar el contador después de 3s de terminada la partida
      setTimeout(()=>{
        gameStart()     //partida comienza a los 5s de reiniciado el contador
      }, 5000)
    }, 3000)
  }, [gameFinish])

  const reset = useCallback(() => {
    setMultiplier(1); //regresa el multiplicador a 1
    setIsGameActive(false); 
  }, [])

  const handleWin = useCallback(() => {
    setWin(true)
    setBetPlaced(false) //reinicia la apuesta
    let prize = Number(betAmount) * Number(betCashOut);
    let oldBalance = Number(localStorage.getItem("balance"));
    let newBalance = (Number(oldBalance) + Number(prize)).toFixed(1);
    localStorage.setItem("balance", Number(newBalance))   //nuevo balance con el premio
    updateBalance() //actualiza el contador en el header
  })

  const handleSetBet = () => {
    if(Number(betAmount) !== 0 || !betAmount){   //validacicones "form" Bet
      if(Number(localStorage.balance) >= Number(betAmount)){ 
        if(Number(cashOut) >= 1.1 && Number(cashOut) <= 9.9){
          if(!isGameActive){
            setBetSuccess(true); // mensaje al usuario de que la apuesta se hizo correctamente
            setTimeout(() => {
              setBetSuccess(false) // quita el mensaje a los 2s
            }, 2000)
            setbetCashOut(cashOut); //toma la salida creada por el jugador y la pasa a CashOut para que no se modifique si el usuario escribe en el input
            setBetPlaced(true)
            let oldBalance = Number(localStorage.getItem("balance"));
            let newBalance = (oldBalance - Number(betAmount)).toFixed(1);
            localStorage.setItem("balance", newBalance)  //resta la apuesta del balance
            updateBalance() // actualiza el balance en el header
          }
        }else{
          setIncorrectCashOut(true)
          setTimeout(() => {   //Quita aviso de validaciones formulario bet
            setIncorrectCashOut(false);
          }, 2000);
        }
      }else{
        setOutOfFunds(true)
        setTimeout(() => { //Quita aviso de validaciones formulario bet
          setOutOfFunds(false);
        }, 2000);
      }
    }else{
      setIncorrectBetAmount(true)
        setTimeout(() => { //Quita aviso de validaciones formulario bet
          setIncorrectBetAmount(false);
        }, 2000);
    }
  }

  const onBetAmountChange = (e) => {
    setBetAmount(e.target.value)
  }

  const onCashOutChange = (e) => {
    setCashOut(e.target.value)
  } 

  useEffect(() => {
    if(useFirstTime.current.firstTime === true){ //La primera vez que renderiza
      useFirstTime.current.firstTime = false; 
        setTimeout(() => {
          gameStart();            //juego empezado a los 5s
        }, 5000);
    }else{
    let interval = null;
    if(isGameActive){ 
      interval = setInterval(() => {
        if(multiplier.toFixed(1) !== crash){
          setMultiplier(multiplier => multiplier + 0.1)   //multiplicador
          if(betPlaced && multiplier.toFixed(1) > betCashOut){  
            handleWin()   //ganar
          }
        }
        if(multiplier.toFixed(1) === crash){
            clearInterval(interval)           //fin multiplicador
            gameFinished();                   
        }
      }, 100);
    }else if(!isGameActive && multiplier !== 0){
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }
  }, [isGameActive, multiplier, crash, gameFinished, gameStart, gameFinish, win, betPlaced, handleWin]);


  return(
    <>
      <main id="main">
        <Bet isGameActive={isGameActive} betSuccess={betSuccess} setBet={handleSetBet} betAmountChange={onBetAmountChange} cashOutChange={onCashOutChange} outOfFunds={outOfFunds} incorrectCashOut={incorrectCashOut} incorrectBetAmount={incorrectBetAmount} betPlaced={betPlaced} />
        <BetHistory betCashOut={betCashOut} multiplier={multiplier} betPlaced={betPlaced} gameFinish={gameFinish} betAmount={betAmount} win={win}/>
        <BetBetter betCashOut={betCashOut} multiplier={multiplier} betPlaced={betPlaced} gameFinish={gameFinish} betAmount={betAmount} win={win}/>
        <GamePanel win={win} multiplier={multiplier}  betCashOut={betCashOut} crash={crash} gameFinish={gameFinish} betPlaced={betPlaced} isGameActive={isGameActive} cashOut={cashOut}/>
        <LastResults gameFinish={gameFinish} crash={crash} />
      </main>
    </>
  );
}

export default Main;
