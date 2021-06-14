import { createNodeParser } from './creator.ts'

import { convertToNodes } from './index.ts'
import type { DecorationNode } from './type.ts'
import type { NodeCreator } from './creator.ts'

const decorationRegExp = /\[[!"#%&'()*+,\-./{|}<>_~]+ (?:\[[^[\]]+\]|[^\]])+\]/

type DecorationChar =
  | '*'
  | '!'
  | '"'
  | '#'
  | '%'
  | '&'
  | "'"
  | '('
  | ')'
  | '+'
  | ','
  | '-'
  | '.'
  | '/'
  | '{'
  | '|'
  | '}'
  | '<'
  | '>'
  | '_'
  | '~'

type AsteriskDecorationChar =
  | '*-1'
  | '*-2'
  | '*-3'
  | '*-4'
  | '*-5'
  | '*-6'
  | '*-7'
  | '*-8'
  | '*-9'
  | '*-10'

export type Decoration = Exclude<DecorationChar, '*'> | AsteriskDecorationChar

const createDecorationNode: NodeCreator<DecorationNode> = (raw, opts) => {
  const separatorIndex = raw.indexOf(' ')
  const rawDecos = raw.substring(1, separatorIndex)
  const text = raw.substring(separatorIndex + 1, raw.length - 1)

  const decoSet = new Set<string>(rawDecos)
  if (decoSet.has('*')) {
    const asteriskCount = rawDecos.split('*').length - 1
    decoSet.delete('*')
    decoSet.add(`*-${Math.min(asteriskCount, 10)}` as AsteriskDecorationChar)
  }

  return {
    type: 'decoration',
    raw,
    rawDecos,
    decos: Array.from(decoSet) as Decoration[],
    nodes: convertToNodes(text, { ...opts, nested: true })
  }
}

export const DecorationNodeParser = createNodeParser(createDecorationNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [decorationRegExp]
})
