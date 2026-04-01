#!/usr/bin/env node
import { run } from './lib/run.mjs'

const code = await run(process.argv)
process.exit(code)
