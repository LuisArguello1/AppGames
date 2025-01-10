import {React, useState,useEffect} from 'react'
import { createMemorySessionStorage, Link } from 'react-router-dom'
import salir from "../Svg/salir.svg"
import Swal from "sweetalert2"
import AhorcadoJuego from "../Img/ahorcadoJuego.webp"
import Ahorcado1 from "../Img/ahorcado1.png"
import Ahorcado2 from "../Img/ahorcado2.png"
import Ahorcado3 from "../Img/ahorcado3.png"
import Ahorcado4 from "../Img/ahorcado4.png"
import Ahorcado5 from "../Img/ahorcado5.png"
import Ahorcado6 from "../Img/ahorcado6.png"
import "../Css/ahorcado.css"


const Ahorcado = () => {
    
    const [tecla, setTecla] = useState(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"])
    const [palabras, setPalabras] = useState(["ARBOL","REFRIGERADORA","TELEVISOR","PERRO","COMPUTADORA","ESCOBA","ALMOHADA","LEOPARDO","HIPOPOTAMO","PARED"])
    let [numAleatorio, setNumAleatorio] = useState(null)
    let [palabraSelecionada, setPalabraSelecionada] = useState("")
    let [letrasCorrectas, setLetrasCorrectas] = useState([])
    let [letrasIncorrectas, setLetrasIncorrectas] = useState([])
    let [letrasUsadas, setLetrasUsadas] = useState([])
    let [desactivar, setDesactivar] = useState(false)
    let [intentos, setIntentos] = useState(6)
    let [desactivarteclas, setDesactivarTeclas] = useState(true)

    const mostrarTeclas = () => {
        return tecla.map((tcl, index) => {
            return <button disabled={desactivarteclas || letrasUsadas.includes(tcl)} onClick={() => comprobarLetra(tcl)} className={`tecla ${letrasUsadas.includes(tcl)? "desactivada" :""}`} key={index}>{tcl}</button>
        })
    }

    const comprobarLetra = (letra) => {
        if (letrasUsadas.includes(letra)) return

        setLetrasUsadas((prev) => [...prev, letra])

        if (palabraSelecionada.includes(letra)){
            setLetrasCorrectas((prev) => [...prev, letra])
        }else{
            setLetrasIncorrectas((prev) => [...prev, letra])
            setIntentos((prev) => prev - 1)
        }
    }

    const mostrarLineasPalabras = (palabra) => {
       return palabra.split("").map((letra,index) => {
        return <span key={index} className="letra">{letrasCorrectas.includes(letra) ? letra :""}</span>
       })
    }

    const startGame = () =>{
        setPalabraSelecionada("")
        setNumAleatorio(null)
        setLetrasCorrectas([])
        setLetrasIncorrectas([])
        setLetrasUsadas([])
        setDesactivar(true)
        setDesactivarTeclas(false)
        setIntentos(6)

        let num = Math.floor(Math.random() * palabras.length )
        setNumAleatorio(num)
        setPalabraSelecionada(palabras[num])

    }

    
    const mostrarImg = (intentos) => {
        if (intentos == 6) {
            return <img src={AhorcadoJuego} alt=" -1 vida" className="img-ahorcado-return"></img>
        }else if(intentos == 5){
            return <img src={Ahorcado1} alt=" -1 vida" className="img-ahorcado-return"></img>
        }else if(intentos == 4){
            return <img src={Ahorcado2} alt=" -1 vida" className="img-ahorcado-return"></img>
        }else if(intentos == 3){
            return <img src={Ahorcado3} alt=" -1 vida" className="img-ahorcado-return"></img>
        }else if(intentos == 2){
            return <img src={Ahorcado4} alt=" -1 vida" className="img-ahorcado-return"></img>
        }else if(intentos == 1){
            return <img src={Ahorcado5} alt=" -1 vida" className="img-ahorcado-return"></img>
        }else if(intentos == 0){
            return <img src={Ahorcado6} alt=" -1 vida" className="img-ahorcado-return"></img>
        }
    }
   

    useEffect(() => {

        let todadLetrasAdivinadas = palabraSelecionada.split("").every((letra) => letrasCorrectas.includes(letra))
        
        if (palabraSelecionada){
            if (todadLetrasAdivinadas){
                Swal.fire({
                    title: `Ha ganado la palabra era ${palabraSelecionada}`,
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
                setDesactivar(false)
                setDesactivarTeclas(true)
            }else if(letrasIncorrectas.length == 6){
                Swal.fire({
                    title: `Ha perdido la palabra era ${palabraSelecionada}`,
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
                setDesactivar(false)
                setDesactivarTeclas(true)
            }
        }
    },[letrasCorrectas, palabraSelecionada, letrasIncorrectas])

  return (
    <div className='App'>
        <h1>Ahorcado</h1>
        <div className='cell2'>
            <div className='pantalla-btn'>
                <Link to='/' className='link'>
                    <button className='btn-salir'>
                        <img src={salir} alt='salir' className='salir-svg'></img>
                    </button>
                </Link>
            </div>
            <div className="palabra">
                {palabraSelecionada ? numAleatorio !== null && mostrarLineasPalabras(palabras[numAleatorio]): "Presione [ Comenzar ]"}
            </div>
            <div className="pantalla-teclado">
                <div className="teclado">
                    {mostrarTeclas()}
                </div>
                <div className="img-ahorcado">{mostrarImg(intentos)}</div>
            </div>
            <button onClick={startGame} className="btn-comenzar" disabled={desactivar}>Comenzar</button>
        </div>
    </div>
  )
}

export default Ahorcado