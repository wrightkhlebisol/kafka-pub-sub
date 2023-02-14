const { Kafka } = require('kafkajs');

run();

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["127.0.0.1:9092"]
        })

        const admin = kafka.admin();
        console.log("Connecting......")
        await admin.connect();
        console.log("Connected!!🔗")

        await admin.createTopics({
            topics: [{
                topic: "Users",
                numPartitions: 2
            }]
        })
        console.log("Created Successfully!✅")
        await admin.disconnect();

    } catch (error) {
        console.error(`Something bad happened ${error}`);
    }
    finally {
        process.exit(0)
    }
}