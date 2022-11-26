import { Button } from "./button";
import { NormalText } from "./typography";

/**
 * State is always show as per the predicate condition
 * @param {*} param0 
 * @returns 
 */
function TwoStateComponent({component1, component2,togglePredicate, onToggle}){
    return togglePredicate ? component1 : component2;
}

export function TwoStateButton({button1Text, button2Text, togglePredicate, onToggle}){
    return <TwoStateComponent
        component1={<Button onClick={e=>onToggle(!togglePredicate)}>{button1Text}</Button>}
        component2={<Button  onClick={e=>onToggle(!togglePredicate)}>{button2Text}</Button>}
        togglePredicate={togglePredicate}
    />
}

export function TwoStateText({label1, label2, togglePredicate}){
    return <TwoStateComponent
        component1={<NormalText>{label1}</NormalText>}
        component2={<NormalText>{label2}</NormalText>}
        togglePredicate={togglePredicate}
    />
}