export const shuffleArray = (array: Array<any>) =>
    [...array].sort(() => Math.random() - 0.5);