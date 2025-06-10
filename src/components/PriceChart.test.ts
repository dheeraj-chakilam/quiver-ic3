import { describe, it, expect } from 'vitest';
import { generatePriceData } from './PriceChart';

describe('generatePriceData', () => {
  it('returns an array of length 30', () => {
    const data = generatePriceData(100, 150);
    expect(data).toHaveLength(30);
  });

  it('each entry contains date, price, yes, and no', () => {
    const data = generatePriceData(100, 150);
    data.forEach((entry) => {
      expect(entry).toHaveProperty('date');
      expect(entry).toHaveProperty('price');
      expect(entry).toHaveProperty('yes');
      expect(entry).toHaveProperty('no');
    });
  });
});
