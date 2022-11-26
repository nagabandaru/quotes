import styled from 'styled-components';
export const Button = styled.button`
    border: ${props => props.theme.cardBoarderSize} solid ${props => props.theme.cardBoarderColor};
    border-radius: ${props => props.theme.cardBoarderRadius} ;
    background: transparent;
    color: ${({theme})=>theme.textColor};
    padding: 5px;
    margin: 5px;
    width: auto;
    &:hover{
        background: #ccc;
        cursor: pointer
    }
`;

export const RoundButton = styled(Button)`
    border-radius: 99px ;
    
`