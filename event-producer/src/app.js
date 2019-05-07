const { EventHubClient } = require('@azure/event-hubs');
const events = require('./events.json');
const _ = require('lodash');
const hashFn = require('string-hash');
const config = require('./config');

let eventHubClient = null;
let partitionCount = null;
let batchSize = 100;

async function init() {
    eventHubClient = EventHubClient.createFromConnectionString(config.eventHubConnectionString,
        config.eventHubName);
    let eventHubInfo = await eventHubClient.getHubRuntimeInformation();
    partitionCount = eventHubInfo.partitionCount;
}

async function main() {
    try {
        await init();
        let eventsByPartitionId = _.groupBy(events,
            (event) => (hashFn(event.serialNumber) % partitionCount).toString()
        );

        for (let partitionId of Object.keys(eventsByPartitionId)) {
            let batches = _.chunk(eventsByPartitionId[partitionId], batchSize);
            for (let batch of batches) {
                let messages = batch.map(message => { return { body: message } });
                await eventHubClient.sendBatch(messages, partitionId);
                console.log(`Sent ${batch.length} events to partition${partitionId}`);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

main()