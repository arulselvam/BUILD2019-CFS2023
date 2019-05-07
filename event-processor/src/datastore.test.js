const datastore = require('./datastore');

async function main() {
    await datastore.init();
    await datastore.save({
        type: 'Alert'
    });
}

main().catch((error) => {
    console.log(error);
})