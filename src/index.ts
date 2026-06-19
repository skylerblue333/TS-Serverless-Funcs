import express from 'express';
import { z } from 'zod';

export const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'TS-Serverless-Funcs' });
});

const FuncSchema = z.object({
  name: z.string(),
  env: z.record(z.string()).optional()
});

const functions: string[] = [];

app.post('/api/deploy', (req, res) => {
  try {
    const data = FuncSchema.parse(req.body);
    functions.push(data.name);
    res.json({ status: 'deployed', function: data.name });
  } catch (e) {
    res.status(400).json({ error: 'Invalid function config' });
  }
});


if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
