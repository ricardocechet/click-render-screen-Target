import React, { useState, useEffect } from 'react';

const EventClickTarget = ({ onClick, clickListTarget }) => {
    const [localClickList, setLocalClickList] = useState([]);
    const [targetPositions, setTargetPositions] = useState([]);
	const [acertos, setAcertos] = useState(0);

    useEffect(() => {

		const initialPositions = [];
        // Define as posições iniciais dos alvos
        setTargetPositions(initialPositions);

        // Define um intervalo para atualizar as posições de modo aleatório 0.8s a 3s
        const timer = Math.floor(Math.random() * 3000) + 800
		const interval = setInterval(() => {
			// Define as dimensões da área de destino
			let areaWidth = Math.floor(Math.random() * 701) + 20; // Posição aleatória X
			let areaHeight = Math.floor(Math.random() * 601) + 200; // Posição aleatória Y
	
			// Define as posições iniciais dos alvos
			const initialPositions = [
				{
					left: `${areaWidth / 2}px`,
					top: `${areaHeight / 2}px`,
				},
				{
					left: `${areaWidth / 2}px`,
					top: `${areaHeight / 2}px`,
				},
				{
					left: `${areaWidth / 2}px`,
					top: `${areaHeight / 2}px`,
				},
			];
            // Gere novas posições aleatórias para os alvos
            const newPositions = initialPositions.map(() => ({
                left: `${Math.floor(areaWidth)}px`,
                top: `${Math.floor(areaHeight)}px`,
            }));
            setTargetPositions(newPositions);
        }, timer);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, []);

	const localHandleClick = (event) => {
        const coordenadas = { clientX: event.clientX, clientY: event.clientY };
        setLocalClickList((prevList) => [...prevList, coordenadas]);
		let pontos = 0;

        // Verifica se o ponto clicado está dentro de algum alvo e atualiza a contagem de acertos
        targetPositions.forEach((position, index) => {
			const alvoRect = {
				left: parseInt(position.left),
				top: parseInt(position.top),
				right: parseInt(position.left),
				bottom: parseInt(position.top),
			};

			switch (index) {
				case 0:
					if (
						coordenadas.clientX >= alvoRect.left &&
						coordenadas.clientX <= alvoRect.right + 8 &&
						coordenadas.clientY >= alvoRect.top &&
						coordenadas.clientY <= alvoRect.bottom + 8 &&
						pontos === 0
					) {
					pontos = 10;
					};
					break;
				case 1:
					if (
						coordenadas.clientX >= alvoRect.left - 16 &&
						coordenadas.clientX <= alvoRect.right + 24 &&
						coordenadas.clientY >= alvoRect.top - 16 &&
						coordenadas.clientY <= alvoRect.bottom + 24 &&
						pontos === 0
					) {
					pontos = 5;
					};
					break;
				case 2:
					if (
						coordenadas.clientX >= alvoRect.left - 100 &&
						coordenadas.clientX <= alvoRect.right + 100 &&
						coordenadas.clientY >= alvoRect.top - 100 &&
						coordenadas.clientY <= alvoRect.bottom + 100 &&
						pontos === 0
					) {
					pontos = 1;
					};
					break;
				default:
					pontos = 0;
					break;
			}

        });
		setAcertos((prevAcertos) => prevAcertos + pontos);
        onClick(coordenadas);
    };

    return (
        <div id="Area-alvo" onClick={localHandleClick}>
            {targetPositions.map((position, index) => (
                <span
                    key={index}
                    className={`alvo${index}`}
                    style={{
                        left: position.left,
                        top: position.top,
                    }}
                />
            ))}
            {[...localClickList].map((item, index) => (
                <span
                    key={index}
                    className="pontoAlvo"
                    style={{
                        left: item.clientX,
                        top: item.clientY,
                    }}
                />
            ))}
            <div>
                <p>Acertos: <b>{acertos}</b></p>
            </div>
        </div>
    );
};

export default EventClickTarget;