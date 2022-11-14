const progressPercent = (min: number, curr: number): number => {
  const percentage = Math.round((curr / min) * 100);
  return percentage > 100 ? 100 : percentage;
};

const tokenImageTransformer = (tokenName: string): string => {
  return `/assets/${tokenName.toLowerCase()}.png`;
};

const toUSDCurrencyString = (price: number | string): string => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export { progressPercent, tokenImageTransformer, toUSDCurrencyString };
