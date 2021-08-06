interface BmiValues {
    h: number,
    weight: number
}

export const parseBmiArguments = (args: Array<string>): BmiValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');

    if (!isNaN(Number(args[0])) && !(Number(args[0]) <= 0) && !isNaN(Number(args[1])) && !(Number(args[1]) <= 0)) {
        return {
            h: Number(args[0]) / 100,
            weight: Number(args[1])
        };
    } else {
        throw new Error('Provided values were not valid numbers!');
    }
};

export const calculateBmi = (h: number, w: number): string => {
    const bmi = w / h / h;
    if (bmi < 18.4) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
};

/*try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}*/