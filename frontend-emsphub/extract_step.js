import fs from 'fs';
import readline from 'readline';

async function extract() {
  const fileStream = fs.createReadStream('C:\\Users\\DEPS\\.gemini\\antigravity-ide\\brain\\bcdb17c1-7f5f-4df1-8e81-b6c31ed2734f\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const obj = JSON.parse(line);
    if (obj.step_index === 69) {
      fs.mkdirSync('C:\\Users\\DEPS\\.gemini\\antigravity-ide\\brain\\bcdb17c1-7f5f-4df1-8e81-b6c31ed2734f\\scratch', { recursive: true });
      fs.writeFileSync('C:\\Users\\DEPS\\.gemini\\antigravity-ide\\brain\\bcdb17c1-7f5f-4df1-8e81-b6c31ed2734f\\scratch\\subagent_report.txt', obj.content);
      console.log('Successfully wrote report to scratch/subagent_report.txt');
    }
  }
}

extract().catch(console.error);
