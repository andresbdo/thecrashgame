import React, {useState, useEffect, useCallback} from 'react'
import './LastResults.css';

function LastResults({crash, gameFinish}) {
    const [lastResultsArray, setLastResultsArray] = useState([]);

    const showLastResults = useCallback (() => {
        if(lastResultsArray.length > 6){
            let sliceArray = lastResultsArray.slice(1);
            setLastResultsArray(sliceArray.concat(crash)) 
        }else if(lastResultsArray.length <= 6){
            setLastResultsArray([...lastResultsArray, crash])
        }
    }, [crash, lastResultsArray])

    useEffect(()=>{
        if(gameFinish){
            showLastResults()
        }
    }, [gameFinish])

    return (
        <section id="last-results">
            <h4 id="last-results_title">Últimos resultados:</h4>
            <ul id="last-results_list">
                {lastResultsArray.map((result, index) => (
                    <li key={index} className="last-results_list_result">{result}x</li>
                ))}
            </ul>
        </section>
    )
}

export default LastResults;
