import chalk from 'chalk'

type Color = chalk.Chalk | chalk.Chalk[]

export function log(
  message: string,
  color: Color = chalk.white,
  [before, after]: [boolean, boolean] = [true, true]
): void {
  const colors = Array.isArray(color) ? color : [color]

  const coloredMessage = colors.reduce((acc, colorize) => {
    return colorize(acc)
  }, message)

  const args: string[] = []

  if (before) args.push('\n')
  args.push(coloredMessage)
  if (after) args.push('\n')

  console.info(...args)
}
