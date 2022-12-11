export const dateFormat = (
  date: string,
  { withTime }: { withTime: boolean } = { withTime: false }
) => {
  const temp = date.split('T')[0]
  const splittedDate = temp.split('-')
  const result = splittedDate.reverse().join('.')

  if (withTime) {
    const time = date.split('T')[1]
    const timeResult = time.split(':').slice(0, 2).join(':')

    return `${result} ${timeResult}`
  }
  return result
}
