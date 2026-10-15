import type { DesktopSystem } from '@/lib/desktop'

// Classes keyed to the system VisitorSystem marks, spelled out whole so Tailwind finds every one of them.
export const visitorTone: Record<DesktopSystem, { row: string; tag: string; link: string }> = {
  macos: {
    row: 'group-data-[visitor=macos]/downloads:border-l-brass',
    tag: 'group-data-[visitor=macos]/downloads:inline-block',
    link: 'group-data-[visitor=macos]/downloads:bg-navy group-data-[visitor=macos]/downloads:text-primary-foreground',
  },
  linux: {
    row: 'group-data-[visitor=linux]/downloads:border-l-brass',
    tag: 'group-data-[visitor=linux]/downloads:inline-block',
    link: 'group-data-[visitor=linux]/downloads:bg-navy group-data-[visitor=linux]/downloads:text-primary-foreground',
  },
  windows: {
    row: 'group-data-[visitor=windows]/downloads:border-l-brass',
    tag: 'group-data-[visitor=windows]/downloads:inline-block',
    link: 'group-data-[visitor=windows]/downloads:bg-navy group-data-[visitor=windows]/downloads:text-primary-foreground',
  },
}
