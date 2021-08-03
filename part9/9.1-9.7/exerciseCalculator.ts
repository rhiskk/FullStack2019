interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseValues {
    t: number,
    e: Array<number>
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 20) throw new Error('Too many arguments');
    if (!isNaN(Number(args[2]))) {
        const t = Number(args[2])
        const e = new Array(args.length - 3)
        for (let i = 3; i < args.length; i++) {
            if (!isNaN(Number(args[i]))) {
                e[i - 3] = Number(args[i])
            } else {
                throw new Error('Provided values were not valid!');
            }
        }
        return {
            t: t,
            e: e
        }
    } else {
        throw new Error('Provided values were not valid!');
    }
}

const calculateExercises = (e: Array<number>, t: number): Results => {
    const periodLength = e.length
    const trainingDays = e.filter(e => e > 0).length
    const average = e.reduce((a, c) => a + c) / periodLength
    const succes = average >= t
    let rating = 0
    let ratingDescription = ""
    if (average < t - 1) {
        rating = 1
        ratingDescription = "bad"
    } else if (average < t) {
        rating = 2
        ratingDescription = "not too bad but could be better"
    } else {
        rating = 3
        ratingDescription = "good"
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: succes,
        rating: rating,
        ratingDescription: ratingDescription,
        target: t,
        average: average
    }

}

try {
    const { t, e } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(e, t))
} catch (error) {
    console.log('Error, something bad happened, message: ', error.message);
}
