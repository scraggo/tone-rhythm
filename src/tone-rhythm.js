/*
!!! tone-rhythm 1.0.0
!!! https://github.com/scraggo/tone-rhythm
*/

const getHelp = (errNum) =>
  `See https://github.com/scraggo/tone-rhythm ERROR_CODE_${errNum} for more information.`;

/**
 * Factory to get tone-rhythm methods
 *
 * BREAKING CHANGE IN v1.0.0 - Tone is now a true "peer dependency" and needs to be included here.:
 * @param {Object} ToneTime - import of Tone.Time. example: const ToneTime = require('tone/Tone/type/Time');
 * @returns {Object} - tone-rhythm methods {
    getBarsBeats,
    addTimes,
    getTransportTimes,
    mergeMusicDataPart
  }
 */
const toneRhythm = (ToneTime) => {
  // Handle ToneTime dependency errors
  if (!ToneTime || typeof ToneTime !== 'function') {
    throw new Error(
      `Tone.Time must be passed in as a dependency.\n${getHelp(0)}`
    );
  }
  if (typeof ToneTime().toBarsBeatsSixteenths !== 'function') {
    throw new Error(
      `Tone.Time dependency was not passed in correctly.\n${getHelp(1)}`
    );
  }

  // CONSTANTS
  const roundMeToZero = new Set(['001', '002', '003', '004']);
  const VALID_TYPES = {
    getBarsBeats: new Set(['string', 'number'])
  };

  /**
   * @param {string|number} value - a rhythm value Tone recognizes
   * @return {string} - rhythm value converted to Tone's bars/beats format.
   * @example getBarsBeats('4n') -> '0:1:0'
   */
  const getBarsBeats = (value) => {
    if (!VALID_TYPES.getBarsBeats.has(typeof value)) {
      throw TypeError(
        `Expected type string or type number for value. Got: ${value}`
      );
    }
    const converted = ToneTime(value).toBarsBeatsSixteenths();
    const [prefix, decimal] = converted.split('.');
    if (roundMeToZero.has(decimal)) {
      return prefix;
    }
    return converted;
  };

  /**
   * @param {string[]|string} item
   * if item is array, return summation of items in Tone's bars/beats format.
   *    Note: The first item of the array may be 'r' (rest)
   * @return {string} - if item is an array, returns
   * rhythm value converted to Tone's bars/beats format.
   * If item was a string, it gets returned as is.
   * @example addTimes('4n.') -> '4n.'
   * @example addTimes(['8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n']) -> '1:1:0'
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
   * see [README.md](README.md) for examples
   * @param {string[]} arrOfDurations - see README.md API
   * @param {number|string} [startTime=0] - a start time in Tone's Time format.
   * @return {Array} of start times in Tone's bars/beats format.
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
   * see [README.md](README.md) for examples
   * @param {Object} config (see properties below)
   * @param {Array} config.rhythms - see API
   * @param {string[]} [config.notes] - ex: ['C4', 'D4', 'E4']
   * @param {Array} [config.times] - see return of `getTransportTimes`
   * @param {string|number} [config.startTime] - see startTime of `getTransportTimes`
   * @return {Array} of objects for consumption by Tone.Part.
   * Object properties always include time and duration. May also include notes and velocities.
   */
  const mergeMusicDataPart = (config) => {
    const { notes, rhythms, velocities, startTime } = config;
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
  return {
    getBarsBeats,
    addTimes,
    getTransportTimes,
    mergeMusicDataPart
  };
};

module.exports = toneRhythm;
