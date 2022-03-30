import { currencyFormatter } from './moneyFormatter'

describe('format currency to COP format', () => {
  it('should format correctly', () => {
    const response = currencyFormatter(1000)
    expect(response).toEqual('$ 1.000')
  })
  it('should format without decimals', () => {
    const response = currencyFormatter(1000.45)
    expect(response).toEqual('$ 1.000')
  })
})
