import {React, useState} from 'react'
import salir from "../Svg/salir.svg"
import { Link } from 'react-router-dom'
import "../Css/multiplicaciones.css"

const Multiplicaciones = () => {
    const [opciones, setOpciones] = useState([])
    const [msjUser, setMsjUser] = useState("")
    const [emojiUser, setEmojiUser] = useState("")
    const [msjConfirmacionUser, setMsjConfirmacionUser] = useState("")
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(0)
    const [desactivarBtnPrincipal, setDesactivarBtnPrincipal] = useState(false)
    const [desactivarBtnOpciones, setDesactivarBtnOpciones] = useState(true)
    const [perdiste, setPerdiste] = useState(null)
    const [ganaste, setGanaste] = useState(null)

    const prsentarButtons= () => {
        console.log(`Opciones presentadas ${opciones}`)
        return opciones.map((num, index) => {
            return <button className='btn-opcion' disabled={desactivarBtnOpciones} onClick={() => comprobarRespuesta(num)} key={index}>{num ? num : "Opciones"}</button>
        })
    }

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const comprobarRespuesta = (num) => {
        if (num === respuestaCorrecta){
            setGanaste((prev) => prev + 1 )
            setDesactivarBtnPrincipal(false)
            setDesactivarBtnOpciones(true)
            setEmojiUser("🤗")
            setMsjConfirmacionUser("Excelente respuesta!!")
        }else{
            setPerdiste((prev) => prev + 1)
            setDesactivarBtnPrincipal(false)
            setDesactivarBtnOpciones(true)
            setEmojiUser("🥺")
            setMsjConfirmacionUser(`Que mal!!, la respuesta era ${respuestaCorrecta}`)
        }
    }

    const startGame = () => {
        setDesactivarBtnPrincipal(true)
        setDesactivarBtnOpciones(false)
        setEmojiUser("🤔")
        setMsjConfirmacionUser("¿Qué opcion será?")

        let numA1 = Math.floor(Math.random() * 100) + 1
        let numA2 = Math.floor(Math.random() * 10) + 1

        let respuestaCorrecta = numA1 * numA2
        setRespuestaCorrecta(respuestaCorrecta)

        let respuestaFalsa = 0
        let respuestasIncorrectas = new Set()

        while (respuestasIncorrectas.size < 5) {
            respuestaFalsa = Math.floor(Math.random() * 1000) + 1
            if(respuestaFalsa !== respuestaCorrecta){
                respuestasIncorrectas.add(respuestaFalsa)
            }
        }
        console.log(`numero1 = ${numA1} numero2 = ${numA2}`)
        console.log(`Respuesta Correcta ${respuestaCorrecta}`)
        console.log(`respuestasIncorrectas ${respuestasIncorrectas}`)

        let opcionesMezcladas = shuffleArray([respuestaCorrecta, ...respuestasIncorrectas])
        setOpciones(opcionesMezcladas)
        console.log(`Solo opciones Mezcladas ${opcionesMezcladas}`)

        setMsjUser(`¿Cual es la respuesta de ${numA1} x ${numA2}?`)

    }
  return (
    <div className='App'>
        <div className='cell2'>
            <div className='pantalla-btn'>
                <Link to='/' className='link'>
                    <button className='btn-salir'>
                        <img src={salir} alt='salir' className='salir-svg'></img>
                    </button>
                </Link>
            </div>
            <div className='contenedor-btns-pantalla'>
                <div className='pantalla-avisos'>
                    <h2>{msjUser ? msjUser : "Presione [Comenzar]"}</h2>
                    <div className='emoji'>{emojiUser ? emojiUser : "🧠"}</div>
                    <div className='aviso-multi'>{msjConfirmacionUser ? msjConfirmacionUser : "Comencemos"}</div>
                    <button className='btn-comenzar2' disabled={desactivarBtnPrincipal} onClick={startGame}>{respuestaCorrecta ? "Seguir": "Comenzar"}</button>
                </div>
                <div className="pantalla-estadiciticas">
                    <div className='pantalla-btns'>
                        {prsentarButtons()}
                    </div>
                    {ganaste || perdiste ? 
                        <div className="intentos">
                            <div className="wineer-looser">Acertaste: {ganaste}</div>
                            <div className="wineer-looser">Fallaste: {perdiste}</div>
                        </div>
                    :""}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Multiplicaciones