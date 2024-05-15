type SliderProps = {
    label: string
    value: number
    setValue: (val: number) => void
    min: number
    max: number
    step?: number
    tickStep?: number
}

export function Slider({ label, value, setValue, min, max, tickStep = 3, step = 1 }: SliderProps) {
    const length = (max - min) / tickStep;
    const suggestedValues = Array.from({ length }, (_v, idx) => idx * tickStep + min);
    const listId = `${label}-list`
    const rangeId = `${label}-range`

    return <>
        <label htmlFor={rangeId}>{label}</label>
        <input
            style={{
                marginBottom: "1em",
                height: "2em"
            }}
            type="range"
            id={rangeId}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            min={min}
            max={max}
            step={step}
            list={listId}
        />
        <datalist id={listId}>
            {suggestedValues.map((value, idx) => <option key={`${label}-list-${idx}`} value={value} />)}
        </datalist>
    </>
}