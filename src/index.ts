import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';
import dotenv from 'dotenv/config';

const result = await generateText({
  model: groq('openai/gpt-oss-120b'), // Must use supported model
  prompt: 'Hey',
});

console.log(result.content);
