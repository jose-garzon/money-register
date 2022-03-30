import { capitalize } from './capitalize'

describe('Capitalize words', () => {
  it('should capitalized the word', () => {
    const response = capitalize('test')
    expect(response).toEqual('Test')
  })
  it('should capitalized the word even if it is already capitalized', () => {
    const response = capitalize('Test')
    expect(response).toEqual('Test')
  })
  it('should capitalized the word if it is capitalized', () => {
    const response = capitalize('TEST')
    expect(response).toEqual('Test')
  })
  it('should capitalized the word everything is uppercase but the first letter', () => {
    const response = capitalize('tEST')
    expect(response).toEqual('Test')
  })
})
