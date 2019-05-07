const { EventProcessorHost } = require("@azure/event-processor-host");
const datastore = require("./datastore");
const config = require('./config');


async function main() {
    const ephName = EventProcessorHost.createHostName('ep');
    const eph = EventProcessorHost.createFromConnectionString(
        ephName,
        config.storageConnectionString,
        config.storageContainerName,
        config.eventHubConnectionString,
        {
            eventHubPath: config.eventHubName,

            onEphError: (error) => {
                console.log(error);
            }
        }
    );

    let count = 0;
    const onMessage = async (partitionContext, eventData) => {
        let event = eventData.body;
        if (event.speed > 80) {
            let speedingEvent = {
                speed: event.speed,
                serialNumber: event.serialNumber,
                timestamp: event.timestamp
            };
            await datastore.save(speedingEvent);
            console.log('Created speeding event');
        }
        if (count % 100 === 0) {
            return await partitionContext.checkpointFromEventData(eventData);
        }
    };

    const onError = (error) => {
        console.log(error);
    };

    await eph.start(onMessage, onError);
}

process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    await eph.stop();
});

main().catch((error) => {
    console.log(error);
});