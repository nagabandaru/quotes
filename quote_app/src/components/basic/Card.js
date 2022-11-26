import styled from 'styled-components';
/**
 * Just a sample we can customize as much as we can
 */
export const Card = styled.div`
    border: ${props => props.theme.cardBoarderSize} solid ${props => props.theme.cardBoarderColor};
    padding: 20px;
    border-radius: ${props => props.theme.cardBoarderRadius} ;
    margin: 20px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1em;
`;
