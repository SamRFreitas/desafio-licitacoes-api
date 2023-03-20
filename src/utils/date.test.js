const date = require('./date.js')

describe('convertStringToValidJsonDate - ', () => {
  test('valid date', () => {
    const r = date.convertStringToValidJsonDate('09/03/2022')
    const expectedDate = new Date('09/03/2022').toJSON()
    expect(r).toStrictEqual(expectedDate)
  })

  test('invalid date', () => {
    const r = date.convertStringToValidJsonDate('-')
    expect(r).toStrictEqual('-')
  })

})