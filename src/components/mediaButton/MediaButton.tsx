import PlayButton from './PlayButton'
import PauseButton from './PauseButton'

type MediaButtonProps = {
    color: string
    play: boolean
    onClick: () => void
}
export function MediaButton({ color, play, onClick }: MediaButtonProps) {
    return (<div className='display-flex justify-content-center align-items-center row'>
        <div className="app-media-button btn"
            style={{
                height: "2em",
                width: "2em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                border: `0.25em solid ${color}`,
                fontSize: "10rem",
            }}
            onClick={onClick}>{
                play ?
                    <PlayButton color={color} /> :
                    <PauseButton color={color} />
            }</div>
    </div>
    )
}
