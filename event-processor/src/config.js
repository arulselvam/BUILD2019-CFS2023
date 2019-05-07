require('dotenv').config();
const config = {};

config.eventHubConnectionString = process.env.EVENTHUB_CONNECTION_STRING;
config.eventHubName = process.env.EVENTHUB_NAME;
config.storageConnectionString = process.env.STORAGE_CONNECTION_STRING;
config.storageContainerName = 'ep-checkpoints';

module.exports = config;