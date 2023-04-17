import React, { useState } from "react";
import { FiSearch } from 'react-icons/fi'
import api from "../services/api";
import './Search.css'

function Search() {

    const [input, setInput] = useState('');
    const [cep, setCep] = useState({});

    async function handleSearch() {
        try {
            const response = await api.get(`${input}/json`);
            setCep(response.data);
            console.log(response);
            setInput('');
        } catch {
            let text = 'CEP não encontrado';
            document.getElementById('cath-error').innerHTML = text;
            setInput('');
            return;
        }
    }

    function verificarEstado() {
        document.getElementById('cath-error').innerHTML = null
        document.getElementsByClassName('main').innerHTML = null
    }

    return (
        <>
            <div className='container'>
                <h1>Buscador CEP</h1>

                <div className='containerInput'>
                    <input
                        className="containerInput_input"
                        type="text"
                        id="cepInput"
                        placeholder="Informe o cep"
                        value={input}
                        onClick={verificarEstado}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button onClick={handleSearch}>
                        <FiSearch size='25' color='#FFF' />
                    </button>
                </div>

                {Object.keys(cep).length > 0 && (
                    <main className='main'>
                        <h3>CEP: {cep.cep}</h3>
                        <span>{cep.logradouro}</span>
                        <span>Complemento: {cep.complemento}</span>
                        <span>{cep.bairro}</span>
                        <span>{cep.localidade} - {cep.uf}</span>
                    </main>
                )}

                <div id="cath-error"></div>

                {input.length > 9 && (
                    <div id="cep-disabled">CEP inválido</div>
                )}
            </div>
        </>
    )
}

export default Search;
