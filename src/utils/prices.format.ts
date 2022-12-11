export const pricesFormat = (prices: string[]) => {
  if (prices.length === 2) {
    const numPrices = prices.map(price => parseInt(price))
    const min = Math.min(...numPrices)
    const currencyMin = prices[0].split(' ')[1]
    const max = Math.max(...numPrices)
    const currencyMax = prices[1].split(' ')[1]

    return `от ${min} ${currencyMin} до ${max} ${currencyMax}`
  } else if (prices.length === 1) {
    return prices[0]
  }

  return ''
}
