import dotenv from 'dotenv';
import { startConsumer } from './queue/consumer.js';

dotenv.config();
startConsumer().catch(console.error);