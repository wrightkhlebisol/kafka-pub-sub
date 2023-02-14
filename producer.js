const { Kafka } = require('kafkajs');
const msg = process.argv[2];
run();

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["127.0.0.1:9092"]
        })

        const producer = kafka.producer();
        console.log("Connecting......")
        await producer.connect();
        console.log("Connected!!🔗")

        const partition = msg[0] < 'M' ? 0 : 1;
        producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })
        console.log("Send Successfully!")
        await producer.disconnect();

    } catch (error) {
        console.error(`Something bad happened ${error}`);
    }
}