/**
 * Currency & Formatting Helpers
 */

export const CURRENCY_SYMBOL = "Rs";

export const formatPrice = (amount) => {
  if (amount === undefined || amount === null) return `${CURRENCY_SYMBOL} 0`;
  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  return `${CURRENCY_SYMBOL} ${num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const generateOrderId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FB-${code}`;
};
