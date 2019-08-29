const { nextISSTimesForMyLocation } = require("./iss_promised");

const printTimes = function(pass) {
  for (let items of pass) {
    const date = new Date(0);
    date.setUTCSeconds(items.risetime);
    const dur = items.duration;
    console.log(`Next pass at ${date} for ${dur} seconds`);
  }
};

nextISSTimesForMyLocation()
  .then(passTimes => {
    printTimes(passTimes);
  })
  .catch(error => {
    console.log("It didn't work: ", error.message);
  });
