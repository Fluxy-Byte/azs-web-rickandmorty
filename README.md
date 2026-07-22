# Rick and Morty Episódios

Aplicação web para explorar os episódios da série **Rick and Morty**, marcar episódios como favoritos, acompanhar os que já foram assistidos e pesquisar por nome. Os dados vêm da [Rick and Morty API](https://rickandmortyapi.com/) (GraphQL).

![Capa do projeto](src/assets/Capa.png)

## Funcionalidades

- **Início** — destaque visual e prévia dos episódios em destaque e dos favoritos.
- **Episódios** — listagem paginada de todos os episódios, com busca por nome.
- **Favoritos** — marque episódios como favoritos e acompanhe-os em uma tela dedicada.
- **Assistidos** — marque episódios como assistidos para controlar o progresso.
- **Tema claro/escuro** persistido no navegador.
- Estado dos favoritos/assistidos persistido localmente com `redux-persist`.

## Tecnologias utilizadas

**Core**
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool e dev server

**Dados e estado**
- [TanStack React Query](https://tanstack.com/query) — cache e fetching de dados assíncronos
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) — estado global
- [Redux Persist](https://github.com/rt2zz/redux-persist) — persistência de estado no `localStorage`
- [Axios](https://axios-http.com/) — cliente HTTP (consumo da GraphQL API)

**UI**
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (componentes baseados em Radix/Base UI)
- [lucide-react](https://lucide.dev/) — ícones
- [React Router DOM 7](https://reactrouter.com/) — roteamento

**Qualidade e tooling**
- [ESLint](https://eslint.org/) + `typescript-eslint`

**Infraestrutura**
- [Docker](https://www.docker.com/) (multi-stage build) + [Nginx](https://nginx.org/) para servir o build de produção

## Pré-requisitos

Para rodar o projeto localmente você precisa ter instalado:

- [Node.js](https://nodejs.org/) 20 ou superior (recomendado 22, mesma versão usada na imagem Docker)
- npm 10+ (instalado junto com o Node.js)
- Git

Opcionalmente, para rodar via container:

- [Docker](https://www.docker.com/)

> A aplicação consome diretamente a API pública `https://rickandmortyapi.com/graphql`, então não é necessário configurar variáveis de ambiente nem backend próprio.

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone [https://github.com/GabrielLS88/azs-web-rickandmorty](https://github.com/GabrielLS88/azs-web-rickandmorty)
cd rick-and-morty-movies
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Rodar em modo desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173` (porta padrão do Vite).

### 4. Gerar build de produção

```bash
npm run build
```

O resultado é gerado na pasta `dist/`.

### 5. Pré-visualizar o build de produção

```bash
npm run preview
```

### 6. Rodar o linter

```bash
npm run lint
```

## Rodando com Docker

O projeto inclui um `Dockerfile` multi-stage que faz o build da aplicação e a serve com Nginx.

```bash
docker build -t rick-and-morty-movies .
docker run -p 8080:80 rick-and-morty-movies
```

Depois disso, acesse `http://localhost:8080`.

## Estrutura do projeto

```
src/
├── api/            # Funções de chamada à API (camada de serviço)
├── assets/         # Imagens, ícones e demais arquivos estáticos
├── components/     # Componentes reutilizados em toda a aplicação
│   └── ui/         # Componentes de UI gerados via shadcn/ui
├── context/        # Store do Redux e seus slices
│   └── slices/
├── hooks/          # Hooks customizados (ex.: busca de episódios com React Query)
├── lib/            # Integrações com libs externas (ex.: cliente Axios/GraphQL)
├── pages/          # Páginas da aplicação (Início, Episódios, Favoritos, Assistidos)
├── routes/         # Configuração de rotas (React Router)
└── utils/          # Funções utilitárias (ex.: provedor de tema)
```

## API utilizada

O projeto consome a [Rick and Morty API](https://rickandmortyapi.com/documentation) via GraphQL, buscando episódios e os personagens de cada um. Todas as chamadas ficam centralizadas em `src/lib/axios.ts` e expostas através de `src/api/episodes.ts` e dos hooks em `src/hooks/useEpisodes.ts`.
