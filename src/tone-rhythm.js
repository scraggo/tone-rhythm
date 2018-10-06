const ToneTime = require('tone/Tone/type/Time');

/**
 * tone-rhythm
 * Given an array of rhythms, these methods contribute towards creating an
 * array of Tone.Transport times given an array of musical rhythms in
 * various formats that tone understands.
 * API:
 * Values which can populate a rhythms array:
 * '4n' - a 'notation' value
 * ['4n', '8t'] - an array of 'notation' values which will be added together
 * ['r', '2n'] - an array that has 'r' at first index will be a rest
 * ['r', '2n', '8t'] - (see above about 'r') and the remaining values
 *                      will be added together
 * It's **not** recommended to use Tone's seconds format.
 * see tests for concrete examples
 */

/**
 * Returns a rhythm value converted to Tone's bars/beats format.
 * @param {string} time - a rhythm value Tone recognizes
 */
const getBarsBeats = (value) => {
  const validTypes = new Set(['string', 'number']);
  if (!validTypes.has(typeof value)) {
    throw TypeError('Expected type string or type number.');
  }
  const converted = ToneTime(value).toBarsBeatsSixteenths();
  const [prefix, decimal] = converted.split('.');
  const roundMeToZero = new Set(['001', '002', '003', '004']);
  if (roundMeToZero.has(decimal)) {
    return prefix;
  }
  return converted;
};

/**
 * If item isn't an array, return item.
 * Else if item is array, return summation of items in Tone's bars/beats format.
 *    Note: The first item of the array may be 'r' (rest)
 * @param {array|string} item
 */
const addTimes = (item) => {
  if (!Array.isArray(item)) return item;
  if (item[0] === 'r') item = item.slice(1);
  return item.reduce((acc, cur) => {
    return getBarsBeats(ToneTime(acc) + ToneTime(cur));
  });
};

/**
 * Given an array of durations (see API), return transport times.
 * @param {array} arrOfDurations - see API
 * @param {number|string} startTime - a start time in Tone's Time format.
 */
const getTransportTimes = (arrOfDurations, startTime = 0) => {
  let accumulator = startTime;
  const timesAccumulated = [accumulator];
  arrOfDurations.forEach((time) => {
    if (Array.isArray(time)) {
      accumulator = addTimes([...time, accumulator]);
      if (time[0] === 'r') {
        const lastIdx = timesAccumulated.length - 1;
        timesAccumulated[lastIdx] = accumulator;
      } else {
        timesAccumulated.push(accumulator);
      }
    } else {
      accumulator = addTimes([time, accumulator]);
      timesAccumulated.push(accumulator);
    }
  });
  return timesAccumulated.slice(0, -1);
};

/**
 * Returns array of objects for consumption by Tone.Part
 * @param {object} config - 
 *    required property: {array} rhythms - see API
 *    optional properties:
 *      {array} notes
 *      {array} times
 *      {array} velocities
 *      {string|number} startTime
 */
const mergeMusicDataPart = (config) => {
  const { notes, rhythms, velocities, startTime} = config;
  let { times } = config;
  if (!rhythms || !Array.isArray(rhythms)) {
    throw TypeError('Expected "rhythms" property with type "Array"');
  }
  if (!times) {
    times = getTransportTimes(rhythms, startTime);
  }
  return rhythms.map((rhythm, i) => {
    const musicData = {
      time: times[i],
      duration: addTimes(rhythm)
    };
    if (notes) musicData.note = notes[i];
    if (velocities) musicData.velocity = velocities[i];
    return musicData;
  });
};

module.exports = {
  getBarsBeats,
  addTimes,
  getTransportTimes,
  mergeMusicDataPart
};
