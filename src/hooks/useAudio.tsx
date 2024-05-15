import { useEffect } from "react";


const audioCtx = new AudioContext({ sampleRate: 44100 });
audioCtx.suspend();
const bqFilter = audioCtx.createBiquadFilter();
const gain = audioCtx.createGain();
const noiseBuffer = audioCtx.createBuffer(1, 3 * audioCtx.sampleRate, audioCtx.sampleRate);
const gainCurve = new Float32Array(noiseBuffer.length);

type UseAudioOptions = {
    freq: number
    waveAmplitude: number
    wavePeriod: number
    waveDuration: number
    baseGain: number
}

export function useAudio(
    playing: boolean,
    lowpass: boolean,
    { freq, waveAmplitude, wavePeriod, waveDuration, baseGain }: UseAudioOptions,
) {
    useEffect(() => {
        if (!playing)
            return () => { };

        const source = setupBufferSource();

        updateBiquad(freq, lowpass);
        updateGain(baseGain, waveAmplitude, waveDuration, wavePeriod);

        startSource(source);

        return () => stopSource(source);
    }, [playing, lowpass, freq, waveAmplitude, waveDuration, wavePeriod, baseGain]);
}

function setupBufferSource(): AudioBufferSourceNode {
    const channel = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        channel[i] = Math.random() - 0.5;
    }
    const source = new AudioBufferSourceNode(audioCtx, { loop: true, buffer: noiseBuffer });

    return source;
}

function updateBiquad(freq: number, lowpass: boolean) {
    bqFilter.type = lowpass ? "lowpass" : "highpass";
    bqFilter.frequency.setValueAtTime(freq, 0);
    bqFilter.Q.setValueAtTime(0.01, 0);
}

function updateGain(baseGain: number, waveAmplitude: number, waveDuration: number, wavePeriod: number) {
    for (let i = 0; i < gainCurve.length; i++) {
        gainCurve[i] = 0.5 - 0.25 * (waveAmplitude - 1) * Math.cos(2 * Math.PI * i / (audioCtx.sampleRate * wavePeriod));
    }
    gain.gain.setValueCurveAtTime(gainCurve, 0, noiseBuffer.duration);
}

function startSource(source: AudioBufferSourceNode) {
    source.connect(bqFilter);
    bqFilter.connect(gain);
    gain.connect(audioCtx.destination)
    audioCtx.resume();
    source.start();
}

function stopSource(source: AudioBufferSourceNode) {
    source.stop();
    audioCtx.suspend();
    source.disconnect();
    bqFilter.disconnect();
    gain.disconnect();
}