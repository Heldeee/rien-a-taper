// resetControlLevel.js

const fs = require('fs');
const cron = require('node-cron');

// Function to reset the control level to 0 for all rer_ arrays
function resetControlLevel() {
    console.log('Resetting control levels...');
    // Load the JSON data from the file
    const jsonData = require('../data/station.json');
    Object.keys(jsonData.rer).forEach(rerKey => {
        // Check if the value corresponding to the key is an array
        if (Array.isArray(jsonData.rer[rerKey])) {
            // Loop through objects in the array
            jsonData.rer[rerKey].forEach((object) => {
                //console.log('Before reset:', object.name, object.control_level);
                // Reset the control level to 0
                object.control_level = 0;
            });
        }
    });

    try {
        // Write the updated JSON data back to the file
        fs.writeFileSync('./src/data/station.json', JSON.stringify(jsonData, null, 2));
        console.log('Control levels reset successfully.');
    } catch (error) {
        console.error('Error writing to JSON file:', error.message);
    }
}

// Schedule the resetControlLevel function to run every 2 hours
cron.schedule('0 */2 * * *', () => {
    resetControlLevel();
});
