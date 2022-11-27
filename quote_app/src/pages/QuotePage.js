import { useEffect, useRef } from 'react'
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
import { useImmerReducer } from 'use-immer';
import { Block, ResponsiveBlock } from '../App.styled';

export function QuotePage() {
  const { quoteId } = useParams();
  const quoteFetchedRef = useRef(false);
  const addonsFetchedRef = useRef(false);
  const [pageState, dispatchPageState] =  useImmerReducer((draft, action) => {
    function calcPrices(_draft){
      let calculatedDisplayPrice = _draft.displayPrice;
      calculatedDisplayPrice = _draft.quote[`${_draft.selectedPeriod}Price`]
      calculatedDisplayPrice = _draft.selectedAddons.reduce((a, c) => {
        return a + (_draft.addons[c][`${_draft.selectedPeriod}Price`] || 0);
      }, calculatedDisplayPrice);
      return calculatedDisplayPrice;
    }
    switch (action.type) {
      case "quote":
        draft.quote = action.value;
        draft.displayPrice = calcPrices(draft);
        break;
      case "loadingQuote":
        draft.loadingQuote = action.value;
        break;
      case "quoteFound":
        draft.quoteFound = action.value;
        break;
      case "loadingAddons":
        draft.loadingAddons = action.value;
        break;
      case "selectedPeriod":
        draft.selectedPeriod = action.value;
        draft.displayPrice = calcPrices(draft);
        break;
      case "selectAddons":
        if(draft.selectedAddons.indexOf(action.value) === -1){
          draft.selectedAddons.push(action.value);
        }
        draft.displayPrice = calcPrices(draft);
        break;
      case "deselectAddons":
          draft.selectedAddons.splice(draft.selectedAddons.indexOf(action.value), 1);
          draft.displayPrice = calcPrices(draft);
          break;
      case 'addons':
        draft.addons = action.value;
        break;
      default:
        break;
    }
  },{
    quoteFound: true,
    quote: {},
    selectedPeriod: PERIODS.MONTHLY,
    displayPrice: 0,
    selectedAddons: [],
    loadingQuote: true,
    loadingAddons: true,
    addons: []
  });
  useEffect(() => {
    if (quoteFetchedRef.current) return;
    quoteFetchedRef.current = true;
    getQuote(quoteId).then((quote) => {
      if (isEmpty(quote)) {
        dispatchPageState({ type: 'quoteFound', value: false})
      } else {
        dispatchPageState({ type: 'quote', value: quote})
        dispatchPageState({ type: 'loadingQuote', value: false})
      }
    });

    if (addonsFetchedRef.current) return;
    addonsFetchedRef.current = true;
    getAddons().then((addons) => {
      dispatchPageState({ type: 'loadingAddons', value: false})
      addons = addons.map((addon, index) => {
        return {...addon, index}  
      });
      dispatchPageState({ type: 'addons', value: addons})
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteId]);
  
  function deselectAddOn(index){
    dispatchPageState({ type: 'deselectAddons', value: index})
  }
  return (
    <>
      {pageState.loadingQuote ? <Loader>Loading Quote...</Loader> :
        !pageState.quoteFound ? <NormalText>Quote not found</NormalText> :
        <>
          <ResponsiveBlock>
            <QuoteInfoCard
              style={{gridArea: 'quoteInfo'}}
              quote={pageState.quote}
              selectedAddons={pageState.addons.filter(( _ , i) => 
                  pageState.selectedAddons.indexOf(i) !== -1)}
              onAddOnRemoved={deselectAddOn}
            />
            <QuotePriceCard
              style={{gridArea: 'quotePrice'}}
              displayPrice={pageState.displayPrice}
              selectedPeriod={pageState.selectedPeriod}
              onSelectedPeriodChange={(period) => {
                dispatchPageState({ type: 'selectedPeriod', value: period})
              }} />
          </ResponsiveBlock>
            
          <Block>
            <Heading1 style={{gridArea: "addonTagline"}}>Tailor your cover with our optional extra</Heading1>
          </Block>
            {pageState.loadingAddons ?
                <Loader>Loading Addons...</Loader> : 
                <ResponsiveBlock>{pageState.addons.map((e, i) => <AddOnCard key={i} index={i} details={e} 
                  selected={pageState.selectedAddons.indexOf(i) !== -1} 
                  selectedPeriod={pageState.selectedPeriod}
                onSelected={(index)=>{
                  dispatchPageState({ type: 'selectAddons', value: index})
                }}
                onRemoved={deselectAddOn} />)}</ResponsiveBlock>}
          </>}
    </>
  );
}