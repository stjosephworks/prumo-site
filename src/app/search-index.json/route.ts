import { buildSearchIndex } from '@/features/docs/search-index'

export const dynamic = 'force-static'

export async function GET() {
  return Response.json(await buildSearchIndex())
}
