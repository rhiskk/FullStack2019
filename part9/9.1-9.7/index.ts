import express from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    let { height, weight } = parseBmiArguments([String(req.query.height), String(req.query.weight)]);
    const bmi = calculateBmi(height, weight)
    height = height*100
    res.send({ weight, height, bmi })
} catch (e) {
    res.send({ error: 'malformatted parameters' })
}

})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});