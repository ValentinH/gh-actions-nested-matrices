const fs = require('fs')

const targetPathMap = {
  'web': './apps/web',
  'docs': './apps/docs',
  'ui': './packages/ui',
}

async function main () {
  const target = process.argv[2]
  const basePath = targetPathMap[target]
  if (!basePath) {
    throw new Error('Unknown target: ' + target)
  }
  const files = await fs.readdirSync(`${basePath}/tests`)
  console.log(JSON.stringify(files))
}

main()
