import { mapIndexToTop, mapIndexToBottom } from '../src/utils'
import { expect } from 'chai'

const max = 2

describe('mapIndexToTop', () => {
  it('should return 0 when index is 0 or 2n times of max', () => {
    expect(mapIndexToTop(0, max)).to.equal(0)
    expect(mapIndexToTop(2 * max, max)).to.equal(0)
  })

  it('should match y = x, when x belong to (0, max)', () => {
    expect(mapIndexToTop(1, max)).to.equal(1)
  })

  it('should match y = -x + 2 * max, when x belong to (max, 2max)', () => {
    expect(mapIndexToTop(3, max)).to.equal(1)
  })

  it('should throw TypeError when index or max is not a number', () => {
    expect(() => mapIndexToTop('string')).to.throw(TypeError)
    expect(() => mapIndexToTop(1, 'string')).to.throw(TypeError)
  })
})


describe('mapIndexToBottom', () => {
  it('should match y = max - mapIndexToTop(max)', () => {
    expect(mapIndexToBottom(-2, max)).to.equal(0)
    expect(mapIndexToBottom(2, max)).to.equal(0)

    expect(mapIndexToBottom(-1, max)).to.equal(1)
    expect(mapIndexToBottom(1, max)).to.equal(1)

    expect(mapIndexToBottom(0, max)).to.equal(2)
  })
})
