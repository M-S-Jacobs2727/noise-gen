import { Col, Row, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import types from "../data/nosie-types.json"

type ColorSelectorProps = {
    color: string,
    setColor: (newColor: string) => void
}

export function ColorSelector({ color, setColor }: ColorSelectorProps) {
    return <Row>
        <Col className="mb-2" sm={12}><span>Noise color</span></Col>
        <Col>
            <ToggleButtonGroup
                type="radio"
                value={color}
                onChange={setColor}
                name="color-selector">
                {types.map((typ, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`color-selector-${typ.name}`}
                        variant="secondary"
                        value={typ.name}
                        style={{
                            borderColor: "black",
                            color: "black",
                            backgroundColor: `${(color === typ.name) ? color : "var(--bs-btn-bg)"}`
                        }}
                    >
                        {typ.name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Col>
    </Row >
}