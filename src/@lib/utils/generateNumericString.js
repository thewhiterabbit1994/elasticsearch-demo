const generateSingleDigitNumber = () => Math.floor(Math.random() * 10)

export default length => {

  return Array.from({
    length
  }).reduce((acc, _, i) => {

    const digit = generateSingleDigitNumber()

    const shouldChange = i === 0 && digit === 0

    // for test purposes, remove this later
    return acc += '1'
    return acc += (shouldChange ? 1 : digit)
  }, '')

}