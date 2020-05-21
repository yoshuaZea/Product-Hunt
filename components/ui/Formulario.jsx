import styled from '@emotion/styled'

export const Formulario = styled.form`
    max-width: 650px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset {
        margin: 2rem 0;
        border: 1px solid var(--gris3);
        font-size: 2rem;
        padding: 2rem;
        font-weight: bold;
        
        legend {
            color: var(--naranja);
        }
    }
`

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
        font-weight: bold;
    }

    input {
        flex: 1;
        padding: 1rem;
    }

    textarea {
        flex: 1;
        max-height: 400px;
    }
`

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: white;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    transition: all 0.3s ease;
    border-radius: 5px;
    outline: none;

    &:hover {
        cursor: pointer;
        filter: opacity(0.8);
    }
`

export const Error = styled.p`
    background-color: #ff00008f;
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: white;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
    border-radius: 5px;
`