import amqp from "amqplib";

export class Queue {
  async publish(queue: string, data: any) {
    const connection = await amqp.connect("amqp://rodrigo:rodrigo@localhost");
    const channel = await connection.createChannel();
    channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))
  }

  async consume(queue: string, callback: Function) {
    const connection = await amqp.connect("amqp://rodrigo:rodrigo@localhost");
    const channel = await connection.createChannel();
    channel.assertQueue(queue, { durable: true });
    channel.consume(queue, async (message: any) => {
      const input = JSON.parse(message.content.toString())
      await callback(input)
      channel.ack(message)
    })
  }

}
