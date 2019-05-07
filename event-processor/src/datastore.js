const { CosmosClient } = require("@azure/cosmos");
const config = require("./config");
const endpoint = config.cosmosEndpoint;
const masterKey = config.cosmosKey;
const client = new CosmosClient({ endpoint, auth: { masterKey } });

let database = null;
let container = null;
async function init() {
    let result = await client.databases.createIfNotExists({ id: 'sample' });
    database = result.database;

    result = await database.containers.createIfNotExists({ id: 'telematics' });
    container = result.container;
}

async function save(event) {
    const { body } = await container.items.create(event);
}

module.exports = { init, save }
