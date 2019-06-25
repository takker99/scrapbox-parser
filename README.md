# Scrapbox Parser

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![npm version](https://badge.fury.io/js/%40progfay%2Fscrapbox-parser.svg)](https://badge.fury.io/js/%40progfay%2Fscrapbox-parser) [![Build Status](https://travis-ci.org/progfay/scrapbox-parser.svg?branch=master)](https://travis-ci.org/progfay/scrapbox-parser) [![Coverage Status](https://coveralls.io/repos/github/progfay/scrapbox-parser/badge.svg?branch=master)](https://coveralls.io/github/progfay/scrapbox-parser?branch=master)

parse Scrapbox notation to JavaScript Object

```js
import parse from '@progfay/scrapbox-parser'
import fetch from 'node-fetch'

const PROJECT_NAME = 'help'
const PAGE_NAME = 'syntax'

fetch(`https://scrapbox.io/api/pages/${PROJECT_NAME}/${PAGE_NAME}/text`)
	.then(response => response.text())
	.then(text => parse(text))
```

