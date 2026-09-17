import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  agentRules: false,
  redirects() {
    return Promise.resolve([{ source: '/', destination: '/en', permanent: false }])
  },
  // The documents are read from disk while the pages are generated, so the trace has to carry them.
  outputFileTracingIncludes: {
    '/**': ['./content/fetched/**'],
  },
}

export default nextConfig
