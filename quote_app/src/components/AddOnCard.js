import { PERIODS } from "../mappings"
import { Button } from "./Button";
import { Card } from "./Card"

export function AddOnCard({index, details, selectedPeriod, onSelected, onRemoved}){
    return <Card>
        <div>{details.title}</div>
        <div>{details.text}</div>
        {selectedPeriod === PERIODS.MONTHLY && <div>£{details.monthlyPrice}</div>}
        {selectedPeriod === PERIODS.ANNUAL && <div>£{details.annualPrice}</div>}
        { !details['isSelected'] ? <Button onClick={e=>onSelected(e, index)}>Select this extra</Button> : 
        <Button onClick={e=>onRemoved(e, index)}>Remove this extra </Button>}
        </Card>
}