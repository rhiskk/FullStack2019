interface BmiValues {
    h: number,
    w: number
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !(Number(args[2]) <= 0) && !isNaN(Number(args[3])) && !(Number(args[3]) <= 0)) {
        return {
            h: Number(args[2]) / 100,
            w: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not valid numbers!');
    }
}

const calculateBmi = (h: number, w: number): string => {
    const bmi = w / h / h
    if (bmi < 18.4) {
        return "Underweight"
    } else if (bmi < 25) {
        return "Normal (healthy weight)"
    } else if (bmi < 30) {
        return "Overweight"
    } else {
        return "Obese"
    }
}

try {
    const { h, w } = parseBmiArguments(process.argv);
    console.log(calculateBmi(h, w))
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
