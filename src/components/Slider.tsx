import { Form, FormGroup } from "react-bootstrap"

type SliderProps = {
    enabled: boolean,
    label: string,
    value: number,
    setValue: (val: number) => void
}

export function Slider({ enabled, label, value, setValue }: SliderProps) {
    return <FormGroup>
        <Form.Label>{label}</Form.Label>
        <Form.Range
            disabled={!enabled}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            min={0}
            max={100}
            step={1}
        />
    </FormGroup>
}