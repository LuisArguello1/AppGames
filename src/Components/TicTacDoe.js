import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import salir from "../Svg/salir.svg"
import "../Css/ticTacDoe.css"
import Swal from 'sweetalert2'

const Square = ({children, isSelect, updateBoard, isClickable, index}) => {

    //identificacion del turno
    const className = `celda ${isSelect ? "is-select" : ""} ${!isClickable ? "disabled" : ""}`

    //llama a la funcion de actualizar tablero con la posicion del index
    const handleClick = () => {
        if (isClickable) {
            updateBoard(index)
        }
    }

    return(
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

//Posiciones de index 
//posiciones ganadoras
const Winner_Combos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const TicTacDoe = () => {
    const turns = {
        X: "x",
        O: "o"
    }

    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(turns.X)
    const [winner, setWinner] = useState(null)

    //verificamos el ganador
    const check_winner = (boardCheck) => {
        for(const combos of Winner_Combos){
            const [a, b, c] = combos //usamos destructuracion

            //comprobamos cada posibilida de ganador en las posiciones
            if(boardCheck[a] && boardCheck[a] == boardCheck[b] && boardCheck[a] == boardCheck[c]){
                return boardCheck[a] // si exite un ganador se retorna x u o
            }
        }

        //si no ha ganador
        return false
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setWinner(null)
        setTurn(turns.X)
    }

    const check_draw = (boardCheck) => {
        // Si no hay espacios vacíos y no hay ganador, es un empate
        return boardCheck.every(cell => cell !== null) && !winner
    }

    const updateBoard = (index) => {

        //no actualizamos esta posicion
        //si ya exite algo en esa posicion 
        //o si ya hay un ganador
        if (board[index] || winner) return

        //actualizamos el tablero
        const newBoard = [...board]

        //colocamos en la posicion el turno ya sea x u o
        newBoard[index] = turn
        setBoard(newBoard)

        //actualizamos el turno del jugador 
        const newTurn = turn == turns.X ? turns.O : turns.X
        setTurn(newTurn) 

        //revisar si hay ganador
        const newWinner = check_winner(newBoard)
        if (newWinner) { //verificamos que alla un ganador
            setWinner(newWinner)
            Swal.fire({
                title: `Ha ganado [ ${newWinner} ]`,
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
        }
    }


  return (
    <>
        <div className="App">
            <h3>Tic Tac Doe</h3>
            <div className='cell3'>
                <div className='pantalla-btn2'>
                    <Link to='/' className='link'>
                        <button className='btn-salir2'>
                            <img src={salir} alt='salir' className='salir-svg'></img>
                        </button>
                    </Link>
                </div>
                <div className='board'>
                    {
                        board.map((_,index) => {
                            const isClickable = !board[index] && !winner
                            return(
                                <Square
                                    key={index}
                                    index={index}
                                    updateBoard={updateBoard}
                                    isClickable={isClickable}
                                >
                                    {board[index]}
                                </Square>
                            )
                        })
                    }
                </div>
                <div className='turno'>
                    <Square
                        isSelect={turn == turns.X} isClickable={false}
                    >{turns.X}</Square>
                    <Square
                        isSelect={turn == turns.O} isClickable={false}
                    >{turns.O}</Square>

                    <div className='winner'>
                        {winner !== null ? (
                            <h2>¡Gano [ {winner} ]!</h2>
                        ) : check_draw(board) ? (
                            <h2>¡Empate!</h2>
                        ) : (
                            <h2>Turno de [ {turn} ]</h2>
                        )}
                    </div>
                    <div className='reinicio'>
                        <button className='btn-reinicio' onClick={resetGame}>Reiniciar</button>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default TicTacDoe