import { describe, expect, it } from 'vitest';
import { generatePriceData } from '../utils/generatePriceData';

describe('generatePriceData', () => {
  it('should return 30 days of data', () => {
    const data = generatePriceData(100, 150);
    expect(data).toHaveLength(30);
  });
});
