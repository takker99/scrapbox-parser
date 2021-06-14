import { createNodeParser } from './creator.ts'

import type { CommandLineNode } from './type.ts'
import type { NodeCreator } from './creator.ts'

const commandLineRegExp = /^[$%] .+$/

const createCommandLineNode: NodeCreator<CommandLineNode> = (raw: string) => {
  const symbol = raw[0] ?? ''
  const text = raw.substring(2)

  return {
    type: 'commandLine',
    raw,
    symbol,
    text
  }
}

export const CommandLineNodeParser = createNodeParser(createCommandLineNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [commandLineRegExp]
})
