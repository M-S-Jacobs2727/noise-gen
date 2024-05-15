type PlayButtonProps = {
    color: string
}
export default function PlayButton({ color }: PlayButtonProps) {
    return (<>
        <div style={{
            height: "0",
            width: "0",
            border: "0.5em solid transparent",
            borderLeft: `0.8em solid ${color}`,
            transform: "translateX(0.36em)",
        }} />
    </>
    )
}
