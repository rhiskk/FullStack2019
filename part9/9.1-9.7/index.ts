import express from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
import { calculateExercises, parseExerciseArguments } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { h, weight } = parseBmiArguments([String(req.query.height), String(req.query.weight)]);
    const bmi = calculateBmi(h, weight);
    const height = h * 100;
    res.send({ weight, height, bmi });
  } catch {
    res.send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!target || !daily_exercises) {
    res.send({ error: "parameters missing" });
    return;
  }
  try {
    const { t, e } = parseExerciseArguments(target, daily_exercises);
    res.send(calculateExercises(e, t));
  } catch {
    res.send({ error: "malformatted parameters" });
  }

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});