const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add
} = require('../src/math')

test('Should calculate total with tip', () => {
  const total = calculateTip(10, 0.3)

  expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10)

  expect(total).toBe(12)
})

test('Should convert 32F to 0C', () => {
  const degree = fahrenheitToCelsius(32)

  expect(degree).toBe(0)
})

test('Should convert 0C to 32F', () => {
  const degree = celsiusToFahrenheit(0)

  expect(degree).toBe(32)
})

test('Async test demo', done => {
  setTimeout(() => {
    expect(1).toBe(1)
    done()
  }, 100)
})

test('Should add two numbers', done => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5)
    done()
  })
})

test('Should add two numbers async/await', async () => {
  const sum = await add(12, 23)
  expect(sum).toBe(35)
})
