import { QuoteNodeType, QuoteNodeParser } from './QuoteNode'
import { StrongNodeType, StrongNodeParser } from './StrongNode'
import { DecorationNodeType, DecorationNodeParser } from './DecorationNode'
import { CodeNodeType, CodeNodeParser } from './CodeNode'
import { UrlNodeType, UrlNodeParser } from './UrlNode'
import { InternalLinkNodeType, InternalLinkNodeParser } from './InternalLinkNode'
import { IconNodeType, IconNodeParser } from './IconNode'
import { HashTagNodeType, HashTagNodeParser } from './HashTagNode'
import { PlainNodeType, PlainNodeParser } from './PlainNode'

export type LineNodeType = QuoteNodeType
                         | StrongNodeType
                         | DecorationNodeType
                         | CodeNodeType
                         | UrlNodeType
                         | InternalLinkNodeType
                         | IconNodeType
                         | HashTagNodeType
                         | PlainNodeType

export type ParserOptionType = {
  nested: boolean
  quoted: boolean
}
export type NextParserType = () => LineNodeType[]
export type ParserType = (text: string, opt: ParserOptionType, next: NextParserType) => LineNodeType[]

const FalsyEliminator: ParserType = (text, _opt, next) => {
  if (!text) return []
  return next()
}

const combineNodeParsers = (...parsers: ParserType[]) => {
  return (text: string = '', opt: ParserOptionType = { nested: false, quoted: false }): LineNodeType[] => (
    parsers.slice().reverse().reduce(
      (acc: NextParserType, parser: ParserType): NextParserType => () => parser(text, opt, acc),
      () => PlainNodeParser(text)
    )()
  )
}

export const convertToLineNodes = combineNodeParsers(
  FalsyEliminator,
  QuoteNodeParser,
  CodeNodeParser,
  StrongNodeParser,
  UrlNodeParser,
  DecorationNodeParser,
  IconNodeParser,
  InternalLinkNodeParser,
  HashTagNodeParser
)
