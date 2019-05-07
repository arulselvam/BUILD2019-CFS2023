require('dotenv').config();
const config = {};

config.eventHubConnectionString = process.env.EVENTHUB_CONNECTION_STRING;
config.eventHubName = process.env.EVENTHUB_NAME;
config.storageConnectionString = process.env.STORAGE_CONNECTION_STRING;
config.storageContainerName = 'ep-checkpoints';
config.cosmosEndpoint = process.env.COSMOSDB_ENDPOINT;
config.cosmosKey = process.env.COSMOSDB_KEY;

module.exports = config;