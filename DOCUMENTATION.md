# tone-rhythm *1.0.0*



### src/tone-rhythm.js


#### getBarsBeats(value) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `string` `number`  | - a rhythm value Tone recognizes | &nbsp; |




##### Examples

```javascript
getBarsBeats('4n') -> '0:1:0'
```


##### Returns


- `string`  - rhythm value converted to Tone's bars/beats format.



#### addTimes(item) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `Array.<string>` `string`  | if item is array, return summation of items in Tone's bars/beats format.<br>   Note: The first item of the array may be 'r' (rest) | &nbsp; |




##### Examples

```javascript
addTimes('4n') -> '0:1:0'
```
```javascript
addTimes(['8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n']) -> '1:1:0'
```


##### Returns


- `string`  - if item is an array, returns rhythm value converted to Tone's bars/beats format.
If item was a string, it gets returned as is.



#### getTransportTimes(arrOfDurations[, startTime&#x3D;0]) 

Given an array of durations (see API), return transport times.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arrOfDurations | `Array.<string>`  | - see README.md API | &nbsp; |
| startTime&#x3D;0 | `number` `string`  | - a start time in Tone's Time format. | *Optional* |




##### Examples

```javascript
see [README.md](README.md) examples
```


##### Returns


- `Array`  of start times in Tone's bars/beats format.



#### mergeMusicDataPart(config) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| config | `Object`  | (see properties below) | &nbsp; |
| config.rhythms | `Array`  | - see API | &nbsp; |
| config.notes | `Array.<string>`  | - ex: ['C4', 'D4', 'E4'] | *Optional* |
| config.times | `Array`  | - see return of `getTransportTimes` | *Optional* |
| config.startTime | `string` `number`  | - see startTime of `getTransportTimes` | *Optional* |




##### Examples

```javascript
see [README.md](README.md)
```


##### Returns


- `Array`  of objects for consumption by Tone.Part. Object properties always include time and duration. May also include notes and velocities.




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
