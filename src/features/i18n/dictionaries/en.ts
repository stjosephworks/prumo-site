import { commands } from '@/lib/commands'
import { desktopVersion } from '@/lib/desktop'

export interface StatusItem {
  state: 'done' | 'next' | 'later'
  heading: string
  body: string
}

export const en = {
  nav: {
    start: 'Get started',
    concepts: 'Conventions',
    commands: 'Commands',
    desktop: 'Desktop',
    documents: 'Documents',
    github: 'GitHub',
    skipToContent: 'Skip to content',
    language: 'Language',
    menu: 'Menu',
  },
  common: {
    copy: 'Copy',
    copied: 'Copied',
    npm: 'npm',
    pnpm: 'pnpm',
    onThisPage: 'On this page',
    readOnGithub: 'Read this file on GitHub',
    beta: 'Beta',
  },
  search: {
    open: 'Search the documents',
    placeholder: 'Search every heading',
    empty: 'Nothing matches that yet.',
    hint: 'Searches every heading in the documentation.',
    close: 'Close',
    resultsOne: '1 result',
    resultsMany: '{count} results',
  },
  home: {
    title: 'Prumo',
    description:
      'Prumo starts a TypeScript project with the framework, the database rules and the test boundaries already chosen, and writes every one of them into the project.',
    headline: 'The decisions are already made.',
    headlineSecond: 'And written down.',
    standfirst:
      'Prumo starts a TypeScript project with the framework, the module layout, the database rules, the auth wiring and the test boundaries already chosen. Each one was decided once, written into the project that receives it, and turned into something that runs.',
    commandCaption: 'Node 22.23.4 or later and pnpm 10.26 or later, on macOS, Linux or Windows.',
    readDocuments: 'Read the documents',
    paths: {
      or: 'or',
      cli: {
        heading: 'From the terminal',
        body: 'One command asks what to build and writes the project.',
      },
      desktop: {
        heading: 'With Prumo Desktop',
        body: 'The same CLI in an app that creates, lists and runs your projects, on macOS, Linux and Windows.',
        yourSystem: 'Your system',
        hints: {
          macosUnsigned: 'Unsigned: confirm it once with Open Anyway.',
          macosSigned: 'Signed and notarised by Apple.',
          linux: 'Unsigned: install it with apt or dnf.',
          windows: 'Unsigned: More info, then Run anyway. Blocked where Smart App Control is on.',
        },
        previewNote: `Unsigned previews of version ${desktopVersion}. Every build needs Node 22.23.4 or later and pnpm 10.26 or later.`,
        previewLink: 'How to install',
        signedNote:
          'The macOS build is signed and notarised; the Linux and Windows builds are not. Every build needs Node 22.23.4 or later and pnpm 10.26 or later.',
        signedLink: 'About Prumo Desktop',
      },
    },
    arrives: {
      heading: 'A new project arrives with two things',
      code: {
        term: 'Code that already works',
        detail:
          'Installed, wired together, and proven by starting rather than by compiling. Every template is committed in full and none of them calls somebody else’s scaffolder at install time.',
      },
      conventions: {
        term: 'The conventions it follows',
        detail:
          'A .prumo/ folder holding the rules that code obeys. Any AI assistant working in the repository reads it and knows them without anyone explaining. The conventions live in the project, not in someone’s head.',
      },
      caption: 'An excerpt of a project generated with --types api,web',
    },
    types: {
      heading: 'Three types, and what each one is made of',
      note: 'One type produces that project alone. Several produce a pnpm workspace, with the wire contract shared so a change on one side breaks the other at typecheck.',
      rows: [
        {
          type: 'api',
          role: 'The server',
          parts: [
            'Fastify with a domain/infra structure',
            'tsyringe and Zod',
            'MikroORM on PostgreSQL',
            'Its own JWT authentication',
            'Swagger UI',
            'Vitest with Testcontainers',
          ],
        },
        {
          type: 'web',
          role: 'The browser app',
          parts: [
            'Vite, Next or Astro, with React',
            'The same sign-in on each',
            'Tailwind and shadcn/ui',
            'Forms validated with Zod',
          ],
        },
        {
          type: 'mobile',
          role: 'The phone app',
          parts: [
            'Expo with Expo Router',
            'NativeWind and MMKV',
            'Tokens kept in expo-secure-store',
            'Run in a development build',
          ],
        },
      ],
    },
    silence: {
      heading: 'Nothing important is decided by silence',
      body: 'Every question the CLI asks also has a flag, which is how it runs in CI without a terminal. Outside an interactive terminal a missing answer is an error rather than a default.',
    },
    record: {
      heading: 'The stack is locked, and says so',
      body: 'One document names every package, every version floor and the nineteen entries that were deliberately dropped. It is written to be treated as given: a generated project inherits it whole, and nothing is left to be settled again per project.',
      link: 'Open the locked stack',
    },
    desktop: {
      heading: 'Prumo Desktop',
      body: `A desktop application that creates Prumo projects, lists them, reads their conventions and runs their apps. Version ${desktopVersion}, an unsigned preview for macOS, Linux and Windows, can be downloaded.`,
      link: 'See where it stands',
    },
  },
  start: {
    title: 'Get started',
    description:
      'Check the machine, generate a project, and see what landed. Four steps, with the flag for every question.',
    heading: 'Get started',
    standfirst:
      'Generating a project takes one command. This page covers what the machine needs first, what the CLI asks, and what arrives.',
    steps: [
      {
        heading: 'Check the machine',
        body: 'Prumo needs Node 22.23.4 or later and pnpm 10.26 or later, on macOS, Linux or Windows. On Windows it runs natively: the project lives in a Windows folder and the Windows Node and pnpm run it. Inside a WSL distribution, with its own Node, pnpm and Docker, Prumo is on Linux, which is supported though not tested on WSL specifically; Windows tools working on a project inside the WSL filesystem are not supported. Anything with an API also needs Docker, because the development database runs there: on Windows, Docker Desktop with its WSL2 backend, set to Linux containers. This command checks all of it and names whatever is missing.',
        command: commands.doctor,
      },
      {
        heading: 'Generate the project',
        body: 'It asks what to build, writes the project into my-app/, runs git init and installs. Nothing is committed, so the first commit is yours and its diff shows everything Prumo wrote.',
        command: commands.create,
      },
      {
        heading: 'Answer without a terminal',
        body: 'Every question has a flag, and without a terminal every question the answers raise needs one: a missing flag is an error. More than one type makes a workspace; a single type needs --alone or --monorepo to say how it is laid out.',
        command: commands.unattended,
      },
      {
        heading: 'Create the database',
        body: 'Inside a project with an API, this creates the development database in Docker, writes its URL into .env, and runs the migrations unless --skip-migrate is passed. Once the database exists, prumo clean removes the setup the project needed only once.',
        command: commands.database,
      },
    ],
    flags: {
      heading: 'The flags',
      columns: { flag: 'Flag', answers: 'What it answers' },
      rows: [
        {
          flag: '--types api,web,mobile',
          answers:
            'What the project contains. More than one type makes a workspace; web:vite, web:next or web:astro chooses the web framework, Vite by default',
        },
        { flag: '--alone   --monorepo', answers: 'How a single type is laid out' },
        {
          flag: '--multi-tenant   --single-tenant',
          answers:
            'With an api, web or mobile: whether the application serves several tenants. Multi-tenant ships the multi-tenancy conventions; the generated code itself is not tenant-aware yet',
        },
        {
          flag: '--mcp   --no-mcp',
          answers:
            'With an api and a web: whether AI assistants reach the API through MCP, signed in as the user',
        },
        {
          flag: '--email   --no-email',
          answers:
            'With an api: email verification and password reset, by a 6-digit code sent through the Mailer port, which writes to the log until you give it a provider',
        },
        {
          flag: '--social google,apple   --no-social',
          answers: 'With an api and a web or mobile: sign-in with Google, Apple, or both',
        },
        { flag: '--skip-install', answers: 'Stops after writing the files' },
      ],
    },
    landed: {
      heading: 'What landed',
      columns: { file: 'File', what: 'What it is' },
      rows: [
        {
          file: '.prumo/',
          what: 'The conventions, in fourteen areas. Only the areas the answers call for are copied',
        },
        {
          file: '.prumo/INDEX.md',
          what: 'One line per document. Generated by the tool, and safe to regenerate',
        },
        {
          file: 'AGENTS.md',
          what: 'The pointer into .prumo/, read by Codex, Cursor, Copilot, Gemini CLI and others',
        },
        { file: 'CLAUDE.md', what: 'An @AGENTS.md import, for Claude Code' },
      ],
    },
  },
  concepts: {
    title: 'Conventions',
    description:
      'What the .prumo/ folder is, which of its fourteen areas a project receives, and who owns it afterwards.',
    heading: 'The conventions live in the project',
    standfirst:
      'A generated project carries a .prumo/ folder. It is the reason Prumo is not a scaffolder: the code arrives with the rules it follows, written down, in the repository where the work happens.',
    areas: {
      heading: 'Fourteen areas, and only the ones that apply',
      body: 'Only core ships unconditionally, because everything in it is true of every type. The rest follow the answers, since advice about a platform the project does not have is worse than no advice at all.',
      always: 'Always',
      conditional: 'Only when the answers call for it',
    },
    assistants: {
      heading: 'Not tied to one assistant',
      body: '.prumo/ is the single source of truth and stays neutral. The scaffolder writes the entry file each tool loads, and nothing more: AGENTS.md is the real pointer, read by Codex, Cursor, Copilot, Gemini CLI and others, and CLAUDE.md is an import of it. No generated skills, subagents or slash commands, because those change every quarter.',
    },
    ownership: {
      heading: 'Then they are yours',
      body: 'Once written, those documents belong to the team. Prumo does not come back and rewrite them. Updating a project’s .prumo/ in place is deliberately left until after 1.0.',
    },
  },
  commands: {
    title: 'Commands',
    description:
      'Every command the CLI answers, what it does, and the JSON contract each of them honours.',
    heading: 'Commands',
    standfirst:
      'The published package is @stjoseph/prumo and the command it installs is prumo. Either npx or pnpm dlx runs it without installing anything.',
    columns: { command: 'Command', what: 'What it does' },
    rows: [
      {
        command: 'prumo new [name | .]',
        what: 'Generates a project. With ., into the current directory, which must be empty',
      },
      {
        command: 'prumo db',
        what: 'Inside a project with an API: creates the development database in Docker, writes its URL into .env, and runs the migrations unless --skip-migrate is passed',
      },
      {
        command: 'prumo clean',
        what: 'Removes what the project needed only once, today the database setup, once the database exists. Only the Prumo version that generated the project cleans it',
      },
      {
        command: 'prumo doctor',
        what: 'Checks Node, pnpm, git and Docker on this machine, and that Docker runs Linux containers',
      },
      { command: 'prumo version', what: 'Prints the CLI version. Also --version and -v' },
      {
        command: 'prumo help [command]',
        what: 'Lists the commands, or describes one. Also --help',
      },
    ],
    json: {
      heading: 'Every command takes --json',
      body: 'Standard output then holds exactly one document. Anything written for a person goes to standard error, nothing is asked, and the exit code is 0 only when ok is true.',
    },
  },
  desktop: {
    title: 'Prumo Desktop',
    description:
      'A desktop application for Prumo, on macOS, Linux and Windows. It creates and lists projects, runs their apps and their database, and reads their conventions; unsigned previews can be downloaded from GitHub Releases.',
    heading: 'Prumo Desktop',
    standfirst:
      'A desktop application that creates Prumo projects, lists them, reads their .prumo/ conventions, and runs their apps, each in its own terminal panel.',
    download: {
      heading: 'Download',
      body: `Version ${desktopVersion} is a preview for macOS, Linux and Windows. Pick the file for your system and architecture. On every system the app needs Node 22.23.4 or later, pnpm 10.26 or later and git; it checks them, and never installs them. Docker is needed only for an API's database.`,
      button: 'Download from GitHub Releases',
      yourSystem: 'Your system',
      systems: {
        macos: { name: 'macOS', arch: 'Apple silicon and Intel' },
        linux: { name: 'Linux', arch: 'x64' },
        windows: { name: 'Windows', arch: 'x64' },
      },
      builds: {
        'dmg-arm64': 'Apple silicon (M1 and later)',
        'dmg-x64': 'Intel',
        deb: 'Debian, Ubuntu and derivatives',
        rpm: 'Fedora, openSUSE and other rpm systems',
        setup: 'Installer',
      },
      short: {
        'dmg-arm64': 'Apple silicon',
        'dmg-x64': 'Intel',
        deb: '.deb',
        rpm: '.rpm',
        setup: 'Setup.exe',
      },
      macos: {
        install: 'Open the dmg and drag Prumo Desktop into Applications.',
        warning: {
          label: 'Unsigned pre-release',
          lead: 'A preview build, not signed or notarized by Apple. macOS asks you to confirm it the first time it opens.',
          stepsHeading: 'Opening it the first time (macOS 15 and later)',
          steps: [
            'Open Prumo Desktop from Applications. macOS says it cannot check the app for malicious software. Click Done, not Move to Trash.',
            'Choose Apple menu > System Settings, then click Privacy & Security in the sidebar. You may need to scroll down.',
            'Under Security, click Open Anyway. The button is there for about an hour after you tried to open the app.',
            'Enter your login password, then click OK. When the warning appears again, click Open.',
          ],
          guideBefore: 'From then on it opens like any other app. Apple describes these steps in',
          guideLink: 'Open a Mac app from an unknown developer',
          guideUrl:
            'https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unknown-developer-mh40616/mac',
        },
      },
      linux: {
        install: 'Install the package with the package manager of your distribution.',
        warning: {
          label: 'Unsigned packages',
          body: 'The Linux packages are not signed, whether or not the macOS build is. apt and dnf install a local package without asking for a signature.',
        },
      },
      windows: {
        install:
          'Run the Setup.exe. It installs for your user only, without asking for administrator rights, and adds Prumo Desktop to the Start menu.',
        tools:
          'Node, pnpm and git must be installed for Windows itself. The app finds them through the PATH kept in the registry and the usual install folders, or through its Choose Node… button. Projects inside WSL are not supported.',
        channel:
          'GitHub Releases is the only channel for Windows. The Microsoft Store is not planned for now.',
        warning: {
          label: 'Unsigned installer',
          smartScreen:
            'Microsoft Defender SmartScreen warns before it opens an app it does not know yet. In its warning, choose More info, then Run anyway, when Windows offers it.',
          smartAppControl:
            'Smart App Control blocks unsigned apps, with no way around it for a single app. Where it is on, Prumo Desktop cannot be installed unless you turn Smart App Control off in Windows Security.',
          guideBefore: 'Microsoft describes this in',
          guideLink: 'Smart App Control Frequently Asked Questions',
          guideUrl:
            'https://support.microsoft.com/en-us/topic/what-is-smart-app-control-285ea03d-fa88-4d56-882e-6698afdb7003',
        },
      },
      updates:
        'No build updates itself. When a newer release is out, the app says so at the foot of its sidebar, with a link to it: replace the app on macOS, install the new package over the old one on Linux, or run the new Setup.exe on Windows. Your projects and settings stay where they are. On macOS, the first signed release also has to be installed by hand, once.',
    },
    consumer: {
      heading: 'A consumer of Prumo, never a second implementation',
      body: 'The Desktop ships a pinned copy of the CLI and runs it, and updates it within the same minor version (0.5.x), never across one: a new minor arrives with a new Desktop. Everything it knows about a project comes from what that CLI deliberately exposes, its commands with --json, and from the files a generated project carries.',
    },
    status: {
      heading: 'Where it stands',
      body: `Version ${desktopVersion} runs on macOS, Linux and Windows as unsigned previews. It creates and lists projects, runs their apps and their database, and reads their .prumo/. Every technology choice must work on all three systems.`,
      done: 'Done',
      next: 'Being built',
      later: 'Ahead',
      items: <StatusItem[]>[
        {
          state: 'done',
          heading: 'The spike',
          body: 'A throwaway branch proved the risky parts on macOS before any interface existed. Every proof passed.',
        },
        {
          state: 'done',
          heading: 'The foundation',
          body: 'The environment layer, the process layer, the IPC contract and a first screen. Starting, stopping a whole process tree, terminal buffers, and stopping everything on quit.',
        },
        {
          state: 'done',
          heading: 'The features of 0.0.1',
          body: 'The project list, creating a project with every question the CLI asks, running apps, the database, and reading .prumo/.',
        },
        {
          state: 'done',
          heading: 'An unsigned preview',
          body: 'The 0.0.x previews for macOS, on GitHub Releases: ad-hoc signed, not notarized, and never updating themselves.',
        },
        {
          state: 'done',
          heading: 'Linux and Windows previews',
          body: 'From 0.0.3, an unsigned deb and rpm for Linux and an unsigned Setup.exe for Windows, both x64. Every build that does not update itself says when a newer release is out.',
        },
        {
          state: 'later',
          heading: 'arm64 for Linux and Windows',
          body: 'The Linux and Windows builds are x64 only, which covers every Intel and AMD machine. arm64 builds of both are planned, and come when someone asks for them.',
        },
        {
          state: 'later',
          heading: 'A signed and notarised macOS build',
          body: 'It replaces the macOS preview: no Open Anyway step, and updates that arrive by themselves. Moving to it takes one manual reinstall.',
        },
      ],
    },
    follow: {
      heading: 'Follow it',
      body: 'The Desktop is built in the open, one piece at a time. The repository carries what already runs and what is being worked on.',
      repository: 'Open the repository',
    },
  },
  documents: {
    title: 'Documents',
    description:
      'Prumo’s own documents, read from the repositories they live in, at the commit this site is pinned to.',
    heading: 'Documents',
    standfirst:
      'These files live in the repositories, not here. The site reads them at the commit it is pinned to and renders them unchanged, so nothing on this page can drift from what the projects actually say.',
    groups: {
      prumo: 'Prumo',
      desktop: 'Prumo Desktop',
    },
    englishNotice:
      'This document lives in the repository and is maintained in English. The site does not translate it.',
    pinnedAt: 'Pinned at',
  },
  footer: {
    by: 'By',
    stjosephWorks: 'St. Joseph Works',
    describing: 'Describing Prumo',
    license: 'MIT licensed',
    builtWith:
      'This site was generated by Prumo, as a site project: the type that is now web:next.',
    sections: {
      product: 'Prumo',
      documents: 'Documents',
      elsewhere: 'Elsewhere',
    },
    npm: 'Package on npm',
    repository: 'Repository',
    desktopRepository: 'Desktop repository',
  },
  notFound: {
    title: 'Not found',
    heading: 'Nothing is here',
    body: 'That page does not exist. The documents are listed here.',
    link: 'See the documents',
  },
}

export type Dictionary = typeof en
