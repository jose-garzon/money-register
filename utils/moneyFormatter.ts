const currencyFormatter = (value: number) => {
  const formatted = value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return formatted.replace(/\xA0/g, ' ')
}

export { currencyFormatter }
