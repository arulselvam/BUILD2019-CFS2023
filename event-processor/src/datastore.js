const { CosmosClient } = require("@azure/cosmos");
const endpoint = config.cosmosEndpoint;
const masterKey = config.cosmosKey;
const client = new CosmosClient({ endpoint, auth: { masterKey } });

const { database } = await client.databases.createIfNotExists({ id: 'sampledb' });

const { container } = await database.containers.createIfNotExists({ id: 'telematics' });

async function save(event) {
    const { body } = await container.items.create(event);
    console.log(body);
}

module.exports = { save }
