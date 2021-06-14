import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import image from './cryptomonedas.png';
import Form from './components/Form';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';


const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100%;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`

function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      // Evitamos la ejecucion la primera vez
      if (moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
      const result = await axios.get(url);

      // mostrar spinner
      setCargando(true);

      setTimeout(() => {
        setCargando(false);
        setResultado(result.data.DISPLAY[criptomoneda][moneda]);
      }, 3000)

    }

    cotizarCriptomoneda();

  }, [moneda, criptomoneda])


  // Mostrar spinner o resultado
  const componente = (cargando)? <Spinner/> : <Cotizacion resultado={resultado}/>

  return (
    <Container>
      <div>
        <Image
          src={image}
          alt="image crypto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Form
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        />

        {componente}
        
      </div>
    </Container>
  );
}

export default App;
