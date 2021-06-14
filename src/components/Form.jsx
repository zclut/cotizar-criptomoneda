import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda'
import Error from './Error'

import axios from 'axios';

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2F2;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`

const Form = ({setMoneda, setCriptomoneda}) => {

    // state del listado de criptomonedas
    const [listaCripto, guardarCriptomonedas ] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libre Esterlina' }
    ]

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    // Utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto);

    // Ejecutar llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url)
            guardarCriptomonedas(result.data.Data);
        }
        consultarAPI();
    }, [])

    // Cuando el usuario hace submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(moneda === '' || criptomoneda === ''){
            setError(true);
            return;
        }
        setError(false);

        // Pasar valores al componente principal
        setMoneda(moneda)
        setCriptomoneda(criptomoneda)
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error
            ? <Error mensaje="Todos los campos son obligatorios"/>
            : null}

            <SelectMonedas />
            <SelectCripto />

            <Button
                type="submit"
                value="Calcular"
            ></Button>
        </form>
    );
}
 
export default Form;