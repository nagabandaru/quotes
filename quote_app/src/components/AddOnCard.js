import styled from "styled-components";
import { periodHumanReadable, PERIODS } from "../mappings"
import { Button } from "./basic/button";
import { Card } from "./basic/Card"
import { NormalText } from "./basic/typography";
import classnames from "classnames"
import { Block, RightAlignedActionsBlock } from "../App.styled";
import { TwoStateButton, TwoStateText } from "./basic/toggled_components";
const StyledAddonCard = styled(Card)`
    &.selected{
        background-color: dodgerblue;
    }
`;
const Title = styled.div`
    font-size: 1.5em;
`
const TitleBlock = styled.div`
    display: grid;
    grid-template-columns: 1fr fit-content(100%);
`
export function AddOnCard({ index, details, selectedPeriod, onSelected, onRemoved }) {
    return <StyledAddonCard className={classnames({selected: details.isSelected})}>
        <TitleBlock>
            <Title>
                <NormalText>{details.title}</NormalText>
            </Title>
            <Block>
            <TwoStateText 
                label1={`£${details.monthlyPrice} `}
                label2={`£${details.annualPrice} `}
                togglePredicate={selectedPeriod === PERIODS.MONTHLY}
            />
            <NormalText>{periodHumanReadable[selectedPeriod]}</NormalText>
            </Block>

        </TitleBlock>
        <NormalText>{details.text}</NormalText>
        <RightAlignedActionsBlock>
            <TwoStateButton
                button1Text={"Select this extra"}
                button2Text={"Remove this extra"}
                togglePredicate={!details['isSelected']}
                onToggle={(predicate)=>!predicate? onSelected(index): onRemoved(index)}
            ></TwoStateButton>
        </RightAlignedActionsBlock>
    </StyledAddonCard>
}