import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  agentRules: false,
  // The documents are read from disk while the pages are generated, so the trace has to carry them.
  outputFileTracingIncludes: {
    '/**': ['./content/fetched/**'],
  },
}

export default nextConfig
