import React from 'react'
import salir from '../Svg/salir.svg'
import '../Css/piedraPapelTijera.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const PiedraPapelTijera = () => {

    let [imgJugador, setImgJugador] = useState("")
    let [imgComputador,setImgComputador] = useState("")
    let [ataqueJugador, setAtaqueJugador] = useState("")
    let [ataqueComputadora, setAtaqueComputadora] = useState("")
    let [resultado, setResultado] = useState("")
    let [numAleatorio, setnumAleatorio] = useState(0)
    let [ataques, setAtaques] = useState([])
    const [pantallaCombat, setPantallaCombat] = useState(true)

    const handleAttack = (ataque) => {
        setAtaqueJugador(ataque)
        startGame(ataque)
    }

    const atks = [
        {nombre : "piedra",atk : "✊"},
        {nombre : "papel" ,atk : "✋"},
        {nombre : "tijera",atk : "✌"}
    ]

    useEffect(() => {
        setAtaques(atks)
    }, [])

    const startGame = (ataqueJugador) => {

        setPantallaCombat(false)
        let result = "Has perdido.."
        let num = Math.floor(Math.random() * 3 ) + 1
        setnumAleatorio(num)

        if (numAleatorio == 1){
            ataqueComputadora = "piedra"
        }else if(numAleatorio == 2){
            ataqueComputadora = "papel"
        }else if(numAleatorio == 3){
            ataqueComputadora = "tijera"
        }
        setAtaqueComputadora(ataqueComputadora)


        if ((ataqueJugador == "piedra" && ataqueComputadora == "papel") || 
            (ataqueJugador =="papel" && ataqueComputadora == "tijera") || 
            (ataqueJugador == "tijera" && ataqueComputadora == "piedra")
        ){
            setResultado(result)
        }else if(ataqueJugador == ataqueComputadora){
            setResultado("Has empatado..")
        }else{
            setResultado("Has ganado..")
        }

        let img1 = ataques.find((atk) => atk.nombre == ataqueJugador)?.atk
        let img2 = ataques.find((atk) => atk.nombre == ataqueComputadora)?.atk

        setImgJugador(img1)
        setImgComputador(img2)
    }

    useEffect(() => {
        if (ataqueJugador){
            startGame(ataqueJugador)
        }
    }, [ataqueJugador])

  return (
    <div className='App'>
        <h1>Piedra | Papel | Tijera</h1>
        <div className='cell2'>
            <div className='pantalla-btn'>
                <Link to='/'>
                    <button className='btn-salir'>
                        <img src={salir} alt='salir' className='salir-svg'></img>
                    </button>
                </Link>
            </div>
            <div className='pantalla-game'>
                {pantallaCombat? "Elija su ataque":
                    <div className='patalla-combat'>
                        <div className='ataque-jugador1'>{imgJugador}
                            <p className='info'>Jugador</p>
                        </div>
                        <p>VS</p>
                        <div className='ataque-jugador1'>{imgComputador}
                            <p className='info'>Maquina</p>
                        </div>
                    </div>
                }
                <div className='resultado'>Resultado : {resultado}</div>
                <div className='ataque'>
                    <div className='ataque-jugador' onClick={() => handleAttack("piedra")}>✊</div>
                    <div className='ataque-jugador' onClick={() => handleAttack("papel")}>✋</div>
                    <div className='ataque-jugador' onClick={() => handleAttack("tijera")}>✌</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PiedraPapelTijera;