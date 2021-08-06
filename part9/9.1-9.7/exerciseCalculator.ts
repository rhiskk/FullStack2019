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

export const parseExerciseArguments = (target: string, daily_exercises: Array<string>): ExerciseValues => {
    if (!isNaN(Number(target))) {
        const t = Number(target);
        const e = new Array<number>(daily_exercises.length);
        for (let i = 0; i < daily_exercises.length; i++) {
            if (!isNaN(Number(daily_exercises[i]))) {
                e[i] = Number(daily_exercises[i]);
            } else {
                throw new Error('Provided values were not valid!');
            }
        }
        return { t: t, e: e };
    } else {
        throw new Error('Provided values were not valid!');
    }
};

export const calculateExercises = (e: Array<number>, t: number): Results => {
    const periodLength = e.length;
    const trainingDays = e.filter(e => e > 0).length;
    const average = e.reduce((a, c) => a + c) / periodLength;
    const succes = average >= t;
    let rating = 0;
    let ratingDescription = "";
    if (average < t - 1) {
        rating = 1;
        ratingDescription = "bad";
    } else if (average < t) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 3;
        ratingDescription = "good";
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: succes,
        rating: rating,
        ratingDescription: ratingDescription,
        target: t,
        average: average
    };

};

/*try {
    const { t, e } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(e, t));
} catch (error) {
    console.log('Error, something bad happened, message: ', error.message);
}*/
