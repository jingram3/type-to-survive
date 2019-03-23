export function calculateWpm(startTime, endTime, wordCount) {
    const minutes = (endTime - startTime) / 1000 / 60;
    if (minutes === 0)
        return 0;
    return Math.round(wordCount / minutes);
}