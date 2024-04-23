// clickPonto.jsx
import React, { useState } from 'react';

const EventClickPonto = ({ onClick, clickList }) => {
	// Estado local para armazenar a lista de pontos clicados
	const [localClickList, setLocalClickList] = useState([]);

	/* 	Função localHandleClick responsável por 
		adicionar novos pontos à lista de cliques locais 
		(no componente EventClickPonto) e também chamar a 
		função onClick passada como propriedade para atualizar a 
		lista de cliques globais. */
	const localHandleClick = (event) => {
		const coordenadas = {
			clientX: event.clientX,
			clientY: event.clientY,
			
		};
		setLocalClickList((prevList) => [...prevList, coordenadas]);
		onClick(coordenadas);
	};

	return (
		<div id="Area-click" onClick={localHandleClick}>

			<div>
				{/* Renderize todos os pontos (existentes e novos) */}
				{[...localClickList].map((item, index) => (

				<span 
					key={index}
					value={true}
					className="ponto" 
					style={{ 
					left: item.clientX,
					top: item.clientY,
					zIndex: 1 // Defina o z-index para garantir que os pontos fiquem sobrepostos aos alvos
					}}
				/>
				))}
			</div>
		</div>

	);
};
export default EventClickPonto;
