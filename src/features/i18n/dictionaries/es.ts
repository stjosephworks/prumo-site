import { commands } from '@/lib/commands'
import { desktopVersion } from '@/lib/desktop'
import type { Dictionary, StatusItem } from './en'

// The macOS and Windows labels are the vendors' own, read on 2026-10-15:
// - macOS: Apple's Latin American Spanish guide, https://support.apple.com/es-lamr/guide/mac-help/mh40616/mac
//   (menú Apple > Configuración del Sistema, Privacidad y seguridad, Seguridad, Abrir de todos modos, OK), and
//   https://support.apple.com/es-lamr/guide/mac-help/mchleab3a043/mac for the wording of the first warning.
// - Windows: https://support.microsoft.com/es-mx/topic/what-is-smart-app-control-285ea03d-fa88-4d56-882e-6698afdb7003
//   (Control Inteligente de Aplicaciones, Seguridad de Windows), and
//   https://learn.microsoft.com/es-mx/windows/apps/package-and-deploy/smartscreen-reputation (Ejecutar de todos modos).
// Neither vendor's Spanish pages name the buttons of the first macOS warning, so that step names none.
export const es: Dictionary = {
  nav: {
    start: 'Empezar',
    concepts: 'Convenciones',
    commands: 'Comandos',
    desktop: 'Desktop',
    documents: 'Documentos',
    github: 'GitHub',
    skipToContent: 'Ir al contenido',
    language: 'Idioma',
    menu: 'Menú',
  },
  common: {
    copy: 'Copiar',
    copied: 'Copiado',
    npm: 'npm',
    pnpm: 'pnpm',
    onThisPage: 'En esta página',
    readOnGithub: 'Leer este archivo en GitHub',
    beta: 'Beta',
  },
  search: {
    open: 'Buscar en los documentos',
    placeholder: 'Buscar en todos los títulos',
    empty: 'Todavía nada coincide con eso.',
    hint: 'Busca en todos los títulos de la documentación.',
    close: 'Cerrar',
    resultsOne: '1 resultado',
    resultsMany: '{count} resultados',
  },
  home: {
    title: 'Prumo',
    description:
      'Prumo comienza un proyecto TypeScript con el framework, las reglas de la base de datos y los límites de las pruebas ya elegidos, y deja cada una de esas decisiones escrita dentro del proyecto.',
    headline: 'Las decisiones ya están tomadas.',
    headlineSecond: 'Y están escritas.',
    standfirst:
      'Prumo comienza un proyecto TypeScript con el framework, la organización de los módulos, las reglas de la base de datos, la conexión de la autenticación y los límites de las pruebas ya elegidos. Cada uno se decidió una sola vez, quedó escrito dentro del proyecto que lo recibe y se convirtió en algo que funciona.',
    commandCaption: 'Node 22.23.4 o posterior y pnpm 10.26 o posterior, en macOS, Linux o Windows.',
    readDocuments: 'Leer los documentos',
    paths: {
      or: 'o',
      cli: {
        heading: 'Desde la terminal',
        body: 'Un comando pregunta qué construir y escribe el proyecto.',
      },
      desktop: {
        heading: 'Con Prumo Desktop',
        body: 'El mismo CLI en una app que crea, lista y ejecuta tus proyectos, en macOS, Linux y Windows.',
        yourSystem: 'Tu sistema',
        hints: {
          macosUnsigned: 'Sin firmar: confírmala una vez con Abrir de todos modos.',
          macosSigned: 'Firmada y notarizada por Apple.',
          linux: 'Sin firmar: instálala con apt o dnf.',
          windows:
            'Sin firmar: Más información y luego Ejecutar de todos modos. Bloqueada donde el Control Inteligente de Aplicaciones está activado.',
        },
        previewNote: `Versiones preliminares sin firmar de la ${desktopVersion}. Todos los builds necesitan Node 22.23.4 o posterior y pnpm 10.26 o posterior.`,
        previewLink: 'Cómo instalarla',
        signedNote:
          'El build para macOS está firmado y notarizado; los de Linux y Windows no. Todos los builds necesitan Node 22.23.4 o posterior y pnpm 10.26 o posterior.',
        signedLink: 'Acerca de Prumo Desktop',
      },
    },
    arrives: {
      heading: 'Un proyecto nuevo llega con dos cosas',
      code: {
        term: 'Código que ya funciona',
        detail:
          'Instalado, conectado y probado al arrancar, no solo al compilar. Cada template está completo en el repositorio y ninguno llama al scaffolder de otro en el momento de la instalación.',
      },
      conventions: {
        term: 'Las convenciones que sigue',
        detail:
          'Una carpeta .prumo/ con las reglas que obedece ese código. Cualquier asistente de IA que trabaje en el repositorio la lee y las conoce sin que nadie tenga que explicarlas. Las convenciones viven en el proyecto, no en la cabeza de alguien.',
      },
      caption: 'Un fragmento de un proyecto generado con --types api,web',
    },
    types: {
      heading: 'Tres tipos, y de qué está hecho cada uno',
      note: 'Un tipo produce ese proyecto solo. Varios producen un workspace de pnpm con el contrato de comunicación compartido, así que un cambio de un lado rompe el otro en el typecheck.',
      rows: [
        {
          type: 'api',
          role: 'El servidor',
          parts: [
            'Fastify con una estructura domain/infra',
            'tsyringe y Zod',
            'MikroORM sobre PostgreSQL',
            'Autenticación JWT propia',
            'Swagger UI',
            'Vitest con Testcontainers',
          ],
        },
        {
          type: 'web',
          role: 'La app del navegador',
          parts: [
            'Vite, Next o Astro, con React',
            'El mismo inicio de sesión en todos',
            'Tailwind y shadcn/ui',
            'Formularios validados con Zod',
          ],
        },
        {
          type: 'mobile',
          role: 'La app del celular',
          parts: [
            'Expo con Expo Router',
            'NativeWind y MMKV',
            'Tokens guardados en expo-secure-store',
            'Ejecutada en una development build',
          ],
        },
      ],
    },
    silence: {
      heading: 'Nada importante se decide por omisión',
      body: 'Cada pregunta que hace el CLI también tiene una flag, que es como se ejecuta en CI sin terminal. Fuera de una terminal interactiva, una respuesta que falta es un error, no un valor por defecto.',
    },
    record: {
      heading: 'El stack está fijado, y lo dice',
      body: 'Un documento nombra cada paquete, cada versión mínima y las diecinueve entradas que se descartaron a propósito. Está escrito para tomarse como algo dado: un proyecto generado lo hereda entero, y nada queda por resolver de nuevo en cada proyecto.',
      link: 'Abrir el stack fijado',
    },
    desktop: {
      heading: 'Prumo Desktop',
      body: `Una aplicación de escritorio que crea proyectos Prumo, los lista, lee sus convenciones y ejecuta sus apps. La versión ${desktopVersion}, una versión preliminar sin firmar para macOS, Linux y Windows, ya se puede descargar.`,
      link: 'Ver en qué estado está',
    },
  },
  start: {
    title: 'Empezar',
    description:
      'Revisar la computadora, generar un proyecto y ver qué llegó. Cuatro pasos, con la flag de cada pregunta.',
    heading: 'Empezar',
    standfirst:
      'Generar un proyecto lleva un comando. Esta página cubre lo que la computadora necesita antes, lo que pregunta el CLI y lo que llega.',
    steps: [
      {
        heading: 'Revisa la computadora',
        body: 'Prumo necesita Node 22.23.4 o posterior y pnpm 10.26 o posterior, en macOS, Linux o Windows. En Windows se ejecuta de forma nativa: el proyecto vive en una carpeta de Windows y lo ejecutan el Node y el pnpm de Windows. Dentro de una distribución de WSL, con su propio Node, pnpm y Docker, Prumo está en Linux, que es compatible, aunque no se prueba en WSL en particular; las herramientas de Windows que trabajan sobre un proyecto dentro del sistema de archivos de WSL no son compatibles. Todo lo que tenga una API también necesita Docker, porque ahí corre la base de datos de desarrollo: en Windows, Docker Desktop con su backend WSL2, configurado para contenedores Linux. Este comando lo revisa todo y dice qué falta.',
        command: commands.doctor,
      },
      {
        heading: 'Genera el proyecto',
        body: 'Pregunta qué construir, escribe el proyecto en my-app/, ejecuta git init e instala. No se hace ningún commit, así que el primer commit es tuyo y su diff muestra todo lo que escribió Prumo.',
        command: commands.create,
      },
      {
        heading: 'Responde sin terminal',
        body: 'Cada pregunta tiene una flag, y sin terminal cada pregunta que surge de las respuestas necesita la suya: una flag que falta es un error. Más de un tipo forma un workspace; un solo tipo necesita --alone o --monorepo para decir cómo se organiza.',
        command: commands.unattended,
      },
      {
        heading: 'Crea la base de datos',
        body: 'Dentro de un proyecto con API, esto crea la base de datos de desarrollo en Docker, escribe su URL en .env y ejecuta las migraciones, salvo que se pase --skip-migrate. Una vez que la base de datos existe, prumo clean quita la preparación que el proyecto necesitó una sola vez.',
        command: commands.database,
      },
    ],
    flags: {
      heading: 'Las flags',
      columns: { flag: 'Flag', answers: 'Qué responde' },
      rows: [
        {
          flag: '--types api,web,mobile',
          answers:
            'Qué contiene el proyecto. Más de un tipo forma un workspace; web:vite, web:next o web:astro elige el framework web, Vite por defecto',
        },
        { flag: '--alone   --monorepo', answers: 'Cómo se organiza un solo tipo' },
        {
          flag: '--multi-tenant   --single-tenant',
          answers:
            'Con una api, web o mobile: si la aplicación atiende a varios inquilinos. Multi-tenant incluye las convenciones de multi-tenancy; el código generado en sí todavía no distingue inquilinos',
        },
        {
          flag: '--single-language   --multi-language',
          answers:
            'Si el proyecto habla un idioma, con sus textos escritos donde se muestran, o varios, desde mensajes: un archivo por idioma, comparado con una base, para que otro idioma sea un archivo y su traducción',
        },
        {
          flag: '--languages en,pt-BR,es-419',
          answers:
            'Los idiomas: exactamente uno con --single-language, o con --multi-language uno o más, la base primero. Prumo traduce sus plantillas a estos tres',
        },
        {
          flag: '--mcp   --no-mcp',
          answers:
            'Con una api y una web: si los asistentes de IA llegan a la API por MCP, con la sesión del usuario',
        },
        {
          flag: '--sign-in password,email-code,phone-code',
          answers:
            'Con una api: cómo inician sesión las personas, una forma o más: una contraseña, o un código de 6 dígitos enviado por email o por SMS, y el primero crea la cuenta',
        },
        {
          flag: '--email   --no-email',
          answers:
            'Con una api y password: verificación de email y restablecimiento de contraseña, con un código de 6 dígitos enviado por el puerto Mailer, que escribe en el log hasta que le des un proveedor',
        },
        {
          flag: '--social google,apple   --no-social',
          answers: 'Con una api y una web o mobile: inicio de sesión con Google, Apple o ambos',
        },
        { flag: '--skip-install', answers: 'Se detiene después de escribir los archivos' },
      ],
    },
    landed: {
      heading: 'Qué llegó',
      columns: { file: 'Archivo', what: 'Qué es' },
      rows: [
        {
          file: '.prumo/',
          what: 'Las convenciones, en diecisiete áreas. Solo se copian las áreas que piden las respuestas',
        },
        {
          file: '.prumo/INDEX.md',
          what: 'Una línea por documento. Lo genera la herramienta, y se puede regenerar sin riesgo',
        },
        {
          file: '.context/INDEX.md',
          what: 'Las reglas propias del proyecto, que valen por encima de .prumo/. Nace vacío; el asistente agrega una regla cuando el desarrollador la enuncia',
        },
        {
          file: 'AGENTS.md',
          what: 'El puntero a .context/ y .prumo/, que leen Codex, Cursor, Copilot, Gemini CLI y otros',
        },
        { file: 'CLAUDE.md', what: 'Un import de @AGENTS.md, para Claude Code' },
      ],
    },
  },
  concepts: {
    title: 'Convenciones',
    description:
      'Qué es la carpeta .prumo/, cuáles de sus diecisiete áreas recibe un proyecto y de quién es después.',
    heading: 'Las convenciones viven en el proyecto',
    standfirst:
      'Un proyecto generado lleva una carpeta .prumo/. Por eso Prumo no es un scaffolder: el código llega con las reglas que sigue, escritas, en el repositorio donde se hace el trabajo.',
    areas: {
      heading: 'Diecisiete áreas, y solo las que aplican',
      body: 'Solo core se incluye siempre, porque todo lo que contiene vale para cualquier tipo. El resto sigue a las respuestas, ya que un consejo sobre una plataforma que el proyecto no tiene es peor que ningún consejo.',
      always: 'Siempre',
      conditional: 'Solo cuando las respuestas lo piden',
    },
    assistants: {
      heading: 'Sin atarse a un asistente',
      body: '.prumo/ es la única fuente de verdad de lo que trae Prumo, y .context/ de lo que el proyecto decide por sí mismo, que vale cuando los dos discrepan. Ambos se mantienen neutrales. El scaffolder escribe el archivo de entrada que carga cada herramienta, y nada más: AGENTS.md es el puntero real, que leen Codex, Cursor, Copilot, Gemini CLI y otros, y CLAUDE.md es un import de él. No se generan skills, subagentes ni slash commands, porque eso cambia cada trimestre.',
    },
    ownership: {
      heading: 'Después, son de ustedes',
      body: 'Una vez escritos, esos documentos pertenecen al equipo. Prumo no vuelve a reescribirlos. Actualizar el .prumo/ de un proyecto en su lugar quedó, a propósito, para después de la 1.0.',
    },
  },
  commands: {
    title: 'Comandos',
    description: 'Cada comando que responde el CLI, qué hace y el contrato JSON que todos cumplen.',
    heading: 'Comandos',
    standfirst:
      'El paquete publicado es @stjoseph/prumo y el comando que instala es prumo. Tanto npx como pnpm dlx lo ejecutan sin instalar nada.',
    columns: { command: 'Comando', what: 'Qué hace' },
    rows: [
      {
        command: 'prumo new [name | .]',
        what: 'Genera un proyecto. Con ., en el directorio actual, que tiene que estar vacío',
      },
      {
        command: 'prumo db',
        what: 'Dentro de un proyecto con API: crea la base de datos de desarrollo en Docker, escribe su URL en .env y ejecuta las migraciones, salvo que se pase --skip-migrate',
      },
      {
        command: 'prumo clean',
        what: 'Quita lo que el proyecto necesitó una sola vez, hoy la preparación de la base de datos, cuando la base de datos ya existe. Solo la versión de Prumo que generó el proyecto lo limpia',
      },
      {
        command: 'prumo doctor',
        what: 'Revisa Node, pnpm, git y Docker en esta computadora, y que Docker ejecute contenedores Linux',
      },
      {
        command: 'prumo version',
        what: 'Imprime la versión del CLI. También --version y -v',
      },
      {
        command: 'prumo help [command]',
        what: 'Lista los comandos, o describe uno. También --help',
      },
    ],
    json: {
      heading: 'Todos los comandos aceptan --json',
      body: 'La salida estándar pasa a contener exactamente un documento. Lo que se escribe para una persona va a la salida de error, no se pregunta nada, y el código de salida es 0 solo cuando ok es true.',
    },
  },
  desktop: {
    title: 'Prumo Desktop',
    description:
      'Una aplicación de escritorio para Prumo, en macOS, Linux y Windows. Crea y lista proyectos, ejecuta sus apps y su base de datos, y lee sus convenciones; las versiones preliminares sin firmar se descargan desde GitHub Releases.',
    heading: 'Prumo Desktop',
    standfirst:
      'Una aplicación de escritorio que crea proyectos Prumo, los lista, lee las convenciones de .prumo/ y ejecuta sus apps, cada una en su propio panel de terminal.',
    download: {
      heading: 'Descarga',
      body: `La versión ${desktopVersion} es preliminar, para macOS, Linux y Windows. Elige el archivo de tu sistema y tu arquitectura. En todos los sistemas la app necesita Node 22.23.4 o posterior, pnpm 10.26 o posterior y git; los revisa, pero nunca los instala. Docker solo hace falta para la base de datos de una API.`,
      button: 'Descargar desde GitHub Releases',
      yourSystem: 'Tu sistema',
      systems: {
        macos: { name: 'macOS', arch: 'Apple silicon e Intel' },
        linux: { name: 'Linux', arch: 'x64' },
        windows: { name: 'Windows', arch: 'x64' },
      },
      builds: {
        'dmg-arm64': 'Apple silicon (M1 o posterior)',
        'dmg-x64': 'Intel',
        deb: 'Debian, Ubuntu y derivados',
        rpm: 'Fedora, openSUSE y otros sistemas rpm',
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
        install: 'Abre el dmg y arrastra Prumo Desktop a Aplicaciones.',
        warning: {
          label: 'Versión preliminar sin firmar',
          lead: 'Una versión preliminar, sin firmar ni notarizar por Apple. macOS te pide que la confirmes la primera vez que se abre.',
          stepsHeading: 'Abrirla por primera vez (macOS 15 o posterior)',
          steps: [
            'Abre Prumo Desktop desde Aplicaciones. macOS avisa que Apple no puede verificar que la app no contenga software malicioso. Cierra el aviso sin trasladar la app a la papelera.',
            'Selecciona menú Apple > Configuración del Sistema y haz clic en Privacidad y seguridad en la barra lateral. Es posible que tengas que desplazarte hacia abajo.',
            'En Seguridad, haz clic en Abrir de todos modos. El botón está disponible durante aproximadamente una hora después de que intentaste abrir la app.',
            'Ingresa tu contraseña de inicio de sesión y haz clic en OK. Cuando vuelva a aparecer el aviso, haz clic en Abrir.',
          ],
          guideBefore:
            'Desde entonces se abre como cualquier otra app. Apple describe estos pasos en',
          guideLink: 'Abrir una app de la Mac de un desarrollador desconocido',
          guideUrl: 'https://support.apple.com/es-lamr/guide/mac-help/mh40616/mac',
        },
      },
      linux: {
        install: 'Instala el paquete con el gestor de paquetes de tu distribución.',
        warning: {
          label: 'Paquetes sin firmar',
          body: 'Los paquetes para Linux no están firmados, esté firmado o no el build para macOS. apt y dnf instalan un paquete local sin pedir una firma.',
        },
      },
      windows: {
        install:
          'Ejecuta el Setup.exe. Instala solo para tu usuario, sin pedir permisos de administrador, y agrega Prumo Desktop al menú Inicio.',
        tools:
          'Node, pnpm y git tienen que estar instalados en el propio Windows. La app los encuentra a través del PATH guardado en el registro y de las carpetas de instalación habituales, o con su botón Elegir Node…; los proyectos dentro de WSL no son compatibles.',
        channel:
          'GitHub Releases es el único canal para Windows. Microsoft Store no está en los planes por ahora.',
        warning: {
          label: 'Instalador sin firmar',
          smartScreen:
            'SmartScreen de Microsoft Defender avisa antes de abrir una app que todavía no conoce. En el aviso, elige Más información y luego Ejecutar de todos modos, cuando Windows lo ofrezca.',
          smartAppControl:
            'El Control Inteligente de Aplicaciones bloquea las apps sin firmar, y no hay forma de hacer una excepción para una sola app. Donde está activado, Prumo Desktop no se puede instalar a menos que lo desactives en Seguridad de Windows.',
          guideBefore: 'Microsoft lo explica en',
          guideLink: 'Preguntas más frecuentes sobre Control Inteligente de Aplicaciones',
          guideUrl:
            'https://support.microsoft.com/es-mx/topic/what-is-smart-app-control-285ea03d-fa88-4d56-882e-6698afdb7003',
        },
      },
      updates:
        'Ningún build se actualiza solo. Cuando sale una versión más nueva, la app lo avisa al pie de su barra lateral, con un enlace a ella: reemplaza la app en macOS, instala el paquete nuevo sobre el anterior en Linux o ejecuta el Setup.exe nuevo en Windows. Tus proyectos y tu configuración se quedan donde están. En macOS, la primera versión firmada también hay que instalarla a mano, una vez.',
    },
    consumer: {
      heading: 'Un consumidor de Prumo, nunca una segunda implementación',
      body: 'Desktop incluye una copia fijada del CLI y la ejecuta, y la actualiza dentro de la misma versión minor (0.5.x), nunca a otra: una minor nueva llega con un Desktop nuevo. Todo lo que sabe de un proyecto viene de lo que ese CLI expone a propósito, sus comandos con --json, y de los archivos que lleva un proyecto generado.',
    },
    status: {
      heading: 'En qué estado está',
      body: `La versión ${desktopVersion} funciona en macOS, Linux y Windows como versiones preliminares sin firmar. Crea y lista proyectos, ejecuta sus apps y su base de datos, y lee su .prumo/. Cada decisión de tecnología tiene que funcionar en los tres sistemas.`,
      done: 'Listo',
      next: 'En construcción',
      later: 'Más adelante',
      items: <StatusItem[]>[
        {
          state: 'done',
          heading: 'El spike',
          body: 'Una rama descartable probó las partes riesgosas en macOS antes de que existiera cualquier interfaz. Todas las pruebas pasaron.',
        },
        {
          state: 'done',
          heading: 'La base',
          body: 'La capa de entorno, la capa de procesos, el contrato de IPC y una primera pantalla. Iniciar, detener un árbol completo de procesos, búferes de terminal, y detener todo al salir.',
        },
        {
          state: 'done',
          heading: 'Las funciones de la 0.0.1',
          body: 'La lista de proyectos, crear un proyecto con todas las preguntas del CLI, ejecutar apps, la base de datos y leer .prumo/.',
        },
        {
          state: 'done',
          heading: 'Una versión preliminar sin firmar',
          body: 'Las versiones preliminares 0.0.x para macOS, en GitHub Releases: con firma ad hoc, sin notarizar y sin actualizarse nunca solas.',
        },
        {
          state: 'done',
          heading: 'Versiones preliminares para Linux y Windows',
          body: 'Desde la 0.0.3, un deb y un rpm sin firmar para Linux y un Setup.exe sin firmar para Windows, todos x64. Todo build que no se actualiza solo avisa cuando sale una versión más nueva.',
        },
        {
          state: 'later',
          heading: 'arm64 para Linux y Windows',
          body: 'Los builds para Linux y Windows son solo x64, lo que cubre cualquier computadora Intel o AMD. Los builds arm64 de ambos están planeados y llegarán cuando alguien los pida.',
        },
        {
          state: 'later',
          heading: 'Un build para macOS firmado y notarizado',
          body: 'Reemplaza la versión preliminar para macOS: sin el paso de Abrir de todos modos, y con actualizaciones que llegan solas. Pasar a él requiere reinstalar a mano una vez.',
        },
      ],
    },
    follow: {
      heading: 'Síguelo',
      body: 'Desktop se construye a la vista, una pieza a la vez. El repositorio contiene lo que ya funciona y lo que está en curso.',
      repository: 'Abrir el repositorio',
    },
  },
  documents: {
    title: 'Documentos',
    description:
      'Los documentos del propio Prumo, leídos de los repositorios donde viven, en el commit al que está fijado este sitio.',
    heading: 'Documentos',
    standfirst:
      'Estos archivos viven en los repositorios, no aquí. El sitio los lee en el commit al que está fijado y los muestra sin cambios, así que nada de esta página puede apartarse de lo que realmente dicen los proyectos.',
    groups: {
      prumo: 'Prumo',
      desktop: 'Prumo Desktop',
    },
    englishNotice:
      'Este documento vive en el repositorio y se mantiene en inglés. El sitio no lo traduce.',
    pinnedAt: 'Fijado en',
  },
  footer: {
    by: 'Por',
    stjosephWorks: 'St. Joseph Works',
    describing: 'Describe Prumo',
    license: 'Licencia MIT',
    builtWith:
      'Este sitio lo generó Prumo, como un proyecto de tipo site: el tipo que hoy es web:next.',
    sections: {
      product: 'Prumo',
      documents: 'Documentos',
      elsewhere: 'En otros sitios',
    },
    npm: 'Paquete en npm',
    repository: 'Repositorio',
    desktopRepository: 'Repositorio de Desktop',
  },
  notFound: {
    title: 'No encontrado',
    heading: 'Aquí no hay nada',
    body: 'Esa página no existe. Los documentos están aquí.',
    link: 'Ver los documentos',
  },
}
