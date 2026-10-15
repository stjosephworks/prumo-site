import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const target = join(root, 'content', 'fetched')

const manifest = JSON.parse(await readFile(join(root, 'content', 'documents.json'), 'utf8'))

function urlFor(document) {
  const source = manifest.sources[document.source]
  if (!source) throw new Error(`${document.slug}: no source named ${document.source}`)
  return `https://raw.githubusercontent.com/${source.repo}/${source.commit}/${document.path}`
}

async function download(document) {
  const url = urlFor(document)
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${document.slug}: ${response.status} from ${url}`)
  const markdown = await response.text()
  await writeFile(join(target, `${document.slug}.md`), markdown)
  return markdown.length
}

await mkdir(target, { recursive: true })

const results = await Promise.allSettled(manifest.documents.map(download))
const failures = results.flatMap((result, index) =>
  result.status === 'rejected'
    ? [`  ${manifest.documents[index].slug}: ${result.reason.message}`]
    : [],
)

if (failures.length > 0) {
  console.error(`Could not fetch ${failures.length} of ${manifest.documents.length} documents:`)
  console.error(failures.join('\n'))
  process.exit(1)
}

// The versions shown on the site are the ones the pinned commits publish, not numbers kept by hand
// here that nobody would notice going stale.
async function versionAt(source, file) {
  const url = `https://raw.githubusercontent.com/${source.repo}/${source.commit}/${file}`
  const response = await fetch(url)
  if (!response.ok) {
    console.error(`Could not read a version: ${response.status} from ${url}`)
    process.exit(1)
  }
  return JSON.parse(await response.text()).version
}

const version = await versionAt(manifest.sources.prumo, 'cli/package.json')
const desktop = await versionAt(manifest.sources['prumo-desktop'], 'package.json')
await writeFile(
  join(target, 'versions.json'),
  `${JSON.stringify({ cli: version, desktop }, null, 2)}\n`,
)

const bytes = results.reduce((total, result) => total + result.value, 0)
console.log(
  `Fetched ${manifest.documents.length} documents, ${Math.round(bytes / 1024)} KB, describing CLI ${version} and Desktop ${desktop}.`,
)
