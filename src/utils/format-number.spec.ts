import { formatNumber } from './format-number';

describe('formatNumber', () => {

  it('should format numbers greater than or equal to 1 million to M notation', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(2500000)).toBe('2.5M');
    expect(formatNumber(10000000)).toBe('10.0M');
  });

  it('should format numbers greater than or equal to 1 thousand and less than 1 million to k notation', () => {
    expect(formatNumber(1000)).toBe('1.0k');
    expect(formatNumber(2500)).toBe('2.5k');
    expect(formatNumber(999999)).toBe('1000.0k');
  });

  it('should return the number as a string for numbers less than 1 thousand', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(1)).toBe('1');
    expect(formatNumber(999)).toBe('999');
  });

});

