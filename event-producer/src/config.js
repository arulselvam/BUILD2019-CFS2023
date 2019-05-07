require('dotenv').config();
const config = {};
config.eventHubConnectionString = process.env.EVENTHUB_CONNECTION_STRING;
config.eventHubName = process.env.EVENTHUB_NAME;
module.exports = config;