import "./App.css";
import PiedraPapelTijera from "./Components/PiedraPapelTijera";
import TicTacDoe from "./Components/TicTacDoe"
import Ahorcado from "./Components/Ahorcado";
import game1 from "./Img/PIEDRA PAPEL TIJERA.jpg";
import game2 from "./Img/ticTacDoe.webp"
import game3 from "./Img/game3.jpg"
import { Link, HashRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1>Juegos interactivos</h1>
              <div className="cell">
                <div className="app-game">
                  <Link to="/piedra-papel-tijera">
                    <div className="app-game-1">
                      <img src={game1} alt="Game1" className="game"></img>
                      <p className="titulo-game">Piedra | Papel | Tijera</p>
                    </div>
                  </Link>
                </div>
                <div className="app-game">
                  <Link to="/ticTacDoe">
                    <div className="app-game-1">
                      <img src={game2} alt="Game1" className="game"></img>
                      <p className="titulo-game">Tic Tac Doe</p>
                    </div>
                  </Link>
                </div>
                <div className="app-game">
                  <Link to="/ahorcado">
                    <div className="app-game-1">
                      <img src={game3} alt="Game1" className="game"></img>
                      <p className="titulo-game">Ahorcado</p>
                    </div>
                  </Link>
                </div>
                <div className="app-game"></div>
                <div className="app-game"></div>
                <div className="app-game"></div>
                <div className="app-game"></div>
                <div className="app-game"></div>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/piedra-papel-tijera"
          element={<PiedraPapelTijera></PiedraPapelTijera>}
        ></Route>
        <Route
          path="/ticTacDoe"
          element={<TicTacDoe></TicTacDoe>}
        ></Route>
        <Route
          path="/ahorcado"
          element={<Ahorcado></Ahorcado>}
        ></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
