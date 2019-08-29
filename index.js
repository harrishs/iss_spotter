// const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("Error fetching ip: " + error);
//   } else {
//     console.log("Returned IP: " + ip);
//   }
// });

fetchCoordsByIP("66.207.199.230", (error, longLat) => {
  if (error) {
    console.log("Error fetching longitude and latitude: " + error);
    return;
  } else {
    console.log("Returned coordinates: " + longLat);
  }
});
