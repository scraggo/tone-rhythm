const getHelp = (errNum) =>
  `See https://github.com/scraggo/tone-rhythm ERROR_CODE_${errNum} for more information.`;

// Handle ToneTime dependency errors
const validateDeps = (ToneTime) => {
  if (!ToneTime || typeof ToneTime !== 'function') {
    throw new Error(
      `Tone.Time must be passed in as a dependency.\n${getHelp(0)}`
    );
  }
  if (typeof ToneTime().toBarsBeatsSixteenths !== 'function') {
    throw new Error(
      `Tone.Time dependency has invalid or unexpected API.\n${getHelp(1)}`
    );
  }
};

module.exports = {
  validateDeps,
};
