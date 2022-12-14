import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";

const StyledHiddenText = styled.span`
    cursor: pointer;
    text-decoration: underline;
`;

const HiddenText = ({
    children,
    viewStartCount = 0,
    viewEndCount = 4
}: {
    children: string | undefined, 
    viewStartCount?: number, 
    viewEndCount?: number
}) => {
    const [isHidden, setIsHidden] = React.useState(true);

    if(children === undefined) {
        return <span>?</span>
    }
    const viewStart = children.slice(0, viewStartCount)
    const between = children.slice(viewStartCount, viewEndCount === 0 ? undefined : -viewEndCount);
    const viewEnd = viewEndCount === 0 ? "" : children.slice(-viewEndCount)
    
    return <StyledHiddenText onClick={() => setIsHidden(!isHidden)}>
        {isHidden ?
            <>{viewStart}{"*".repeat(between.length)}{viewEnd} <FaEye/></>
            :
            <>{children} <FaEyeSlash /></>
        }
        
    </StyledHiddenText>;
}
 
export default HiddenText;