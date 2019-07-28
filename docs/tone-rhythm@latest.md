<a name="toneRhythm"></a>

## toneRhythm(ToneTime) ⇒ <code>Object</code>
Factory to get tone-rhythm methods

**Kind**: global function  
**Returns**: <code>Object</code> - - tone-rhythm methods {
    getBarsBeats,
    addTimes,
    getTransportTimes,
    mergeMusicDataPart
  }  
**Version**: tone-rhythm 2.0.0  
**Author**: https://github.com/scraggo/tone-rhythm  

| Param | Type | Description |
| --- | --- | --- |
| ToneTime | <code>Object</code> | import of Tone.Time. example: const ToneTime = require('tone/Tone/type/Time'); |


* [toneRhythm(ToneTime)](#toneRhythm) ⇒ <code>Object</code>
    * [~getBarsBeats(value)](#toneRhythm..getBarsBeats) ⇒ <code>string</code>
    * [~addTimes(item)](#toneRhythm..addTimes) ⇒ <code>string</code>
    * [~getTransportTimes(arrOfDurations, [startTime])](#toneRhythm..getTransportTimes) ⇒ <code>Array</code>
    * [~mergeMusicDataPart(config)](#toneRhythm..mergeMusicDataPart) ⇒ <code>Array</code>

<a name="toneRhythm..getBarsBeats"></a>

### toneRhythm~getBarsBeats(value) ⇒ <code>string</code>
**Kind**: inner method of [<code>toneRhythm</code>](#toneRhythm)  
**Returns**: <code>string</code> - - rhythm value converted to Tone's bars/beats format.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> \| <code>number</code> | a rhythm value Tone recognizes |

**Example**  
```js
getBarsBeats('4n') -> '0:1:0'
```
<a name="toneRhythm..addTimes"></a>

### toneRhythm~addTimes(item) ⇒ <code>string</code>
**Kind**: inner method of [<code>toneRhythm</code>](#toneRhythm)  
**Returns**: <code>string</code> - - if item is an array, returns
rhythm value converted to Tone's bars/beats format.
If item was a string, it gets returned as is.  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Array.&lt;string&gt;</code> \| <code>string</code> | if item is array, return summation of items in Tone's bars/beats format.    Note: The first item of the array may be 'r' (rest) |

**Example**  
```js
addTimes('4n.') -> '4n.'
```
**Example**  
```js
addTimes(['8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n']) -> '1:1:0'
```
<a name="toneRhythm..getTransportTimes"></a>

### toneRhythm~getTransportTimes(arrOfDurations, [startTime]) ⇒ <code>Array</code>
Given an array of durations (see API), return transport times.
see [README.md](README.md) for examples

**Kind**: inner method of [<code>toneRhythm</code>](#toneRhythm)  
**Returns**: <code>Array</code> - of start times in Tone's bars/beats format.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arrOfDurations | <code>Array.&lt;string&gt;</code> |  | see README.md API |
| [startTime] | <code>number</code> \| <code>string</code> | <code>0</code> | a start time in Tone's Time format. |

<a name="toneRhythm..mergeMusicDataPart"></a>

### toneRhythm~mergeMusicDataPart(config) ⇒ <code>Array</code>
see [README.md](README.md) for examples and return values.

**Kind**: inner method of [<code>toneRhythm</code>](#toneRhythm)  
**Returns**: <code>Array</code> - of objects for consumption by Tone.Part.
Object properties always include `time` (number|string), array index `idx` (number - integer) and `duration` (string). May also include `notes` and `velocities`. (see readme)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | (see properties below) |
| config.rhythms | <code>Array</code> | see API |
| [config.notes] | <code>Array.&lt;string&gt;</code> | ex: ['C4', 'D4', 'E4'] |
| [config.times] | <code>Array</code> | see return of `getTransportTimes` |
| [config.startTime] | <code>string</code> \| <code>number</code> | see startTime of `getTransportTimes` |

