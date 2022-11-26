import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
    background-color: ${({ theme }) => theme.pageBg};
}
div, p, span {
    color:  ${({ theme }) => theme.textColor};
}
`
export const ResponsiveBlock = styled.div`
    display: grid;
    gap: 1rem;
    @media (max-width: 700px){
      grid-template-columns: repeat(1, 1fr);
    }
    @media (min-width: 701px){
      grid-template-columns: repeat(2, 1fr);
    } 
`
export const Block = styled.div`
    display: block;
    margin: 10px 20px;
`

export const ActionsBlock = styled.div`
    display: flex;
`

export const RightAlignedActionsBlock = styled(ActionsBlock)`
    justify-content: end;
`

export const CenterAlignedActionsBlock = styled(ActionsBlock)`
    justify-content: center;
`