export const formatCurrency = (value, currency = '$') => {
  const num = Number(value) || 0;
  const sign = num < 0 ? '-' : '';
  return `${sign}${currency}${Math.abs(num).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatDateShort = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
};

export const generateId = () => `${Date.now()}_${Math.floor(Math.random() * 100000)}`;