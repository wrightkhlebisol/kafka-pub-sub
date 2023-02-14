const { Kafka } = require('kafkajs');

const groupId = process.argv[2];
run();

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["127.0.0.1:9092"]
        })

        const consumer = kafka.consumer({
            groupId
        });
        console.log("Connecting......")
        await consumer.connect();
        console.log("Connected!!🔗")

        await consumer.subscribe({
            fromBeginning: true,
            topic: "Users"
        })

        await consumer.run({
            eachMessage: async result => {
                console.log(`RVD Msg ${result?.message.value} from partition ${result?.partition}`)
            }
        })
    } catch (error) {
        console.error(`Something bad happened ${error}`);
    } finally { }
}