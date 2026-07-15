import fs from 'fs';
import readline from 'readline';

async function extract() {
  const fileStream = fs.createReadStream('C:\\Users\\DEPS\\.gemini\\antigravity-ide\\brain\\bcdb17c1-7f5f-4df1-8e81-b6c31ed2734f\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('check_console_errors')) {
      const obj = JSON.parse(line);
      console.log('--- FOUND ENTRY ---');
      console.log(JSON.stringify(obj, null, 2).substring(0, 10000));
    }
  }
}

extract().catch(console.error);
