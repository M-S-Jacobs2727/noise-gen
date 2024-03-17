import { useState } from "react";
import { Stack, Form } from "react-bootstrap";

import { ColorSelector } from "../components/ColorSelector";
import { Slider } from "../components/Slider";

export function Home() {
    const [preview, setPreview] = useState(true)
    const [color, setColor] = useState("white")
    const [wavesEnabled, setWavesEnabled] = useState(false)
    const [intensityAvg, setIntensityAvg] = useState(50)
    const [intensityVar, setIntensityVar] = useState(0)
    const [periodAvg, setPeriodAvg] = useState(50)
    const [periodVar, setPeriodVar] = useState(0)
    const [durationAvg, setDurationAvg] = useState(50)
    const [durationVar, setDurationVar] = useState(0)
    const ranges = [
        {
            label: "Wave intensity average",
            value: intensityAvg,
            setter: setIntensityAvg
        },
        {
            label: "Wave intensity variation",
            value: intensityVar,
            setter: setIntensityVar
        },
        {
            label: "Wave period average",
            value: periodAvg,
            setter: setPeriodAvg
        },
        {
            label: "Wave period variation",
            value: periodVar,
            setter: setPeriodVar
        },
        {
            label: "Wave duration average",
            value: durationAvg,
            setter: setDurationAvg
        },
        {
            label: "Wave duration variation",
            value: durationVar,
            setter: setDurationVar
        },
    ]

    return <Stack gap={3} className="col-sm-8 col-md-6 col-lg-4 mx-auto">
        <h1 className="mx-auto">Noise Generator</h1>
        <Form.Check
            type="switch"
            id="check-enable-live-preview"
            label="Enable live preview"
            checked={preview}
            onChange={() => setPreview(!preview)}
        />
        <ColorSelector color={color} setColor={setColor} />
        <Form.Check
            type="switch"
            id="check-enable-waves"
            label="Enable waves"
            checked={wavesEnabled}
            onChange={() => setWavesEnabled(!wavesEnabled)}
        />
        {ranges.map(range =>
            <Slider
                enabled={wavesEnabled}
                label={range.label}
                value={range.value}
                setValue={range.setter} />
        )}
    </Stack >
}