import { Redis } from 'ioredis';
import { transporter } from '../config/mailer.js';

const redis = new Redis({ host: 'localhost', port: 6379 });

const STREAM = 'note.created';
const GROUP = 'notification-group';
const CONSUMER = 'notif-worker-1';

const parseMessage = (fields: string[]) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < fields.length; i += 2) {
        const key = fields[i];
        const value = fields[i + 1];
        if (key === undefined || value === undefined) continue;
        obj[key] = value;
    }
    return obj;
};

export const startConsumer = async () => {
    // Create consumer group (ignore error if already exists)
    try {
        await redis.xgroup('CREATE', STREAM, GROUP, '0', 'MKSTREAM');
    } catch (_) { }

    console.log('Notification consumer started, waiting for events...');

    while (true) {
        const results = await redis.xreadgroup(
            'GROUP', GROUP, CONSUMER,
            'COUNT', '10',
            'BLOCK', '5000',   // block 5s waiting for messages
            'STREAMS', STREAM, '>'
        ) as any;

        if (!results) continue;

        for (const [, messages] of results) {
            for (const [id, fields] of messages) {
                const { noteId, title, userEmail } = parseMessage(fields);


                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: userEmail,
                    subject: 'Note created successfully',
                    html: `<h2>Your note "${title}" was saved!</h2><p>Note ID: ${noteId}</p>`,
                });


                console.log(`Email sent to ${userEmail} for note: ${noteId}`);

                // Acknowledge message — remove from pending
                await redis.xack(STREAM, GROUP, id);
            }
        }
    }
};