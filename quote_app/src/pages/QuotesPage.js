
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Block } from '../App.styled';
import { Loader } from '../components/basic/LoadingMessage';
import { getQuotes } from '../services/quotes';

export function QuotesPage({}){
    const [quotes, setQuotes] = useState([]);
    const [loading, changeLoadingState] = useState(true);
    useEffect(()=>{
      getQuotes().then((quotes)=>{
        setQuotes(quotes);
        changeLoadingState(false);
      })
    }, [])
  
  return (
        <Block>
          {loading? <Loader>Loading all quotes</Loader>: 
          <ol>{quotes.map(({id,quoteRef})=><li><Link key={id} to={`/quote/${id}`}>{quoteRef}</Link></li>)}</ol>} 
        </Block>
  ); 
}