import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import { GlobalStyles, ResponsiveBlock, RightAlignedActionsBlock } from './App.styled';
import { Heading1 } from './components/basic/typography';
import { QuotePage } from './pages/QuotePage';
import { day, night } from './theme';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { QuotesPage } from './pages/QuotesPage';
import { TwoStateButton, TwoWayTextSwitchButton } from './components/basic/toggled_components';

const ThemedQuote = styled.div`
  background-color: ${({theme})=>theme.pageBg}
`;
const StyledToolBar = styled(ResponsiveBlock)`
  border-bottom: 3px ${({theme}) => theme.cardBoarderColor} solid;
  padding: 10px 20px;
  @media (max-width: 700px){
    grid-template-columns: 1fr;
  }
  @media (min-width: 701px){
    grid-template-columns: 3fr 1fr;
  } 
`
function App() {
  const [appTheme, switchTheme] = useState(day);
  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyles />
      <ThemedQuote>
        <div className="App">
          <StyledToolBar>
            <Heading1>Home Insurance</Heading1>
            <RightAlignedActionsBlock>
            <TwoStateButton 
              button1Text={"Day"}
              button2Text={"Night"}
              togglePredicate={appTheme === night}
              onToggle={(predicate)=> !predicate ? switchTheme(day): switchTheme(night)}
              />
            </RightAlignedActionsBlock>
          </StyledToolBar>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<QuotesPage />}></Route>
      <Route path="/quote">
        <Route path=":quoteId" element={<QuotePage />} />
      </Route>
  </Routes>
  </BrowserRouter>
{/*           
          <Routes>
              <Route path="quotes">
                <Route path=":quoteId" element={<QuotePage />} />
              </Route>
          </Routes> */}
        </div>
      </ThemedQuote>
    </ThemeProvider>
  );
}

export default App;
