import fs from 'fs';
import readline from 'readline';

async function extract() {
  const fileStream = fs.createReadStream('C:\\Users\\DEPS\\.gemini\\antigravity-ide\\brain\\bcdb17c1-7f5f-4df1-8e81-b6c31ed2734f\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
  for await (const line of rl) {
    const obj = JSON.parse(line);
    if (obj.step_index >= 67 && obj.step_index <= 71) {
      const matches = line.match(uuidRegex);
      console.log(`Index: ${obj.step_index}, Source: ${obj.source}, Type: ${obj.type}, UUIDs:`, matches);
    }
  }
}

extract().catch(console.error);
