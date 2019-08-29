const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      let ipP = JSON.parse(body);
      let ip = ipP.ip;
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
    } else {
      parsed = JSON.parse(body);
      long = parsed.data.longitude;
      lat = parsed.data.latitude;
      let result = { latitude: lat, longitude: long };
      callback(null, result);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let lat = coords.latitude;
  let long = coords.longitude;
  let url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      let result = JSON.parse(body);
      callback(null, result.response);
    }
  });
};

const nextISSTimesforMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
    } else {
      fetchCoordsByIP(ip, (error, coord) => {
        if (error) {
          callback(error, null);
        } else {
          fetchISSFlyOverTimes(coord, (error, passTimes) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, passTimes);
            }
          });
        }
      });
    }
  });
};

module.exports = { nextISSTimesforMyLocation };
