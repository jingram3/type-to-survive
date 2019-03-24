import {calculateWpm} from "../utils/typingUtils";

describe('WPM', function () {
  it('should return 0 when no characters have been typed', function () {
    const wpm = calculateWpm(new Date(), new Date(), 0);
    expect(wpm).toEqual(0);
  });

  it('should return 10 when 10 words have been typed in a minute', function () {
    const startTime = new Date();
    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + 1);
    const wpm = calculateWpm(startTime, endTime, 10);
    expect(wpm).toEqual(10);
  });

  it('should return 100 when 50 words have been typed in 30 seconds', function () {
    const startTime = new Date();
    const endTime = new Date(startTime);
    endTime.setTime(startTime.getTime() + 30 * 1000);
    const wpm = calculateWpm(startTime, endTime, 50);
    expect(wpm).toEqual(100);
  });
});
