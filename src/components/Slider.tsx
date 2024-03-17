import { Form, FormGroup } from "react-bootstrap"

type SliderProps = {
    label: string,
    value: number,
    setValue: (val: number) => void
}

export function Slider({ label, value, setValue }: SliderProps) {
    return <FormGroup>
        <Form.Label>{label}</Form.Label>
        <Form.Range
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            min={0}
            max={100}
            step={1}
        />
    </FormGroup>
}