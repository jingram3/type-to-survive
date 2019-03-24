export function calculateWpm(startTime: Date, endTime: Date, wordCount: number) {
    const minutes = (endTime.getTime() - startTime.getTime()) / 1000 / 60;
    if (minutes === 0)
        return 0;
    return Math.round(wordCount / minutes);
}