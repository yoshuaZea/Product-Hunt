import styled from '@emotion/styled'

const Boton = styled.a`
    display: block;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: 1rem;
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : 'black'};
    outline: none;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
        filter: opacity(0.8);
    }
`

export default Boton