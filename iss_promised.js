const request = require("request-promise-native");

const fetchMyIP = function(body) {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body);
  let url = "https://ipvigilante.com/" + ip.ip;
  return request(url);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  let url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
