export const formatPrice = (amount: number | string | undefined | null): string => {
  if (amount === undefined || amount === null || amount === '') return '₹0';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₹0';
  return `₹${Math.round(num).toLocaleString('en-IN')}`;
};

export const formatPriceDecimal = (amount: number | string | undefined | null): string => {
  if (amount === undefined || amount === null || amount === '') return '₹0.00';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₹0.00';
  return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};
