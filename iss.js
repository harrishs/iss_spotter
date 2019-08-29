const request = require("request");
let ip;
const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      let ipP = JSON.parse(body);
      ip = ipP.ip;
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let url = "https://ipvigilante.com/" + ip;
  let lat, long, parsed;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      parsed = JSON.parse(body);
      long = parsed.data.longitude;
      lat = parsed.data.latitude;
      let result = { latitude: lat, longitude: long };
      callback(null, result);
    }
  });
};
module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
