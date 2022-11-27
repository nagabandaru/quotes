import styled from "styled-components";
import { CenterAlignedActionsBlock } from "../App.styled";
import { periodHumanReadable, PERIODS } from "../mappings";
import { Card } from "./basic/Card";
import { TwoStateButton } from "./basic/toggled_components";
import { Heading2 } from "./basic/typography";
const StyledPriceCard = styled(Card)`
    text-align: center;
`;
/**
 * We have chosen 
 * selectedPeriod default value as monthly
 * displayPrice default value = 999, not zero for safty, We dont want to show 0 Pounds Quote to the user
 * 
 * @param {*} param0 
 * @returns 
 */
export function QuotePriceCard({ onSelectedPeriodChange, selectedPeriod= PERIODS.MONTHLY, displayPrice = 999 }) {
    return <StyledPriceCard>
        <Heading2>£{displayPrice.toFixed(2)}</Heading2>
        <div>{periodHumanReadable[selectedPeriod]}</div>
        <div>This price includes Insurance Premium Tax at the current rate. No charge for paying monthly.</div>
        <CenterAlignedActionsBlock>
            <TwoStateButton
                button1Text={"Switch to annual"}
                button2Text={"Switch to monthly"}
                togglePredicate={selectedPeriod===PERIODS.MONTHLY}
                onToggle={
                    (predicate)=>!predicate ?
                        onSelectedPeriodChange(PERIODS.ANNUAL):
                        onSelectedPeriodChange(PERIODS.MONTHLY)}/>

        </CenterAlignedActionsBlock>
    </StyledPriceCard>
}