import styled from "styled-components"
import { RoundButton } from "./button"
import { NormalText } from "./typography"

const ChipWrapper = styled.span`
    display: inline-block;
    border: 1px solid ;
    border-radius: 100px;
    margin-right: 5px;
    font-size: 0.8em;
    padding: 0 5px;
`
export function Chip({text, onDeleteClicked}){
    return <ChipWrapper>
        <NormalText>{text}</NormalText>
        <RoundButton onClick={onDeleteClicked}>X</RoundButton>
    </ChipWrapper>
}