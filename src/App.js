import EventClickPonto from './Components/clickPonto.jsx';
import EventClickTarget from './Components/targetPonto.jsx';

import React, { useState } from 'react';
import './App.css';


function App() {

	const [clickList, setClickList] = useState([]);
	const handleClick = (coordenadas) => {
		setClickList(prevList => [...prevList, coordenadas])
	};

	const [clickListTarget, setClickListTarget] = useState([]);
	const handleClickTarget = (coordenadas) => {
		setClickListTarget(prevList => [...prevList, coordenadas])
	};

	return (
		<div className="App">
			<header className="App-header">
				<p>Acerte o Alvo</p>
				
			</header>
	

			<div id="Area-alvo">
				<EventClickTarget onClick={handleClickTarget} clickListTarget={clickListTarget} />
			</div>

			<div id="Area-click">
				{/* Renderize o componente EventClickPonto e passe a lista de cliques e a função de clique como props */}
				<EventClickPonto onClick={handleClick} clickList={clickList} />
			</div>



		</div>
	);
}


export default App;
