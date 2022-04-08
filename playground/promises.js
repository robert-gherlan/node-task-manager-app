const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

add(1, 2)
  .then(result => {
    console.log(result)

    add(result, 5)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.error(error)
      })
  })
  .catch(error => {
    console.error(error)
  })

add(1, 1)
  .then(sum1 => {
    console.log(sum1)
    return add(sum1, 5)
  })
  .then(sum2 => {
    console.log(sum2)
  })
  .catch(error => {
    console.error(error)
  })
