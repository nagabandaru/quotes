import { useEffect, Suspense } from 'react'
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

function calcPrices(_draft){
  let calculatedDisplayPrice = _draft.displayPrice;
  calculatedDisplayPrice = _draft.quote[`${_draft.selectedPeriod}Price`]
  calculatedDisplayPrice = _draft.selectedAddons.reduce((a, c) => {
    return a + (_draft.addons[c][`${_draft.selectedPeriod}Price`] || 0);
  }, calculatedDisplayPrice);
  return calculatedDisplayPrice;
}

export const quotePageStateReducer = (draft, action) => {
  switch (action.type) {
    case "quote":
      draft.quote = action.value;
      draft.displayPrice = calcPrices(draft);
      break;

    case "doneLoadingQuote":
      draft.loadingQuote = false;
      break;
    case "doneLoadingAddons":
      draft.loadingAddons = false;
      break;
    case "quoteFound":
      draft.quoteFound = action.value;
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
  return draft;
}
export function QuotePage() {
  const { quoteId } = useParams();
  const [pageState, dispatchPageState] =  useImmerReducer( quotePageStateReducer,{
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
    getQuote(quoteId).then((quote) => {
      if (isEmpty(quote)) {
        dispatchPageState({ type: 'quoteFound', value: false})
      } else {
        dispatchPageState({ type: 'quote', value: quote})
        dispatchPageState({ type: 'doneLoadingQuote'})
      }
    }).catch(()=>{
      throw Error("Fetching quote error ");
    });

    getAddons().then((addons) => {
      dispatchPageState({ type: 'doneLoadingAddons'})
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
      {pageState.loadingQuote &&
        !pageState.quoteFound ? <NormalText>Quote not found</NormalText> :
        <Suspense fallback={<Loader>Loading Quote...</Loader>}>
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
            {!pageState.loadingAddons &&<Suspense fallback={<Loader>Loading Addons...</Loader>}>
                <ResponsiveBlock>
                  {pageState.addons.length === 0 && <Block>No addons found..</Block>}
                  {pageState.addons.map((e, i) => <AddOnCard key={i} index={i} details={e} 
                  selected={pageState.selectedAddons.indexOf(i) !== -1} 
                  selectedPeriod={pageState.selectedPeriod}
                onSelected={(index)=>{
                  dispatchPageState({ type: 'selectAddons', value: index})
                }}
                onRemoved={deselectAddOn} />)}</ResponsiveBlock>
                </Suspense> }
        </Suspense>}
    </>
  );
}