// Utility to generate mock price and probability data
export const generatePriceData = (currentPrice: number, targetPrice: number) => {
  const data = [] as Array<{
    date: string;
    price: number;
    yes: number;
    no: number;
  }>;
  const days = 30;
  const startPrice = currentPrice * 0.85;

  for (let i = 0; i < days; i++) {
    const progress = i / (days - 1);
    const volatility = (Math.random() - 0.5) * 0.1;
    const trend = (targetPrice - startPrice) * progress * 0.3;
    const price = startPrice + trend + startPrice * volatility;

    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.round(price),
      yes: 0.3 + progress * 0.4 + Math.random() * 0.2,
      no: 0.7 - progress * 0.4 - Math.random() * 0.2,
    });
  }

  return data;
};
