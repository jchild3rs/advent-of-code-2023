const parse = require('./day-1')

describe('day-1/part-1', () => {
  it('handles the weird ones', () => {
    expect(parse('4fourtwo86tkdkxtwo')).toBe(42)
    expect(parse('sixtwo9tqpqg1fourtwo')).toBe(62)
    expect(parse('jh2mmsdtzktkgoneeightonefive2nine')).toBe(29)
  })
})
