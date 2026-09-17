'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CommandBlockProps {
  command: string
  runners?: boolean
  labels: { copy: string; copied: string; npm: string; pnpm: string }
  className?: string
}

const runnerPrefixes = { npm: 'npx', pnpm: 'pnpm dlx' }

type Runner = keyof typeof runnerPrefixes

export function CommandBlock({ command, runners = false, labels, className }: CommandBlockProps) {
  const [runner, setRunner] = useState<Runner>('npm')
  const [copied, setCopied] = useState(false)

  const shown = runners ? command.replace(/^npx /, `${runnerPrefixes[runner]} `) : command

  async function copy() {
    await navigator.clipboard.writeText(shown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('border border-rule bg-card', className)}>
      {runners && (
        <div className="flex border-b border-rule text-xs">
          {(Object.keys(runnerPrefixes) as Runner[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRunner(option)}
              aria-pressed={runner === option}
              className={cn(
                'border-r border-rule px-3 py-1.5 font-mono',
                runner === option
                  ? 'bg-secondary font-semibold text-navy'
                  : 'text-muted-foreground hover:text-ink',
              )}
            >
              {labels[option]}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-start gap-3 p-3 sm:items-center">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-pre font-mono text-[0.82rem] leading-6 text-ink">
          {shown}
        </code>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-sm border border-rule px-2 py-1 text-xs text-muted-foreground hover:border-brass hover:text-ink"
        >
          <span className="flex items-center gap-1.5">
            {copied ? (
              <Check className="size-3.5 text-brass-ink" aria-hidden="true" />
            ) : (
              <Copy className="size-3.5" aria-hidden="true" />
            )}
            {copied ? labels.copied : labels.copy}
          </span>
        </button>
      </div>
    </div>
  )
}
