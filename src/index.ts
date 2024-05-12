// Read config file
const config = require('../config.json');

// For each repository in the config file check the update
config.forEach(repository => {
  console.log(repository);  
});