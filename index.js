const { nextISSTimesforMyLocation } = require("./iss");

const printTimes = function(pass) {
  for (let items of pass) {
    const date = new Date(0);
    date.setUTCSeconds(items.risetime);
    const dur = items.duration;
    console.log(`Next pass at ${date} for ${dur} seconds`);
  }
};

nextISSTimesforMyLocation((error, passTimes) => {
  if (error) {
    console.log("Error: ", error);
  } else {
    printTimes(passTimes);
  }
});
