import {useEffect, useState} from 'react';
import './App.css';
import { getQuotes } from './services/quotes';
import { getAddons } from './services/addons';
import { QuoteCard } from './components/QuoteCard';
import { PERIODS } from './mappings';
import { AddOnCard } from './components/AddOnCard';
import { Loader } from './components/LoadingMessage';


function App() {
  const [selectedPeriod, setSelectedPeriod] = useState(PERIODS.MONTHLY);
  const [quote, setQuote]= useState({});
  const [addons, setAddons]= useState([]);
  const [displayPrice, setDisplayPrice] = useState(0);
  useEffect(()=>{
    getQuotes(1).then((quote)=>{
      setQuote(quote);
      setDisplayPrice(quote.monthlyPrice)
    });
    getAddons().then((addons)=>{
      setAddons(addons);
    });
  }, []);
  useEffect(()=>{
    // console.log(addons);
    let calculatedDisplayPrice = displayPrice;
    if(selectedPeriod === PERIODS.MONTHLY){
      calculatedDisplayPrice = quote.monthlyPrice
    }else if(selectedPeriod === PERIODS.ANNUAL){
      calculatedDisplayPrice = quote.annualPrice
    }
    calculatedDisplayPrice = addons.reduce((a, c)=>{
      if(c.isSelected){
        if(selectedPeriod === PERIODS.MONTHLY){
          return a + c.monthlyPrice
        }else if(selectedPeriod === PERIODS.ANNUAL){
          return a + c.annualPrice
        }
      }
      return a;
    }, calculatedDisplayPrice);
    setDisplayPrice(calculatedDisplayPrice)
  }, [addons, selectedPeriod]);
  
  return (
    <div className="App">
      <h1>Hey, {quote.firstName}</h1>
      <div>Here is your quote</div>
      <div>Quote reference: {quote.quoteRef}</div>
      <div>Covers starts on: {new Date(quote.startDate).toLocaleString()}</div>
      {/* {JSON.stringify(quote)} */}
      {Object.keys(quote).length > 0 ? <QuoteCard displayPrice={displayPrice} selectedPeriod={selectedPeriod} onSelectedPeriodChange={(period)=>{
        setSelectedPeriod(period);
      }}/>: <Loader msg={"Loading Quote..."}/>}
      <h1>Tailor your cover with our optional extra</h1>
      {addons.length > 0 ? addons.map((e, i)=><AddOnCard key={i} index={i} details={e} selectedPeriod={selectedPeriod} 
        onSelected={(e, quoteIndex)=>{
          const _addons = addons.slice();
          _addons[quoteIndex]['isSelected'] = true;
          setAddons(_addons);
        }}
        onRemoved={(e, quoteIndex)=>{
          const _addons = addons.slice();
          _addons[quoteIndex]['isSelected'] = false;
          setAddons(_addons);
        }
      }/>): <Loader msg={"Loading Addons..."}/>}
    </div>
  );
}

export default App;
