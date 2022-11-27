import styled from "styled-components";
import { Card } from "./basic/Card";
import { Chip } from "./basic/Chip";
import { Heading1 } from "./basic/typography";

const NoBorderCard = styled(Card)`
    border: none;
`
/**
 * We have chosen 
 * selectedPeriod default value as monthly
 * displayPrice default value = 999, not zero for safty, We dont want to show 0 Pounds Quote to the user
 * 
 * @param {*} param0 
 * @returns 
 */
export function QuoteInfoCard({quote, selectedAddons=[], onAddOnRemoved}) {
    return <NoBorderCard>
       <Heading1>Hey, {quote.firstName}</Heading1>
        <div>Here is your quote</div>
        <div>Quote reference: {quote.quoteRef}</div>
        <div>Covers starts on: {new Date(quote.startDate).toLocaleString()}</div>
        <div>Selected extras: <div>{selectedAddons.length === 0 ? "None Selected": selectedAddons.map(({title, index})=> 
            <Chip key={index} text={title} onDeleteClicked={e=>onAddOnRemoved(index)}/>
        )}</div></div>
    </NoBorderCard>
}