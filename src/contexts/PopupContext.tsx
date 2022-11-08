import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaWindowClose } from 'react-icons/fa';
import styled from 'styled-components'

const StyledPopupBg = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100vw;
    min-height: 100vh;
    z-index: 3;
    background: rgba(0,0,0,0.4)
`;
const StyledPopup = styled.div`

    z-index: 4;
`;

type PopupContextProps = {
  node: React.ReactNode | undefined
  setNode: (node: React.ReactNode | undefined) => void
}
const Context = React.createContext<PopupContextProps>({ node: undefined, setNode: () => {} })

export const usePopup = () => {
    const context = React.useContext(Context);
    return {
        active: context.node !== undefined,
        node: context.node,
        setPopup: context.setNode
    }
}

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [node, setNode] = React.useState<React.ReactNode | undefined>(undefined)
  return <Context.Provider value={{ node, setNode }}>{children}</Context.Provider>
}


export const Popup = () => {
    const { node, setPopup, active } = usePopup();
    const style = active ? {} : {
        display: "none"
    }
    return <>
        <StyledPopupBg style={style}>
            <StyledPopup>
                <Container>
                    <Row>
                        <Col md={{ offset: 4, span: 4 }} style={{marginTop: "10vh"}}>
                            <Card>
                                <Card.Header>
                                    Popup <FaWindowClose style={{cursor: "pointer"}} onClick={() => setPopup(undefined)} />
                                </Card.Header>
                                <Card.Body>
                                    {node}
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>

                </Container>
            </StyledPopup>
        </StyledPopupBg>
    </>
}

export default Context
