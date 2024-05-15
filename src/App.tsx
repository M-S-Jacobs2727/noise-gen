import { useCallback, useState } from "react";
import { Container, Stack, Button } from "react-bootstrap";

import { Slider } from "./components/Slider";
import { MediaButton } from "./components/mediaButton/MediaButton";
import { useAudio } from "./hooks/useAudio";
import { useHotkeys } from "./hooks/useHotkeys";

/**
 * TODO: implement gain node in useAudio (amplitude, period, duration)
 * TODO: add static variance to settings
 * TODO: implement download
 * TODO: alter sample length for period
 */
export default function App() {
    const params = parseURLSearchParams();

    const [playing, setPlaying] = useState(false);
    const [baseGain, setBaseGain] = useState(0.5);
    const [frequencySetting, setFrequencySetting] = useState(
        parseInt(params.get("freq") || "0")
    );
    const [waveAmplitude, setWaveAmplitude] = useState(
        parseFloat(params.get("amp") || "1")
    );
    const [wavePeriod, setWavePeriod] = useState(
        parseFloat(params.get("per") || "0")
    );
    const [waveDuration, setWaveDuration] = useState(
        parseFloat(params.get("dur") || "0")
    );

    const playPauseCallback = useCallback(() => setPlaying(p => !p), []);
    useHotkeys("k", playPauseCallback);

    const lowpass = frequencySetting < 0;
    const freq = getFrequencyFromSetting(Math.abs(frequencySetting), lowpass, 0, 50)

    useAudio(playing, lowpass, { baseGain, freq, waveAmplitude, wavePeriod, waveDuration });

    return <Container>
        <Stack gap={3} className="col-sm-8 col-md-6 col-lg-4 mx-auto mt-3">
            <h1 className="mx-auto">Noise Generator</h1>

            <MediaButton
                play={!playing} onClick={() => setPlaying(p => !p)}
                color="white" />

            <Slider
                label="Volume"
                value={baseGain}
                setValue={setBaseGain}
                min={0}
                max={1}
                step={0.1}
                tickStep={0.1} />

            <Slider
                label="Frequency"
                value={frequencySetting}
                setValue={setFrequencySetting}
                min={-50}
                max={50}
                tickStep={25} />

            {/* base amplitude in [-0.5, 0.5], wave amplitude scales from
             1 to 2 for final amplitude in [-1, 1] */}
            <Slider
                label="Wave Amplitude"
                value={waveAmplitude}
                setValue={setWaveAmplitude}
                min={1}
                max={2}
                step={0.02}
                tickStep={0.2} />

            {/* measured in seconds */}
            <Slider
                label="Wave Period"
                value={wavePeriod}
                setValue={setWavePeriod}
                min={0}
                max={10}
                step={0.2}
                tickStep={2} />

            {/* measured in seconds */}
            <Slider
                label="Wave Duration"
                value={waveDuration}
                setValue={setWaveDuration}
                min={0}
                max={2}
                step={0.04}
                tickStep={0.4} />

            <Stack direction="horizontal" className="justify-content-around align-items-stretch">
                <Button
                    onClick={() => { }}
                >
                    Download
                </Button>

                <Button
                    variant="outline-primary"
                    onClick={() => {
                        navigator.clipboard.writeText(getURLFromSettings(
                            frequencySetting, waveAmplitude, wavePeriod, waveDuration
                        ))
                    }}
                >
                    Share settings
                </Button>
            </Stack>
        </Stack>
    </Container>
}

function getURLFromSettings(frequencySetting: number, waveAmplitude: number, wavePeriod: number, waveDuration: number) {

    return `${window.location.origin}/settings?freq=${frequencySetting}&amp=${waveAmplitude}&per=${wavePeriod}&dur=${waveDuration}`
}

function parseURLSearchParams(): URLSearchParams {
    const params = new URLSearchParams(window.location.search);
    return params;
}

function getFrequencyFromSetting(
    frequencySetting: number,
    lowpass: boolean,
    minValue: number,
    maxValue: number
): number {
    const minFreq = lowpass ? 1000 : 200;
    const maxFreq = lowpass ? 10000 : 4000;
    const scaledFreq = (frequencySetting - minValue) / (maxValue - minValue); // range of [0, 1]
    const freq = minFreq + (maxFreq - minFreq)
        * (lowpass ? (1 - scaledFreq) : scaledFreq);
    return freq;
}
