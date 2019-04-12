# Changelog

## v1.0.0 Apr 9, 2019

BREAKING CHANGE - Tone is now a true "peer dependency" and needs to be included in the toneRhythm factory function:

```js
const ToneTime = require('tone/Tone/type/Time');
const toneRhythm = require('tone-rhythm')(ToneTime);
const {
    getBarsBeats,
    addTimes,
    getTransportTimes,
    mergeMusicDataPart
} = toneRhythm;
```

This is to prevent possible conflicts between versions of tone bundled in tone-rhythm pre-version 1.0.0.
