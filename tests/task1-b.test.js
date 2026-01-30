import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { describe, expect, test } from 'vitest';

const execAsync = promisify(exec);

describe('Task 2 - Fetching Data with curl', () => {
  test('should fetch data from the API using curl', async () => {
    const { stdout, stderr } = await execAsync('bash task-1/task1-b.sh');
    if (stderr && !stderr.includes('% Total')) {
      throw new Error(stderr);
    }

    const data = JSON.parse(stdout);
    console.log(data);
    expect(data).toHaveProperty('commonName', 'Netherlands');
  });
});
