type PauseButtonProps = {
    color: string
}
export default function PauseButton({ color }: PauseButtonProps) {
    return (
        <div style={{
            height: "1em",
            width: "0.75em",
            background: "none",
            borderLeft: `0.3em solid ${color}`,
            borderRight: `0.3em solid ${color}`,
        }}></div>
    )
}
