# tone-rhythm

[![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/)

Generate an array of Tone.Transport times given an array of musical rhythms in
various formats that tone understands.

Written for exclusive use with [Tone.js](https://tonejs.github.io/).

## Features

- Works with latest version of Tone (as of Oct 6, 2018)
- Works in-browser (transpiled) or in node (ES6)
- Light footprint (16kb)
- Intuitive and fully-documented API

### Why use tone-rhythm?

As a musician developing music applications, I wanted an API that would allow me to put rhythms along with a melody into `Tone.Part`. The example on Tone's docs shows how this is expected:

```js
var synth = new Tone.FMSynth().toMaster()

//schedule a series of notes to play as soon as the page loads
synth.triggerAttackRelease('C4', '4n', '8n')
synth.triggerAttackRelease('E4', '8n', Tone.Time('4n') + Tone.Time('8n'))
synth.triggerAttackRelease('G4', '16n', '2n')
synth.triggerAttackRelease('B4', '16n', Tone.Time('2n') + Tone.Time('8t'))
synth.triggerAttackRelease('G4', '16', Tone.Time('2n') + Tone.Time('8t')*2)
synth.triggerAttackRelease('E4', '2n', '0:3')
```

The third parameter in `triggerAttackRelease` is the start time of the note we're triggering. Musicians don't normally consider where a note is in a timeline when composing music. I needed a way to calculate this ahead of time.

I found enlightenment after reading [Music Theory using Tone.js - Play Rhythms](https://www.guitarland.com/MusicTheoryWithToneJS/PlayRhythms.html). If you have an array of durations, accumulating the rhythmic values to generate a start time is the approach the article took to making rhythmic music with Tone. I adapted and modified one of the author's algorithms.

## Getting Started

### Prerequisites

[Tone.js](https://tonejs.github.io/) (v0.12.x or higher)

### Installing

`npm install tone-rhythm`

Or clone the repo and copy `dist/tone-rhythm.min.js` into your project.

### Usage

#### ES6 / Webpack

```js
// tone is a required peer dependency
import ToneTime from 'tone/Tone/type/Time';

import toneRhythm from 'tone-rhythm';
// any or all methods can be used in the instantiated toneRhythm:
const {
    getBarsBeats,
    addTimes,
    getTransportTimes,
    mergeMusicDataPart
} = toneRhythm(ToneTime);
```

#### Browser

```html
<head>
  <!-- Get tone from their CDN: -->
  <script src="https://unpkg.com/tone@13.4.9/build/Tone.js"></script>
  <!-- Import `tone-rhythm.min.js` from node_modules: -->
  <script src="node_modules/tone-rhythm/dist/tone-rhythm.min.js"></script>
  <!-- OR simply provide your path/to/tone-rhythm.min.js -->
</head>
```

In your js file(s):

```js
const {
  getBarsBeats,
  addTimes,
  getTransportTimes,
  mergeMusicDataPart
} = toneRhythm(Tone.Time); // both `toneRhythm` and `Tone.Time` are available globally
```

#### (Legacy) Pre-bundled with Tone

See [docs/tone-rhythm@0.0.2.md](docs/tone-rhythm@0.0.2.md).

## API

Values which can populate a rhythms array:

- '4n' - a 'notation' value
- ['4n', '8t'] - an array of 'notation' values which will be added together
- ['r', '2n'] - an array that has 'r' at first index will be a rest
- ['r', '2n', '8t'] - (see above about 'r') and the remaining values
                     will be added together

It's **not** recommended to use Tone's seconds format.

See [documentation](DOCUMENTATION.md) and below for tone-rhythm library usage.

## Examples ("Maria" by Leonard Bernstein)

### toneRhythm.getTransportTimes

Given an array of durations (see API), return transport times.

```js
const mariaDurations = ['8n', '8n', ['2n', '4n'], '8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n', ['2n', '4n'], '8n', '8n', '8n', '8n', '8n', ['4n', '8n'], '8n', '8n', '8n', '8n', '8n', '4n', '4n', ['2n', '4n', '8n'], '8n', '8n', ['2n', '4n'], '8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n', ['2n', '4n'], '8n', '8n', '8n', '8n', '8n', ['4n', '8n'], '8n', '8n', '8n', '8n', '8n', '4n', '4n', ['2n', '4n', '8n']];

const mariaTransportTimes = toneRhythm.getTransportTimes(mariaDurations); /* ->
  Result:
[0, "0:0:2", "0:1:0", "1:0:0", "1:0:2", "1:1:0.667", "1:1:3.334", "1:2:2", "1:3:0.667", "1:3:3.334", "2:0:2", "2:1:0", "3:0:0", "3:0:2", "3:1:0", "3:1:2", "3:2:0", "3:2:2", "4:0:0", "4:0:2", "4:1:0", "4:1:2", "4:2:0", "4:2:2", "4:3:2", "5:0:2", "6:0:0", "6:0:2", "6:1:0", "7:0:0", "7:0:2", "7:1:0.667", "7:1:3.334", "7:2:2", "7:3:0.667", "7:3:3.334", "8:0:2", "8:1:0", "9:0:0", "9:0:2", "9:1:0", "9:1:2", "9:2:0", "9:2:2", "10:0:0", "10:0:2", "10:1:0", "10:1:2", "10:2:0", "10:2:2", "10:3:2", "11:0:2"]
*/
```

### toneRhythm.mergeMusicDataPart

Returns array of objects for consumption by Tone.Part.

```js
const mariaPitches = ["Eb4", "A4", "Bb4", "Eb4", "A4", "Bb4", "C5", "A4", "Bb4", "C5", "A4", "Bb4", "Bb4", "A4", "G4", "F4", "Eb4", "F4", "Bb4", "Ab4", "G4", "F4", "Eb4", "F4", "Eb4", "G4", "Eb4", "A4", "Bb4", "Eb4", "A4", "Bb4", "C5", "A4", "Bb4", "C5", "D5", "Bb4", "D5", "Eb5", "D5", "C5", "Bb4", "D5", "D5", "Eb5", "D5", "C5", "Bb4", "D5", "Eb5", "F5"];

const mergedData = mergeMusicDataPart({
  rhythms: mariaDurations,
  notes: mariaPitches,
  startTime: '0:3:2'
}); /* -> [
  {time: "0:3:2", duration: "8n", note: "Eb4"},
  {time: "1:0:0", duration: "8n", note: "A4"},
  {time: "1:0:2", duration: "0:3:0", note: "Bb4"},
  {time: "1:3:2", duration: "8n", note: "Eb4"},
  {time: "2:0:0", duration: "4t", note: "A4"},
  {time: "2:0:2.667", duration: "4t", note: "Bb4"},
  ...
]
*/
```

### Use in Tone.Part

```js
const melodyPart = new Tone.Part((time, value) => {
  piano.triggerAttackRelease(value.note, value.duration, time);
}, mergedData).start(0);
```

## Running the tests

`npm run test` - opens the tests in-browser

## Acknowledgments

Thank you [https://www.guitarland.com](https://www.guitarland.com) and the creator of [Tone.js](https://tonejs.github.io/).
