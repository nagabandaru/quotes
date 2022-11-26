
import { useState, useEffect } from 'react'
import { getQuote } from '../services/quotes';
import { getAddons } from '../services/addons';
import { QuotePriceCard } from '../components/QuotePriceCard';
import { QuoteInfoCard } from '../components/QuoteInfoCard';
import { PERIODS } from '../mappings';
import { AddOnCard } from '../components/AddOnCard';
import { Loader } from '../components/basic/LoadingMessage';
import { Heading1, NormalText } from '../components/basic/typography';
import { useParams } from 'react-router-dom';
import { isEmpty } from '../utils';
import { useImmer } from 'use-immer';
import styled from 'styled-components';
import { Block, ResponsiveBlock } from '../App.styled';

const ResponsivePage = styled.div`
`
export function QuotePage({ }) {
  const { quoteId } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState(PERIODS.MONTHLY);
  const [quoteFound, setQuoteFound] = useState(true);
  const [quote, setQuote] = useState({});
  const [loadingQuote, changeQuoteLoadingState] = useState(true);
  const [loadingAddons, changeAddonsLoadingState] = useState(true);
  const [addons, setAddons] = useImmer([]);
  const [displayPrice, setDisplayPrice] = useState(0);
  useEffect(() => {
    getQuote(quoteId).then((quote) => {
      if (isEmpty(quote)) {
        setQuoteFound(false);
      } else {
        setQuote(quote);
        setDisplayPrice(quote.monthlyPrice)
      }
      changeQuoteLoadingState(false)
    });
    getAddons().then((addons) => {
      changeAddonsLoadingState(false);
      addons = addons.map((addon, index) => {
        return {...addon, index}  
      });
      setAddons(addons);
    });
  }, [quoteId]);
  useEffect(() => {
    let calculatedDisplayPrice = displayPrice;
    if (selectedPeriod === PERIODS.MONTHLY) {
      calculatedDisplayPrice = quote.monthlyPrice
    } else if (selectedPeriod === PERIODS.ANNUAL) {
      calculatedDisplayPrice = quote.annualPrice
    }
    calculatedDisplayPrice = addons.reduce((a, c) => {
      if (c.isSelected) {
        if (selectedPeriod === PERIODS.MONTHLY) {
          return a + c.monthlyPrice
        } else if (selectedPeriod === PERIODS.ANNUAL) {
          return a + c.annualPrice
        }
      }
      return a;
    }, calculatedDisplayPrice);
    setDisplayPrice(calculatedDisplayPrice)
  }, [addons, selectedPeriod]);

  const selectOrDeselectAddon = (index, select)=>{
    setAddons(_addons=>{
      _addons[index]['isSelected'] = select;
    }) 
  };

  function selectAddOn(index) {
    selectOrDeselectAddon(index, true);
  }
  function deselectAddOn(index) {
    selectOrDeselectAddon(index, false);
  }
  return (
    <>
      {loadingQuote ? <Loader>Loading Quote...</Loader> :
        !quoteFound ? <NormalText>Quote not found</NormalText> :
        <>
          <ResponsiveBlock>
            <QuoteInfoCard
              style={{gridArea: 'quoteInfo'}}
              quote={quote}
              selectedAddons={addons.filter(e => e.isSelected)}
              onAddOnRemoved={deselectAddOn}
            />
            <QuotePriceCard
              style={{gridArea: 'quotePrice'}}
              displayPrice={displayPrice}
              selectedPeriod={selectedPeriod}
              onSelectedPeriodChange={(period) => {
                setSelectedPeriod(period);
              }} />
          </ResponsiveBlock>
            
          <Block>
            <Heading1 style={{gridArea: "addonTagline"}}>Tailor your cover with our optional extra</Heading1>
          </Block>
            {loadingAddons ?
                <Loader>Loading Addons...</Loader> : 
                <ResponsiveBlock>{addons.map((e, i) => <AddOnCard key={i} index={i} details={e} selectedPeriod={selectedPeriod}
                onSelected={selectAddOn}
                onRemoved={deselectAddOn} />)}</ResponsiveBlock>}
          </>}
    </>
  );
}