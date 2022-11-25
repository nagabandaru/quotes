import { useState } from "react";
import { periodHumanReadable, PERIODS } from "../mappings";
import { Button } from "./Button";
import { Card } from "./Card";
/**
 * We have chosen 
 * selectedPeriod default value as monthly
 * displayPrice default value = 999, not zero for safty, We dont want to show 0 Pounds Quote to the user
 * 
 * @param {*} param0 
 * @returns 
 */
export function QuoteCard({ onSelectedPeriodChange, selectedPeriod= PERIODS.MONTHLY, displayPrice = 999 }) {
    return <Card>
        <div>£{displayPrice.toFixed(2)}</div>
        <div>{periodHumanReadable[selectedPeriod]}</div>
        <div>This price includes Insurance Premium Tax at the current rate. No charge for paying monthly.</div>
        {selectedPeriod===PERIODS.MONTHLY && <Button onClick={e=>{
            // alert(2)
            onSelectedPeriodChange(PERIODS.ANNUAL);
        }}>Switch to annual</Button>}
        {selectedPeriod===PERIODS.ANNUAL && <Button onClick={e=>{
            // alert(1)
            onSelectedPeriodChange(PERIODS.MONTHLY);
        }}>Switch to monthly</Button>}
    </Card>
}