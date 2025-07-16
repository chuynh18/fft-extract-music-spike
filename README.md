# Spike: Extracting notes from arbitrary recordings via Fast Fourier Transform

Previously, I built a [digital piano](https://github.com/chuynh18/tones-test/) then extended it with [MIDI parsing](https://github.com/chuynh18/midijs) (now also integrated and best experienced via the digital piano).

I would like to eventually add the following features:
* Extracting the notes from arbitrary recordings and playing them back in the digital piano.
* Parsing the musical data into sheet music and drawing it onscreen
* Serializing music back to MIDI (this would allow me to generate MIDI files based off of arbitrary audio)
* Training a machine learning model to recognize sheet music and output that data in a form I can play via the digital piano.

This repo holds my exploration as I experiment with the first item. This experimentation will go wherever it needs to go as I do not have a strong background in math.

I know the Fourier transform (specifically the [FFT](https://en.wikipedia.org/wiki/Fast_Fourier_transform) for my use case) relates the time domain of a signal to its frequency domain. It should be possible to take the audio signal from a recording and figure out the frequencies. Since the tuning of musical instruments is well known, it should be straightforward to figure out which notes were played.

It's likely that Steinway & Sons does this for Spirio-equipped pianos. Spirio is Steinway's take on the player piano and they advertise having a large catalog of recordings that you can hear your own piano play (some even in real-time). Importantly, they advertise having a back catalog of older recordings. I assume modern Spirio recordings were recorded directly by having the artist play on a properly-equipped piano. Older recordings could not have been recorded in this manner, so I'm assuming they likely used FFTs and potentially some manual touching-up to create those performances.

## What I know
* The FFT should be **the** tool to extract the frequency data from recordings.
* I don't have to implement the FFT function as I believe it's provided via the Web Audio API

## Known challenges
* Musical instruments sound interesting because they have overtones. How do I recognize and remove them?
    * Overtones are integer multiples of the fundamental frequency. They are also lower in magnitude. So I can identify overtones by checking whether a given note is an integer multiple of a lower frequency. However, I need to be careful and compare the relative magnitudes of the notes (so that I don't reject the higher notes in chords and octaves).
* Using the FFT is [as much an art as a science](https://download.ni.com/evaluation/pxi/Understanding%20FFTs%20and%20Windowing.pdf). I'm not sure on the specifics yet, but I know that [window size of the FFT](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize) is important.

## Approach
* Start with what I know. Create an HTML page that just has one input to take in a file. Read in that file then create a new AudioContext and analyser. Just get the FFT working for starters and see what frequency information comes out.
* Play with FFT parameters to see what gets the cleanest data. I'll likely have to "slide" the window over the entire audio track and write out the frequency peaks.
* Experiment with identifying overtones. I'll probably want to use music that I'm familiar with and follow along with the sheet music. This way, I know exactly what notes I'm supposed to keep or reject.
* Once I get something robust, I can work to parse the data into a form that my digital piano project can play.