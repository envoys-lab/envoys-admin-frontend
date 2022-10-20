import React from 'react';
import styled from 'styled-components'

const StyledBulb = styled.div`
    width: 11px;
    height: 11px;
    display:inline-block;
    border-radius: 360px;
    vertical-align: middle;
    transition: 2s;
    transition-timing-function: linear;
    filter: blur(0.5px)
`;

type BulbProps = {
    color?: string
    style?: React.CSSProperties
}

const Bulb: React.FC<BulbProps> = ({ color = "red", style = {}}) => {
    const [state, setState] = React.useState(false);

    React.useEffect(() => {
        const i = setInterval(() => {
            setState((s) => !s);
        }, 2000);
        return () => clearInterval(i);
    }, []);
    
    return <StyledBulb style={{
        boxShadow: `0px 0px ${state ? '3px 1px' : '4px 2px'} ${color}`,
        background: `${color}`,
        opacity: `${state ? '0.9' : '0.8'}`,
        ...style
    }}></StyledBulb>;
}
 
export default Bulb;