
import {useState, useEffect, Suspense, useRef} from 'react'
import { Link } from 'react-router-dom';
import { Block } from '../App.styled';
import { Loader } from '../components/basic/LoadingMessage';
import { getQuotes } from '../services/quotes';

export function QuotesPage(){
    const quotes = useRef([]);
    const [loading, setLoadingState] = useState(true);
    useEffect(()=>{
      getQuotes().then((quotesList)=>{
        quotes.current = quotesList
        setLoadingState(false);
      })
    }, [])
  
  return (
        <Block>
          {!loading && <Suspense fallback={<Loader>Loading all quotes</Loader>}>
              {quotes.current.length === 0 && <Block>No quotes found. Alerted web adminstrator.</Block>}
              <ol>{quotes.current.map(({id,quoteRef})=><li key={id}><Link  to={`/quote/${id}`}>{quoteRef}</Link></li>)}</ol>
            </Suspense>} 
        </Block>
  ); 
}