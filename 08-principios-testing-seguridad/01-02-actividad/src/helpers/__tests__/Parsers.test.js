import { likesParser, cooldownParser } from '../Parsers';

describe('likesParser helpers', () => {
  it('To be the same number & typeof number under 1000', () => {
    const numbers = [-1, 0, 1, 100, 999];

    numbers.forEach(num => {
      const result = likesParser(num);
      expect(result).toBe(num);
      expect(typeof result).toBe('number');
    })
  });

  it('To be the a string from 1000', () => {
    const numbers = [1000, 10000, 123123];

    numbers.forEach(num => {
      const result = likesParser(num);
      expect(typeof result).toBe('string');
    })
  });

  it('To has K letter over 1000', () => {
    const numbers = [1000, 10000, 123123];

    numbers.forEach(num => {
      const result = likesParser(num);
      expect(result.includes('K')).toBe(true);
    })
  });
});

describe('cooldownParser helpers', () => {
  const minuteMs = 1000 * 60 // ms second * seconds
  const hourMs = minuteMs * 60; // ms minute * minutes
  const dayMs = hourMs * 24; // ms hour * hours

  it('To parse "1 minute" cooldown', () => {
    const currentDateMs = new Date().getTime();
    const timeMs = currentDateMs - minuteMs;
    const time = new Date(timeMs);

    expect(cooldownParser(time)).toBe('1 minute');
  });

  it('To parse "X minutes" cooldown (less than hour)', () => {
    const minutes = [3, 23, 58];

    minutes.forEach(minute => {
      const currentDateMs = new Date().getTime();
      const timeMs = currentDateMs - (minuteMs * minute);
      const time = new Date(timeMs);
      expect(cooldownParser(time)).toBe(`${minute} minutes`);
    })
  });

  it('To parse "1 hour" cooldown', () => {
    const currentDateMs = new Date().getTime();
    const timeMs = currentDateMs - hourMs;
    const time = new Date(timeMs);

    expect(cooldownParser(time)).toBe('1 hour');
  });

  it('To parse "X hours" cooldown (less than day)', () => {
    const hours = [2, 7, 18];

    hours.forEach(hour => {
      const currentDateMs = new Date().getTime();
      const timeMs = currentDateMs - (hourMs * hour);
      const time = new Date(timeMs);
      expect(cooldownParser(time)).toBe(`${hour} hours`);
    })
  });

  it('To parse "1 day" cooldown', () => {
    const currentDateMs = new Date().getTime();
    const timeMs = currentDateMs - dayMs;
    const time = new Date(timeMs);

    expect(cooldownParser(time)).toBe('1 day');
  });

  it('To parse "X days" cooldown (plus than one day)', () => {
    const days = [7, 14, 28];

    days.forEach(day => {
      const currentDateMs = new Date().getTime();
      const timeMs = currentDateMs - (dayMs * day);
      const time = new Date(timeMs);
      expect(cooldownParser(time)).toBe(`${day} days`);
    })
  });
});
