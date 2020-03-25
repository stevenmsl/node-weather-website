const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const token = "5dc566f47617f0d2141ae7281982bc59";
  const url = `https://api.darksky.net/forecast/${token}/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // low level error such as network errors
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { summary, temperatureHigh, temperatureLow } = body.daily.data[0];
      const { temperature } = body.currently;
      callback(
        undefined,
        `${summary} It is currently ${temperature} degress out. The high today is ${temperatureHigh} with a low of ${temperatureLow}.`
      );
    }
  });
};

module.exports = forecast;
