const {
  getBarsBeats,
  addTimes,
  getTransportTimes,
  mergeMusicDataPart
} = toneRhythm; // eslint-disable-line

const expect = chai.expect; // eslint-disable-line 

/* eslint-disable max-len */
const mariaPitches = ["Eb4", "A4", "Bb4", "Eb4", "A4", "Bb4", "C5", "A4", "Bb4", "C5", "A4", "Bb4", "Bb4", "A4", "G4", "F4", "Eb4", "F4", "Bb4", "Ab4", "G4", "F4", "Eb4", "F4", "Eb4", "G4", "Eb4", "A4", "Bb4", "Eb4", "A4", "Bb4", "C5", "A4", "Bb4", "C5", "D5", "Bb4", "D5", "Eb5", "D5", "C5", "Bb4", "D5", "D5", "Eb5", "D5", "C5", "Bb4", "D5", "Eb5", "F5"];

const mariaDurations = ['8n', '8n', ['2n', '4n'], '8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n', ['2n', '4n'], '8n', '8n', '8n', '8n', '8n', ['4n', '8n'], '8n', '8n', '8n', '8n', '8n', '4n', '4n', ['2n', '4n', '8n'], '8n', '8n', ['2n', '4n'], '8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n', ['2n', '4n'], '8n', '8n', '8n', '8n', '8n', ['4n', '8n'], '8n', '8n', '8n', '8n', '8n', '4n', '4n', ['2n', '4n', '8n']];

const mariaDurationsWithRests = ['8n', '16n', ['r', '16n'], '2n', ['r', '4n'], '8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n', ['2n', '4n'], '8n', '8n', '8n', '8n', '8n', ['4n', '8n'], '8n', '8n', '8n', '8n', '8n', '4n', '4n', ['2n', '4n', '8n'], '8n', '8n', ['2n', '4n'], '8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n', ['2n', '4n'], '8n', '8n', '8n', '8n', '8n', ['4n', '8n'], '8n', '8n', '8n', '8n', '8n', '4n', '4n', ['2n', '4n', '8n']];

const mariaTransportTimes = [0, "0:0:2", "0:1:0", "1:0:0", "1:0:2", "1:1:0.667", "1:1:3.334", "1:2:2", "1:3:0.667", "1:3:3.334", "2:0:2", "2:1:0", "3:0:0", "3:0:2", "3:1:0", "3:1:2", "3:2:0", "3:2:2", "4:0:0", "4:0:2", "4:1:0", "4:1:2", "4:2:0", "4:2:2", "4:3:2", "5:0:2", "6:0:0", "6:0:2", "6:1:0", "7:0:0", "7:0:2", "7:1:0.667", "7:1:3.334", "7:2:2", "7:3:0.667", "7:3:3.334", "8:0:2", "8:1:0", "9:0:0", "9:0:2", "9:1:0", "9:1:2", "9:2:0", "9:2:2", "10:0:0", "10:0:2", "10:1:0", "10:1:2", "10:2:0", "10:2:2", "10:3:2", "11:0:2"];

describe('tone-rhythm', () => {
  let testTransportTimes;
  let err = false;
  beforeEach(() => {
    err = false;
  });
  describe('getBarsBeats', () => {
    it('converts as expected', () => {
      expect(typeof getBarsBeats).to.equal('function');
      expect(getBarsBeats('4n')).to.equal('0:1:0');
      expect(getBarsBeats(1)).to.equal('0:2:0');
      expect(getBarsBeats('0:1:0.001')).to.equal('0:1:0');
    });
    it('errors if invalid type', () => {
      try {
        getBarsBeats(['4n']);
      } catch (e) {
        err = true;
      }
      expect(err).to.equal(true);
    });
  });
  describe('addTimes', () => {
    it('addTimes works', () => {
      expect(typeof addTimes).to.equal('function');
      expect(addTimes(['8n', '4t', '4t', '4t', '4t', '4t', '4t', '8n'])).to.equal('1:1:0');
      expect(addTimes('4n.')).to.equal('4n.');
    });
  });
  describe('getTransportTimes', () => {
    it('works as expected', () => {
      expect(typeof getTransportTimes).to.equal('function');
      testTransportTimes = getTransportTimes(mariaDurations);
      expect(testTransportTimes.length).to.equal(mariaDurations.length);
      /** yes, these are equivalent! */
      expect(testTransportTimes).to.deep.equal(mariaTransportTimes);
      expect(getTransportTimes(mariaDurationsWithRests)).to.deep.equal(mariaTransportTimes);
    });
    it('takes a start time', () => {
      testTransportTimes = getTransportTimes(mariaDurations, '0:3:2');
      expect(testTransportTimes[0]).to.deep.equal('0:3:2');
      expect(testTransportTimes.length).to.equal(mariaDurations.length);
    });
  });
  describe('mergeMusicDataPart', () => {
    it('works with just `rhythms` property', () => {
      expect(typeof mergeMusicDataPart).to.equal('function');
      const mergedData = mergeMusicDataPart({
        rhythms: mariaDurations
      });
      expect(mergedData[0]).to.deep.equal({
        time: 0,
        duration: '8n'
      });
    });
    it('works with `times` and `rhythms` properties', () => {
      expect(typeof mergeMusicDataPart).to.equal('function');
      const mergedData = mergeMusicDataPart({
        rhythms: mariaDurations,
        times: mariaTransportTimes
      });
      expect(mergedData[0]).to.deep.equal({
        time: 0,
        duration: '8n'
      });
    });
    it('works with `notes` `times` and `rhythms` properties', () => {
      expect(typeof mergeMusicDataPart).to.equal('function');
      const mergedData = mergeMusicDataPart({
        rhythms: mariaDurations,
        times: mariaTransportTimes,
        notes: mariaPitches
      });
      expect(mergedData[0]).to.deep.equal({
        time: 0,
        duration: '8n',
        note: 'Eb4'
      });
    });
    it('works with `startTime` `notes` and `rhythms` properties', () => {
      expect(typeof mergeMusicDataPart).to.equal('function');
      const mergedData = mergeMusicDataPart({
        rhythms: mariaDurations,
        notes: mariaPitches,
        startTime: '0:3:2'
      });
      expect(mergedData[0]).to.deep.equal({
        time: '0:3:2',
        duration: '8n',
        note: 'Eb4'
      });
    });
    it('ignores `startTime` if `times` are passed in', () => {
      expect(typeof mergeMusicDataPart).to.equal('function');
      const mergedData = mergeMusicDataPart({
        rhythms: mariaDurations,
        times: mariaTransportTimes,
        startTime: '0:3:2'
      });
      expect(mergedData[0]).to.deep.equal({
        time: 0,
        duration: '8n',
      });
    });
    it('errors if `rhythms` aren\'t passed in', () => {
      try {
        mergeMusicDataPart({notes: mariaPitches});
      } catch (e) {
        err = true;
      }
      expect(err).to.equal(true);
    });
  });
});