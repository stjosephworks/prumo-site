import { commands } from '@/lib/commands'
import { desktopVersion } from '@/lib/desktop'
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
    commandCaption:
      'Node 22.18 ou mais novo e pnpm 10.26 ou mais novo, no macOS, no Linux ou no Windows.',
    readDocuments: 'Ler os documentos',
    paths: {
      or: 'ou',
      cli: {
        heading: 'Pelo terminal',
        body: 'Um comando pergunta o que construir e escreve o projeto.',
      },
      desktop: {
        heading: 'Com o Prumo Desktop',
        body: 'O mesmo CLI num aplicativo que cria, lista e roda os seus projetos, no macOS, no Linux e no Windows.',
        yourSystem: 'Seu sistema',
        hints: {
          macosUnsigned: 'Não assinado: confirme uma vez com Abrir Mesmo Assim.',
          macosSigned: 'Assinado e notarizado pela Apple.',
          linux: 'Não assinado: instale com apt ou dnf.',
          windows:
            'Não assinado: Mais informações, depois Executar assim mesmo. Bloqueado onde o Controle Inteligente de Aplicativos está ligado.',
        },
        previewNote: `Prévias não assinadas da versão ${desktopVersion}. Todo build precisa de Node 22.18 ou mais novo e de pnpm 10.26 ou mais novo.`,
        previewLink: 'Como instalar',
        signedNote:
          'O build para macOS é assinado e notarizado; os de Linux e Windows não são. Todo build precisa de Node 22.18 ou mais novo e de pnpm 10.26 ou mais novo.',
        signedLink: 'Sobre o Prumo Desktop',
      },
    },
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
      caption: 'Um trecho de um projeto gerado com --types api,web',
    },
    types: {
      heading: 'Quatro tipos, e do que cada um é feito',
      note: 'Um tipo produz aquele projeto sozinho. Vários produzem um workspace pnpm, com o contrato de comunicação compartilhado, de modo que uma mudança de um lado quebra o outro no typecheck.',
      rows: [
        {
          type: 'api',
          role: 'O servidor',
          parts: [
            'Fastify com uma estrutura domain/infra',
            'tsyringe e Zod',
            'MikroORM sobre PostgreSQL',
            'Autenticação JWT própria',
            'Swagger UI',
            'Vitest com Testcontainers',
          ],
        },
        {
          type: 'web',
          role: 'O app do navegador',
          parts: [
            'Vite e React',
            'TanStack Router e Query',
            'Tailwind e shadcn/ui',
            'Formulários validados com Zod',
          ],
        },
        {
          type: 'mobile',
          role: 'O app do celular',
          parts: [
            'Expo com Expo Router',
            'NativeWind e MMKV',
            'Tokens guardados no expo-secure-store',
            'Rodando numa development build',
          ],
        },
        {
          type: 'site',
          role: 'Páginas que precisam ser indexadas',
          parts: ['Next no App Router', 'Estático por padrão'],
        },
      ],
    },
    silence: {
      heading: 'Nada importante é decidido pelo silêncio',
      body: 'Toda pergunta que o CLI faz também tem uma flag, que é como ele roda na CI sem terminal. Fora de um terminal interativo, uma resposta que falta é erro, não valor padrão.',
    },
    record: {
      heading: 'A stack está travada, e diz isso',
      body: 'Um documento nomeia cada pacote, cada piso de versão e as dezenove entradas descartadas de propósito. Ele foi escrito para ser tratado como dado: um projeto gerado herda tudo aquilo, e nada volta a ser resolvido projeto a projeto.',
      link: 'Abrir a stack travada',
    },
    desktop: {
      heading: 'Prumo Desktop',
      body: `Um aplicativo de desktop que cria projetos Prumo, lista-os, lê suas convenções e roda seus apps. A versão ${desktopVersion}, uma prévia não assinada para macOS, Linux e Windows, já pode ser baixada.`,
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
        body: 'O Prumo precisa de Node 22.18 ou mais novo e de pnpm 10.26 ou mais novo, no macOS, no Linux ou no Windows. No Windows ele roda nativamente: o projeto fica numa pasta do Windows, e quem o roda são o Node e o pnpm do Windows. Dentro de uma distribuição WSL, com Node, pnpm e Docker dela, o Prumo está no Linux, que é suportado, embora não seja testado no WSL especificamente; ferramentas do Windows trabalhando num projeto dentro do sistema de arquivos do WSL não são suportadas. Qualquer coisa com API precisa também de Docker, porque é lá que roda o banco de desenvolvimento: no Windows, o Docker Desktop com o backend WSL2, configurado para contêineres Linux. Este comando confere tudo e diz o que falta.',
        command: commands.doctor,
      },
      {
        heading: 'Gere o projeto',
        body: 'Ele pergunta o que construir, escreve o projeto em my-app/, roda git init e instala. Nada é commitado, então o primeiro commit é seu e o diff dele mostra tudo o que o Prumo escreveu.',
        command: commands.create,
      },
      {
        heading: 'Responda sem terminal',
        body: 'Toda pergunta tem uma flag, e sem terminal toda pergunta que as respostas levantam precisa da sua: uma flag que falta é erro. Mais de um tipo faz um workspace; um único tipo precisa de --alone ou --monorepo para dizer como fica disposto.',
        command: commands.unattended,
      },
      {
        heading: 'Crie o banco',
        body: 'Dentro de um projeto com API, isto cria o banco de desenvolvimento no Docker, escreve a URL dele no .env e roda as migrations, a menos que se passe --skip-migrate. Uma vez que o banco existe, prumo clean remove a preparação de que o projeto precisou uma vez só.',
        command: commands.database,
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
          answers:
            'Com uma api, web ou mobile: se a aplicação serve vários inquilinos. Multi-tenant traz as convenções de multi-tenancy; o código gerado em si ainda não é ciente de inquilino',
        },
        {
          flag: '--mcp   --no-mcp',
          answers:
            'Com uma api e uma web: se assistentes de IA chegam à API por MCP, autenticados como o usuário',
        },
        {
          flag: '--email   --no-email',
          answers:
            'Com uma api: verificação de email e redefinição de senha, por um código de 6 dígitos enviado pela porta Mailer, que escreve no log até você dar a ela um provedor',
        },
        {
          flag: '--social google,apple   --no-social',
          answers: 'Com uma api e uma web ou mobile: login com Google, Apple, ou os dois',
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
          what: 'As convenções, em doze áreas. Só as áreas que as respostas pedem são copiadas',
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
      'O que é a pasta .prumo/, quais das doze áreas um projeto recebe, e de quem ela é depois disso.',
    heading: 'As convenções vivem no projeto',
    standfirst:
      'Um projeto gerado carrega uma pasta .prumo/. É por isso que o Prumo não é um scaffolder: o código chega com as regras que segue, escritas, no repositório onde o trabalho acontece.',
    areas: {
      heading: 'Doze áreas, e só as que se aplicam',
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
      {
        command: 'prumo new [name | .]',
        what: 'Gera um projeto. Com ., no diretório atual, que precisa estar vazio',
      },
      {
        command: 'prumo db',
        what: 'Dentro de um projeto com API: cria o banco de desenvolvimento no Docker, escreve a URL dele no .env e roda as migrations, a menos que se passe --skip-migrate',
      },
      {
        command: 'prumo clean',
        what: 'Remove o que o projeto precisou uma vez só, hoje a preparação do banco, depois que o banco existe. Só a versão do Prumo que gerou o projeto o limpa',
      },
      {
        command: 'prumo doctor',
        what: 'Confere Node, pnpm, git e Docker nesta máquina, e se o Docker roda contêineres Linux',
      },
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
      'Um aplicativo de desktop para o Prumo, no macOS, no Linux e no Windows. Ele cria e lista projetos, roda seus apps e seu banco, e lê suas convenções; prévias não assinadas podem ser baixadas no GitHub Releases.',
    heading: 'Prumo Desktop',
    standfirst:
      'Um aplicativo de desktop que cria projetos Prumo, lista-os, lê as convenções em .prumo/ e roda os apps deles, cada um no seu próprio painel de terminal.',
    download: {
      heading: 'Download',
      body: `A versão ${desktopVersion} é uma prévia para macOS, Linux e Windows. Escolha o arquivo do seu sistema e da sua arquitetura. Em todo sistema o app precisa de Node 22.18 ou mais novo, de pnpm 10.26 ou mais novo e de git; ele os confere, mas nunca os instala. O Docker só é necessário para o banco de uma API.`,
      button: 'Baixar no GitHub Releases',
      yourSystem: 'Seu sistema',
      systems: {
        macos: { name: 'macOS', arch: 'Apple silicon e Intel' },
        linux: { name: 'Linux', arch: 'x64' },
        windows: { name: 'Windows', arch: 'x64' },
      },
      builds: {
        'dmg-arm64': 'Apple silicon (M1 ou mais novo)',
        'dmg-x64': 'Intel',
        deb: 'Debian, Ubuntu e derivados',
        rpm: 'Fedora, openSUSE e outros sistemas rpm',
        setup: 'Instalador',
      },
      short: {
        'dmg-arm64': 'Apple silicon',
        'dmg-x64': 'Intel',
        deb: '.deb',
        rpm: '.rpm',
        setup: 'Setup.exe',
      },
      macos: {
        install: 'Abra o dmg e arraste o Prumo Desktop para Aplicativos.',
        warning: {
          label: 'Pré-lançamento não assinado',
          lead: 'Uma versão de prévia, não assinada nem notarizada pela Apple. O macOS pede que você a confirme na primeira vez que ela abre.',
          stepsHeading: 'Abrindo pela primeira vez (macOS 15 ou mais novo)',
          steps: [
            'Abra o Prumo Desktop em Aplicativos. O macOS diz que não consegue verificar se o app contém software malicioso. Clique em Concluído, não no botão que move o app para o Lixo.',
            'Escolha menu Apple > Ajustes do Sistema e clique em Privacidade e Segurança na barra lateral. Talvez seja preciso rolar para baixo.',
            'Em Segurança, clique em Abrir Mesmo Assim. Esse botão fica disponível por cerca de uma hora depois de tentar abrir o app.',
            'Digite a senha de início de sessão e clique em OK. Quando o aviso aparecer de novo, clique em Abrir.',
          ],
          guideBefore:
            'Daí em diante, ele abre como qualquer outro app. A Apple descreve esses passos em',
          guideLink: 'Abra um app do Mac de um desenvolvedor desconhecido',
          guideUrl: 'https://support.apple.com/pt-br/guide/mac-help/mh40616/mac',
        },
      },
      linux: {
        install: 'Instale o pacote com o gerenciador de pacotes da sua distribuição.',
        warning: {
          label: 'Pacotes não assinados',
          body: 'Os pacotes para Linux não são assinados, seja ou não assinado o build para macOS. O apt e o dnf instalam um pacote local sem pedir assinatura.',
        },
      },
      windows: {
        install:
          'Rode o Setup.exe. Ele instala só para o seu usuário, sem pedir permissão de administrador, e põe o Prumo Desktop no menu Iniciar.',
        tools:
          'Node, pnpm e git precisam estar instalados no próprio Windows. O app os encontra pelo PATH guardado no registro e pelas pastas de instalação de costume, ou pelo botão Escolher o Node…. Projetos dentro do WSL não são suportados.',
        channel:
          'O GitHub Releases é o único canal para Windows. A Microsoft Store não está nos planos por enquanto.',
        warning: {
          label: 'Instalador não assinado',
          smartScreen:
            'O Microsoft Defender SmartScreen avisa antes de abrir um app que ainda não conhece. No aviso, escolha Mais informações e depois Executar assim mesmo, quando o Windows oferecer.',
          smartAppControl:
            'O Controle Inteligente de Aplicativos bloqueia apps não assinados, e não há como liberar um app só. Onde ele está ligado, o Prumo Desktop não pode ser instalado a menos que você o desligue na Segurança do Windows.',
          guideBefore: 'A Microsoft descreve isso em',
          guideLink: 'Perguntas frequentes sobre o Controle Inteligente de Aplicativos',
          guideUrl:
            'https://support.microsoft.com/pt-br/topic/what-is-smart-app-control-285ea03d-fa88-4d56-882e-6698afdb7003',
        },
      },
      updates:
        'Nenhum build se atualiza sozinho. Quando sai um release mais novo, o app avisa no rodapé da barra lateral, com um link para ele: substitua o app no macOS, instale o pacote novo por cima do antigo no Linux, ou rode o Setup.exe novo no Windows. Seus projetos e ajustes continuam onde estão. No macOS, o primeiro release assinado também precisa ser instalado à mão, uma vez.',
    },
    consumer: {
      heading: 'Um consumidor do Prumo, nunca uma segunda implementação',
      body: 'O Desktop embarca uma cópia fixada do CLI e a executa, e a atualiza dentro da mesma versão minor (0.5.x), nunca para outra: uma minor nova chega com um Desktop novo. Tudo o que ele sabe sobre um projeto vem do que esse CLI expõe de propósito, seus comandos com --json, e dos arquivos que um projeto gerado carrega.',
    },
    status: {
      heading: 'Em que pé está',
      body: `A versão ${desktopVersion} roda no macOS, no Linux e no Windows como prévias não assinadas. Ela cria e lista projetos, roda seus apps e seu banco, e lê o .prumo/. Toda escolha de tecnologia precisa funcionar nos três sistemas.`,
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
          state: 'done',
          heading: 'As funcionalidades da 0.0.1',
          body: 'A lista de projetos, criar um projeto com todas as perguntas do CLI, rodar apps, o banco, e ler o .prumo/.',
        },
        {
          state: 'done',
          heading: 'Uma prévia não assinada',
          body: 'As prévias 0.0.x para macOS, no GitHub Releases: assinadas ad hoc, não notarizadas, e que nunca se atualizam sozinhas.',
        },
        {
          state: 'done',
          heading: 'Prévias para Linux e Windows',
          body: 'Desde a 0.0.3, um deb e um rpm não assinados para Linux e um Setup.exe não assinado para Windows, todos x64. Todo build que não se atualiza sozinho avisa quando sai um release mais novo.',
        },
        {
          state: 'next',
          heading: 'arm64 para Linux e Windows',
          body: 'Os builds para Linux e Windows são só x64. Os builds arm64 dos dois vêm a seguir.',
        },
        {
          state: 'later',
          heading: 'Um build para macOS assinado e notarizado',
          body: 'Ele substitui a prévia para macOS: sem o passo de Abrir Mesmo Assim, e com atualizações que chegam sozinhas. Passar para ele exige uma reinstalação manual.',
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
    by: 'Por',
    stjosephWorks: 'St. Joseph Works',
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
