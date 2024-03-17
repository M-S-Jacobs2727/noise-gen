import { Col, Row, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import types from "../data/nosie-types.json"

type ColorSelectorProps = {
    color: string,
    setColor: (newColor: string) => void
}

export function ColorSelector({ color, setColor }: ColorSelectorProps) {
    return <Row>
        <Col sm={8}><span>Noise color</span></Col>
        <Col>
            <ToggleButtonGroup
                type="radio"
                value={color}
                onChange={setColor}
                name="color-selector"
            >
                {types.map((typ, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`color-selector-${typ.name}`}
                        variant="outline-secondary"
                        // name={typ.name}
                        value={typ.name}
                        style={{ borderColor: "black" }}
                    >{typ.name}</ToggleButton>))}
            </ToggleButtonGroup>
        </Col>
    </Row>
}