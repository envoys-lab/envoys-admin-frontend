const positive = (x: number) => (x < 0 ? -x : x)
const round = Math.floor

const parse = (time: number) => {
  let tmp = time

  const days = round(tmp / (3600 * 24))
  tmp = tmp % (3600 * 24)

  const hours = round(tmp / 3600)
  tmp = tmp % 3600

  const minutes = round(tmp / 60)
  tmp = tmp % 60

  const seconds = round(tmp)
  tmp = tmp % 1

  return {
    days: positive(days),
    hours: positive(hours),
    minutes: positive(minutes),
    seconds: positive(seconds),

    ago: time < 0 ? true : false,
  }
}

const format = ({
  days,
  hours,
  minutes,
  seconds,
  ago,
}: {
  days: number
  hours: number
  minutes: number
  seconds: number
  ago: boolean
}) => {
  const _ = () => {
    const buff: string[] = []
    days > 0 && buff.push(`${days} days`)
    hours > 0 && buff.push(`${hours} hours`)
    if (buff.length > 1) return buff
    minutes > 0 && buff.push(`${minutes} minutes`)
    if (buff.length > 1) return buff
    seconds > 0 && buff.push(`${seconds} days`)
    return buff
  }
  const buff = _()

  if (ago) return [...buff, 'ago']
  else return ['after', ...buff]
}

const timeFormat = (time: number) => {
  const parsed = parse(time)
  const formated = format(parsed)

  return `${formated.join(' ')}`
}

export default timeFormat
