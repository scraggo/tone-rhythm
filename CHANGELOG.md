# Changelog

## v1.2.0 Apr 20, 2019

Fix/Feature: Allow instantiation if tone-rhythm without throwing an error. Error will be thrown at run-time if Tone.Time is passed in incorrectly:

```js
const toneRhythm = require('tone-rhythm')(()=>{}); // doesn't throw error
toneRhythm.mergeMusicDataPart({ /* data */}); // throws error
```

## v1.1.0 Apr 13, 2019

Feature: Add `idx` property to return of `mergeMusicDataPart`. `idx` is exactly equal to the array index in the returned data:

```js
const mergedData = mergeMusicDataPart({
    rhythms: mariaDurations
});
// mergedData[0]:
// {
//     duration: '8n',
//     idx: 0,
//     time: 0
// };
```

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
