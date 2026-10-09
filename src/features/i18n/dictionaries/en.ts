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
    commandLabel: 'Run this',
    commandCaption: 'Node 22.18 or later, and pnpm 10.26 or later.',
    readDocuments: 'Read the documents',
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
    },
    types: {
      heading: 'Four types, and what each one is made of',
      note: 'One type produces that project alone. Several produce a pnpm workspace, with the wire contract shared so a change on one side breaks the other at typecheck.',
      columns: { type: 'Type', contents: 'What you get' },
      rows: [
        {
          type: 'api',
          contents:
            'Fastify with a domain/infra structure, tsyringe, Zod, MikroORM on PostgreSQL, its own JWT authentication, Swagger UI, Vitest with Testcontainers',
        },
        {
          type: 'web',
          contents:
            'Vite, React, TanStack Router and Query, Tailwind, shadcn/ui, forms validated with Zod',
        },
        {
          type: 'mobile',
          contents:
            'Expo with Expo Router, NativeWind, MMKV, and the tokens kept in expo-secure-store, run in a development build',
        },
        {
          type: 'site',
          contents: 'Next on the App Router, static by default, for pages that have to be indexed',
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
      body: 'A desktop application that creates Prumo projects, lists them, reads their conventions and runs their apps. Version 0.0.1, an unsigned preview for macOS, can be downloaded.',
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
        body: 'Prumo needs Node 22.18 or later and pnpm 10.26 or later, on macOS or Linux; Windows is not supported yet. Anything with an API also needs Docker, because the development database runs there. This command checks all of it and names whatever is missing.',
        command: 'npx @stjoseph/prumo doctor',
      },
      {
        heading: 'Generate the project',
        body: 'It asks what to build, writes the project into my-app/, runs git init and installs. Nothing is committed, so the first commit is yours and its diff shows everything Prumo wrote.',
        command: 'npx @stjoseph/prumo new my-app',
      },
      {
        heading: 'Answer without a terminal',
        body: 'Every question has a flag, and without a terminal every question the answers raise needs one: a missing flag is an error. More than one type makes a workspace; a single type needs --alone or --monorepo to say how it is laid out.',
        command:
          'npx @stjoseph/prumo new my-app --types api,web --single-tenant --no-mcp --email --no-social',
      },
      {
        heading: 'Create the database',
        body: 'Inside a project with an API, this creates the development database in Docker and writes its URL into .env. Once the database exists, prumo clean removes the setup the project needed only once.',
        command: 'npx @stjoseph/prumo db',
      },
    ],
    flags: {
      heading: 'The flags',
      columns: { flag: 'Flag', answers: 'What it answers' },
      rows: [
        {
          flag: '--types api,web,mobile,site',
          answers: 'What the project contains. More than one type makes a workspace',
        },
        { flag: '--alone   --monorepo', answers: 'How a single type is laid out' },
        {
          flag: '--multi-tenant   --single-tenant',
          answers:
            'Whether the application serves several tenants. Multi-tenant ships the multi-tenancy conventions; the generated code itself is not tenant-aware yet',
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
          what: 'The conventions, in twelve areas. Only the areas the answers call for are copied',
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
      'What the .prumo/ folder is, which of its twelve areas a project receives, and who owns it afterwards.',
    heading: 'The conventions live in the project',
    standfirst:
      'A generated project carries a .prumo/ folder. It is the reason Prumo is not a scaffolder: the code arrives with the rules it follows, written down, in the repository where the work happens.',
    areas: {
      heading: 'Twelve areas, and only the ones that apply',
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
        what: 'Inside a project with an API: creates the development database in Docker and writes its URL into .env',
      },
      {
        command: 'prumo clean',
        what: 'Removes what the project needed only once, today the database setup, once the database exists. Only the Prumo version that generated the project cleans it',
      },
      { command: 'prumo doctor', what: 'Checks Node, pnpm, git and Docker on this machine' },
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
      'A desktop application for Prumo. It creates and lists projects, runs their apps and their database, and reads their conventions; an unsigned preview for macOS can be downloaded from GitHub Releases.',
    heading: 'Prumo Desktop',
    standfirst:
      'A desktop application that creates Prumo projects, lists them, reads their .prumo/ conventions, and runs their apps, each in its own terminal panel.',
    download: {
      heading: 'Download',
      body: 'Version 0.0.1 is a preview for macOS. Each release carries two disk images: pick the one for your Mac, open it, and drag Prumo Desktop into Applications.',
      button: 'Download from GitHub Releases',
      builds: [
        { name: 'Apple silicon (M1 and later)', file: 'Prumo.Desktop-<version>-arm64.dmg' },
        { name: 'Intel', file: 'Prumo.Desktop-<version>-x64.dmg' },
      ],
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
        updates:
          'This build never updates itself. The first signed release also has to be installed by hand, once: download it, quit Prumo Desktop and replace the app in Applications. Your projects and settings stay where they are.',
      },
    },
    consumer: {
      heading: 'A consumer of Prumo, never a second implementation',
      body: 'The Desktop ships a pinned copy of the CLI and runs it. Everything it knows about a project comes from what that CLI deliberately exposes, its commands with --json, and from the files a generated project carries.',
    },
    status: {
      heading: 'Where it stands',
      body: 'Version 0.0.1 runs on macOS as an unsigned preview. It creates and lists projects, runs their apps and their database, and reads their .prumo/. Every technology choice must also work on Windows and Linux, which come after the signed build.',
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
          body: 'Version 0.0.1 for macOS, on GitHub Releases: ad-hoc signed, not notarized, and never updating itself.',
        },
        {
          state: 'next',
          heading: 'A signed and notarised build',
          body: 'It replaces the preview: no Open Anyway step, and updates that arrive by themselves. Moving to it takes one manual reinstall.',
        },
        {
          state: 'later',
          heading: 'Windows and Linux',
          body: 'Ported as a series of their own, once the macOS build is signed.',
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
    describing: 'Describing Prumo',
    license: 'MIT licensed',
    builtWith: 'This site was generated by Prumo, as a site project.',
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
