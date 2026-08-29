import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/* Guards the publish directory.
 *
 * docs/ is what GitHub Pages serves, and internal planning documents were once
 * committed into it and served publicly from the production URL. Anything that
 * isn't a web asset now fails the build rather than shipping. */
const BANNED = /\.(md|zip|psd|sketch|fig|key|pem|env|sql)$/i
const errors = []

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (BANNED.test(name)) errors.push(p)
    else if (statSync(p).isDirectory()) walk(p)
  }
}

walk('dist')

if (errors.length) {
  console.error('Refusing to publish. These do not belong in the deploy folder:')
  errors.forEach((e) => console.error('  ' + e))
  process.exit(1)
}
console.log('dist/ clean — no documents or secrets in the publish directory.')
