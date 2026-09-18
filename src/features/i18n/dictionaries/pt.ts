import type { Dictionary, StatusItem } from './en'

export const pt: Dictionary = {
  nav: {
    start: 'Começar',
    concepts: 'Convenções',
    commands: 'Comandos',
    desktop: 'Desktop',
    documents: 'Documentos',
    github: 'GitHub',
    skipToContent: 'Pular para o conteúdo',
    language: 'Idioma',
    menu: 'Menu',
  },
  common: {
    copy: 'Copiar',
    copied: 'Copiado',
    npm: 'npm',
    pnpm: 'pnpm',
    onThisPage: 'Nesta página',
    readOnGithub: 'Ler este arquivo no GitHub',
    beta: 'Beta',
  },
  search: {
    open: 'Buscar nos documentos',
    placeholder: 'Buscar em todos os títulos',
    empty: 'Nada corresponde a isso ainda.',
    hint: 'Busca em todos os títulos da documentação.',
    close: 'Fechar',
    resultsOne: '1 resultado',
    resultsMany: '{count} resultados',
  },
  home: {
    title: 'Prumo',
    description:
      'O Prumo começa um projeto TypeScript com o framework, as regras do banco e os limites de teste já escolhidos, e escreve cada um deles dentro do projeto.',
    headline: 'As decisões já foram tomadas.',
    headlineSecond: 'E estão escritas.',
    standfirst:
      'O Prumo começa um projeto TypeScript com o framework, o desenho dos módulos, as regras do banco, a ligação da autenticação e os limites de teste já escolhidos. Cada um foi decidido uma vez, escrito dentro do projeto que o recebe, e transformado em algo que roda.',
    commandLabel: 'Rode isto',
    commandCaption: 'Node 22.17 ou mais novo, e pnpm.',
    readDocuments: 'Ler os documentos',
    arrives: {
      heading: 'Um projeto novo chega com duas coisas',
      code: {
        term: 'Código que já funciona',
        detail:
          'Instalado, ligado e provado por iniciar, não por compilar. Todo template está commitado por inteiro e nenhum deles chama o scaffolder de terceiros na hora da instalação.',
      },
      conventions: {
        term: 'As convenções que ele segue',
        detail:
          'Uma pasta .prumo/ com as regras que esse código obedece. Qualquer assistente de IA que trabalhe no repositório a lê e passa a conhecê-las sem ninguém explicar. As convenções vivem no projeto, não na cabeça de alguém.',
      },
    },
    types: {
      heading: 'Quatro tipos, e do que cada um é feito',
      note: 'Um tipo produz aquele projeto sozinho. Vários produzem um workspace pnpm, com o contrato de comunicação compartilhado, de modo que uma mudança de um lado quebra o outro no typecheck.',
      columns: { type: 'Tipo', contents: 'O que você recebe' },
      rows: [
        {
          type: 'api',
          contents:
            'NestJS, MikroORM sobre PostgreSQL, Better Auth em schema próprio, Swagger, Vitest com Testcontainers',
        },
        {
          type: 'web',
          contents:
            'Vite, React, TanStack Router e Query, Tailwind, shadcn/ui, formulários validados com Zod',
        },
        {
          type: 'mobile',
          contents:
            'Expo com Expo Router, NativeWind, MMKV, e a sessão guardada no expo-secure-store',
        },
        {
          type: 'site',
          contents:
            'Next no App Router, estático por padrão, para páginas que precisam ser indexadas',
        },
      ],
    },
    silence: {
      heading: 'Nada importante é decidido pelo silêncio',
      body: 'Toda pergunta que o CLI faz também tem uma flag, que é como ele roda na CI sem terminal. Fora de um terminal interativo, uma resposta que falta é erro, não valor padrão.',
    },
    record: {
      heading: 'A stack está travada, e diz isso',
      body: 'Um documento nomeia cada pacote, cada piso de versão e as dezesseis entradas descartadas de propósito. Ele foi escrito para ser tratado como dado: um projeto gerado herda tudo aquilo, e nada volta a ser resolvido projeto a projeto.',
      link: 'Abrir a stack travada',
    },
    desktop: {
      heading: 'Prumo Desktop',
      body: 'Um aplicativo de desktop que cria projetos Prumo, lista-os, lê suas convenções e roda seus apps. A fundação roda; as funcionalidades estão sendo construídas uma por vez.',
      link: 'Ver em que pé está',
    },
  },
  start: {
    title: 'Começar',
    description:
      'Conferir a máquina, gerar um projeto e ver o que chegou. Quatro passos, com a flag de cada pergunta.',
    heading: 'Começar',
    standfirst:
      'Gerar um projeto leva um comando. Esta página cobre o que a máquina precisa antes, o que o CLI pergunta e o que chega.',
    steps: [
      {
        heading: 'Confira a máquina',
        body: 'O Prumo precisa de Node 22.17 ou mais novo e de pnpm. Qualquer coisa com API precisa também de Docker, porque é lá que roda o banco de desenvolvimento. Este comando confere tudo e diz o que falta.',
        command: 'npx @stjoseph/prumo doctor',
      },
      {
        heading: 'Gere o projeto',
        body: 'Ele pergunta o que construir, escreve o projeto em my-app/, roda git init e instala. Nada é commitado, então o primeiro commit é seu e o diff dele mostra tudo o que o Prumo escreveu.',
        command: 'npx @stjoseph/prumo new my-app',
      },
      {
        heading: 'Responda sem terminal',
        body: 'Toda pergunta tem uma flag. Mais de um tipo faz um workspace; um tipo só precisa de --alone ou --monorepo para dizer como fica disposto.',
        command: 'npx @stjoseph/prumo new my-app --types api,web --single-tenant',
      },
      {
        heading: 'Crie o banco',
        body: 'Dentro de um projeto com API, isto cria o banco de desenvolvimento no Docker e escreve a URL dele no .env. Uma vez que o banco existe, prumo clean remove a preparação de que o projeto precisou uma vez só.',
        command: 'prumo db',
      },
    ],
    flags: {
      heading: 'As flags',
      columns: { flag: 'Flag', answers: 'O que ela responde' },
      rows: [
        {
          flag: '--types api,web,mobile,site',
          answers: 'O que o projeto contém. Mais de um tipo faz um workspace',
        },
        { flag: '--alone   --monorepo', answers: 'Como um tipo sozinho fica disposto' },
        {
          flag: '--multi-tenant   --single-tenant',
          answers: 'Se a aplicação serve vários inquilinos',
        },
        { flag: '--skip-install', answers: 'Para depois de escrever os arquivos' },
      ],
    },
    landed: {
      heading: 'O que chegou',
      columns: { file: 'Arquivo', what: 'O que é' },
      rows: [
        {
          file: '.prumo/',
          what: 'As convenções, em nove áreas. Só as áreas que as respostas pedem são copiadas',
        },
        {
          file: '.prumo/INDEX.md',
          what: 'Uma linha por documento. Gerado pela ferramenta, e seguro de regerar',
        },
        {
          file: 'AGENTS.md',
          what: 'O ponteiro para o .prumo/, lido por Codex, Cursor, Copilot, Gemini CLI e outros',
        },
        { file: 'CLAUDE.md', what: 'Um import de @AGENTS.md, para o Claude Code' },
      ],
    },
  },
  concepts: {
    title: 'Convenções',
    description:
      'O que é a pasta .prumo/, quais das nove áreas um projeto recebe, e de quem ela é depois disso.',
    heading: 'As convenções vivem no projeto',
    standfirst:
      'Um projeto gerado carrega uma pasta .prumo/. É por isso que o Prumo não é um scaffolder: o código chega com as regras que segue, escritas, no repositório onde o trabalho acontece.',
    areas: {
      heading: 'Nove áreas, e só as que se aplicam',
      body: 'Só core vai sem condição, porque tudo nela é verdade em todo tipo. O resto segue as respostas, já que conselho sobre uma plataforma que o projeto não tem é pior que conselho nenhum.',
      always: 'Sempre',
      conditional: 'Só quando as respostas pedem',
    },
    assistants: {
      heading: 'Não amarrado a um assistente',
      body: 'O .prumo/ é a fonte única da verdade e permanece neutro. O gerador escreve o arquivo de entrada que cada ferramenta carrega, e nada além disso: o AGENTS.md é o ponteiro de verdade, lido por Codex, Cursor, Copilot, Gemini CLI e outros, e o CLAUDE.md é um import dele. Sem skills, subagentes ou slash commands gerados, porque isso muda a cada trimestre.',
    },
    ownership: {
      heading: 'Depois disso, são seus',
      body: 'Uma vez escritos, esses documentos pertencem ao time. O Prumo não volta para reescrevê-los. Atualizar o .prumo/ de um projeto no lugar ficou deliberadamente para depois do 1.0.',
    },
  },
  commands: {
    title: 'Comandos',
    description:
      'Todo comando que o CLI responde, o que ele faz, e o contrato JSON que todos honram.',
    heading: 'Comandos',
    standfirst:
      'O pacote publicado é @stjoseph/prumo e o comando que ele instala é prumo. Tanto npx quanto pnpm dlx rodam sem instalar nada.',
    columns: { command: 'Comando', what: 'O que faz' },
    rows: [
      { command: 'prumo new [name]', what: 'Gera um projeto' },
      {
        command: 'prumo db',
        what: 'Dentro de um projeto com API: cria o banco de desenvolvimento no Docker e escreve a URL dele no .env',
      },
      {
        command: 'prumo clean',
        what: 'Remove o que o projeto precisou uma vez só, hoje a preparação do banco, depois que o banco existe',
      },
      { command: 'prumo doctor', what: 'Confere Node, pnpm, git e Docker nesta máquina' },
      { command: 'prumo version', what: 'Imprime a versão do CLI. Também --version e -v' },
      { command: 'prumo help [command]', what: 'Lista os comandos, ou descreve um. Também --help' },
    ],
    json: {
      heading: 'Todo comando aceita --json',
      body: 'A saída padrão passa a conter exatamente um documento. O que é escrito para uma pessoa vai para a saída de erro, nada é perguntado, e o código de saída é 0 apenas quando ok é true.',
    },
  },
  desktop: {
    title: 'Prumo Desktop',
    description:
      'Um aplicativo de desktop para o Prumo. A fundação roda e as funcionalidades estão sendo construídas; ainda não há build público para baixar.',
    heading: 'Prumo Desktop',
    standfirst:
      'Um aplicativo de desktop que cria projetos Prumo, lista-os, lê as convenções em .prumo/ e roda os apps deles, cada um no seu próprio painel de terminal.',
    consumer: {
      heading: 'Um consumidor do Prumo, nunca uma segunda implementação',
      body: 'O Desktop embarca uma cópia fixada do CLI e a executa. Tudo o que ele sabe sobre um projeto vem do que esse CLI expõe de propósito, seus comandos com --json, e dos arquivos que um projeto gerado carrega.',
    },
    status: {
      heading: 'Em que pé está',
      body: 'Ainda não há download, e esta página não vai fingir o contrário. A fundação roda; as funcionalidades não estão construídas. A versão 0.0.1 mira só o macOS, embora toda escolha de tecnologia precise funcionar também no Windows e no Linux.',
      done: 'Pronto',
      next: 'Em construção',
      later: 'Adiante',
      items: <StatusItem[]>[
        {
          state: 'done',
          heading: 'O spike',
          body: 'Um branch descartável provou as partes arriscadas no macOS antes de existir qualquer interface. Toda prova passou.',
        },
        {
          state: 'done',
          heading: 'A fundação',
          body: 'A camada de ambiente, a camada de processos, o contrato de IPC e uma primeira tela. Iniciar, parar uma árvore inteira de processos, buffers de terminal, e parar tudo ao sair.',
        },
        {
          state: 'next',
          heading: 'As funcionalidades, uma por vez',
          body: 'A lista de projetos, criar um projeto, rodar apps, o banco, e ler o .prumo/.',
        },
        {
          state: 'later',
          heading: 'Um build assinado e notarizado',
          body: 'O primeiro chega bem antes do lançamento público. É quando um download aparece aqui.',
        },
      ],
    },
    follow: {
      heading: 'Acompanhe',
      body: 'O Desktop é construído à vista, uma peça por vez. O repositório carrega o que já roda e o que está em andamento.',
      repository: 'Abrir o repositório',
    },
  },
  documents: {
    title: 'Documentos',
    description:
      'Os documentos do próprio Prumo, lidos dos repositórios onde vivem, no commit a que este site está fixado.',
    heading: 'Documentos',
    standfirst:
      'Estes arquivos vivem nos repositórios, não aqui. O site os lê no commit a que está fixado e os renderiza sem alterar, então nada nesta página pode divergir do que os projetos realmente dizem.',
    groups: {
      prumo: 'Prumo',
      desktop: 'Prumo Desktop',
    },
    englishNotice: 'Este documento vive no repositório e é mantido em inglês. O site não o traduz.',
    pinnedAt: 'Fixado em',
  },
  footer: {
    describing: 'Descrevendo o Prumo',
    license: 'Licença MIT',
    builtWith: 'Este site foi gerado pelo Prumo, como um projeto do tipo site.',
    sections: {
      product: 'Prumo',
      documents: 'Documentos',
      elsewhere: 'Em outros lugares',
    },
    npm: 'Pacote no npm',
    repository: 'Repositório',
    desktopRepository: 'Repositório do Desktop',
  },
  notFound: {
    title: 'Não encontrado',
    heading: 'Não há nada aqui',
    body: 'Essa página não existe. Os documentos estão listados aqui.',
    link: 'Ver os documentos',
  },
}
