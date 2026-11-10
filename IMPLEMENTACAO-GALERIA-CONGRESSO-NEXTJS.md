# Implementação — Galerias Automáticas de Fotos e Vídeos do Congresso (Next.js)

> **Instrução principal para o Codex:** implemente as funcionalidades descritas neste documento **no projeto Next.js existente**, preservando a arquitetura, a identidade visual e as funcionalidades atuais. **Antes de alterar arquivos, inspecione o repositório** e adapte estas orientações à versão do Next.js, ao roteamento e à hospedagem realmente utilizados. Não presuma que o projeto está em App Router, na Vercel ou que já possui banco de dados.

## 1. Contexto e objetivo

O site do Congresso precisa exibir dois tipos de conteúdo que a equipe atualizará durante o evento, **sem necessidade de editar o código ou fazer um novo deploy a cada publicação**:

1. **Galeria de fotos:** a equipe adiciona imagens a uma pasta definida no Google Drive. O site detecta as novas fotos e as disponibiliza em uma galeria visual, preferencialmente separada pelos dias do evento.
2. **Galeria de vídeos:** a equipe publica vídeos no YouTube e os adiciona a uma playlist determinada. O site apresenta os novos vídeos automaticamente, com título, miniatura e reprodução pelo player oficial do YouTube.

**Prioridade:** entregar primeiro um MVP estável, seguro e funcional. Evitar criar painel administrativo, banco de dados, filas ou infraestrutura nova se o projeto já dispuser de alternativas adequadas. A automação de fotos será compatível com as limitações reais da hospedagem; não prometer sincronização a cada 5 minutos sem infraestrutura que a execute.

## 2. Como o fluxo deve funcionar

### Fotos

```text
Equipe do evento
   -> envia JPG/PNG/WebP ao Google Drive
   -> integração no servidor do Next.js lê a pasta autorizada
   -> cache e/ou sincronização para armazenamento adequado
   -> API interna publica apenas metadados e URLs seguras
   -> interface do Congresso exibe a galeria
```

### Vídeos

```text
Equipe do evento
   -> publica o vídeo no YouTube e adiciona à playlist do Congresso
   -> integração no servidor consulta a YouTube Data API v3
   -> cache de metadados (títulos, miniaturas e IDs)
   -> interface exibe os cards e abre o player do YouTube
```

## 3. ETAPA ZERO — Auditoria do repositório (obrigatória)

Antes da implementação:

- Ler `package.json`, `next.config.*`, `tsconfig.json/jsconfig.json`, variáveis de ambiente de exemplo e a estrutura de `app/`, `src/app/`, `pages/` e componentes atuais.
- Identificar versão do Next.js, App Router ou Pages Router, TypeScript ou JavaScript, padrões de componentes, biblioteca visual, estilos e solução de cache já presentes.
- Descobrir onde a página do Congresso está implementada e **reaproveitar a página e o design existentes**, em vez de criar uma seção desconectada ou substituir conteúdo.
- Verificar se já há integração com Google, YouTube, biblioteca de imagens, provedor de armazenamento, banco de dados, autenticação e cron.
- Identificar, se possível, a hospedagem real (Vercel, VPS/Docker, cPanel etc.) e se a aplicação possui execução de código no servidor. **Exportação estática pura (`output: 'export'`) não comporta Route Handlers/API Routes dinâmicos.**
- Verificar alterações locais e **não sobrescrever trabalho existente** nem executar comandos destrutivos.
- Explicar brevemente a arquitetura identificada e o plano concreto antes de realizar alterações relevantes.

Se uma configuração essencial ainda não existir (por exemplo, credenciais Google, ID da pasta ou playlist), implementar a estrutura possível com variáveis de ambiente e estados de erro amigáveis; **documentar o que falta, sem inventar IDs, tokens ou declarar testes externos como aprovados**.

## 4. Requisitos funcionais — Galeria de fotos

### 4.1 Fonte de dados

- Usar a **Google Drive API v3**, somente no servidor.
- Ler arquivos em uma **pasta raiz configurável**, com possibilidade de subpastas representando os dias do Congresso, caso essa organização seja adotada no Drive.
- Consultar somente arquivos de imagem permitidos (`image/jpeg`, `image/png`, `image/webp`; outros formatos apenas quando suportados de maneira segura).
- Ignorar arquivos na lixeira, documentos que não sejam imagens e arquivos inválidos.
- Considerar paginação (`nextPageToken`) em listagens de arquivos e subpastas.
- Ler apenas campos necessários, como `id`, `name`, `mimeType`, `modifiedTime`, `size`, `parents` e `description` quando útil.
- Ordenar de maneira consistente; permitir agrupamento por dia quando as pastas estiverem estruturadas dessa forma.
- Exibir um estado vazio adequado se ainda não houver fotos.

### 4.2 Autenticação e permissões

- Priorizar autenticação **server-to-server** com uma conta de serviço do Google, **somente se a política e o tipo de conta Google permitirem que a pasta seja acessada pela conta de serviço**.
- Compartilhar apenas a pasta necessária com a identidade autorizada, concedendo o mínimo de permissões (preferencialmente leitura).
- Se a conta de serviço não puder acessar a pasta, avaliar OAuth 2.0 com credenciais adequadas e explicar os requisitos; não mudar a pasta para pública como atalho.
- Nunca enviar as credenciais nem tokens de acesso para o navegador.
- Nunca confiar em um ID arbitrário de arquivo recebido do usuário: verificar se pertence ao conjunto permitido antes de retornar conteúdo.

### 4.3 Entrega das fotos ao navegador: duas opções

**Opção recomendada para produção / maior volume:**

1. Executar um processo de sincronização no servidor.
2. Descobrir fotos novas ou modificadas a partir do Drive.
3. Baixar as imagens autorizadas e, quando necessário, gerar versões otimizadas e miniaturas.
4. Salvar em armazenamento persistente apropriado, como Cloudflare R2, S3 ou armazenamento equivalente **já adotado pelo projeto**.
5. Manter um índice persistente de `driveFileId`, origem/pasta, data de modificação, URL da imagem, thumbnail e status. Reutilizar o banco existente, se houver; se não houver, propor armazenamento durável mínimo apropriado à infraestrutura.
6. Publicar as URLs das cópias sincronizadas na galeria.
7. Tornar a sincronização **idempotente**, com controle de duplicação, falhas parciais, reexecução, paginação e concorrência.

**Opção de MVP, se não houver armazenamento persistente configurado:**

- Consultar metadados do Drive a partir do servidor e servir as imagens por uma rota de proxy controlada no Next.js (por exemplo, `GET /api/congresso/fotos/[id]`).
- Validar o arquivo contra a pasta autorizada; restringir formato/tamanho e implementar cabeçalhos de cache adequados.
- Não expor URLs temporárias de thumbnail como URLs públicas permanentes; não colocar segredos no front-end.
- Evitar carregar todas as imagens em tamanho original na listagem; considerar miniaturas e paginação.
- **Documentar o custo e a limitação dessa alternativa**, especialmente volume de tráfego, chamadas à API e latência.

**Importante:** não escrever novas imagens em `public/` em tempo de execução quando a hospedagem não possuir armazenamento local persistente (ex.: serverless). Não tornar o Drive inteiro público.

### 4.4 Interface da galeria

- Implementar dentro da página ou seção já existente do Congresso, mantendo a identidade visual do projeto.
- Grade responsiva de fotos, miniaturas com proporções consistentes e visualização ampliada em modal/lightbox.
- Navegação acessível no modal, botão para fechar, controle por teclado, descrições `alt` úteis e carregamento progressivo/lazy loading.
- Se existirem pastas por dia, fornecer filtro simples por dia, sem exigir configuração complicada.
- Tratar erros, imagens ausentes, estados vazios e carregamento sem quebrar a página.
- Se usar `next/image`, configurar de maneira restritiva os domínios/padrões de URL necessários; não permitir origem remota genérica sem necessidade.

## 5. Requisitos funcionais — Galeria de vídeos

### 5.1 Integração

- Usar a **YouTube Data API v3** para montar cards personalizados, se isso estiver alinhado com o visual existente.
- Consultar `playlistItems.list` com `part=snippet,contentDetails`, `playlistId`, `maxResults` (até 50) e `pageToken` quando necessário.
- Extrair `videoId`, título, descrição curta quando pertinente, miniatura e posição na playlist.
- Ignorar itens privados, removidos ou sem `videoId` válido; exibir alternativa quando a miniatura não existir.
- Reproduzir pelo **player incorporado oficial do YouTube**, sem baixar vídeos ou hospedá-los no servidor.
- Guardar a chave da API **somente no servidor** e aplicar cache para evitar consumo desnecessário de cota.
- Tratar falhas de rede, quota e playlist inexistente com mensagem amigável e, quando houver cache persistente válido, apresentar os últimos dados conhecidos.

### 5.2 Alternativa de MVP mais rápida

Caso a API não esteja configurada ou o tempo seja muito curto, implementar primeiro a **playlist oficial incorporada** com o ID configurável, mantendo a possibilidade de evoluir depois para cards personalizados. Documentar a troca de abordagem; não afirmar que foram implementados cards dinâmicos se só houver embed.

### 5.3 Interface de vídeos

- Grade responsiva com título e miniatura de cada vídeo.
- Abrir o vídeo no player oficial, preferencialmente sob demanda (não carregar vários iframes pesados ao mesmo tempo).
- Respeitar acessibilidade e responsividade.
- Preservar ordenação da playlist ou outra regra definida explicitamente na interface.

## 6. Estratégia de atualização automática

### 6.1 Vídeos

- **Preferência:** buscar os metadados em função no servidor com cache/revalidação de aproximadamente 5–15 minutos, conforme versão e infraestrutura do projeto.
- Evitar chamadas à API do YouTube em cada renderização de cada visitante.
- Na configuração de cache, usar a abordagem compatível com a versão instalada do Next.js. Não copiar cegamente APIs de cache de versões diferentes (`use cache`, `cacheLife`, `unstable_cache` ou opções de `fetch`).
- O usuário deve compreender que **revalidação por tempo pode acontecer na próxima visita após o período**, e não necessariamente como processo ativo em segundo plano.

### 6.2 Fotos

- Com armazenamento persistente: preferir **sincronização agendada** para que o processamento de imagem não aconteça durante a visita do usuário.
- Criar uma rotina reutilizável `syncCongressPhotos()` ou nome equivalente, desacoplada do endpoint HTTP.
- Se houver um agendador disponível, criar endpoint protegido (ex.: `POST /api/cron/sync-fotos` ou método aceito pelo provedor) que execute a rotina.
- Exigir autorização por segredo (`CRON_SECRET` ou mecanismo nativo da plataforma) e retornar status/logs sem vazamento de segredos.
- Configurar execução frequente, como a cada 5 minutos, **somente se o plano de hospedagem e a arquitetura permitirem**. Conferir limites atuais antes de adicionar `vercel.json` ou cron de Linux.
- Para Vercel Hobby, não presumir que um cron a cada 5 minutos é permitido. Em VPS/Docker, avaliar cron externo ou scheduler apropriado.
- Se a hospedagem não permitir cron nessa frequência, adotar MVP por leitura/cache sob demanda e explicar que a atualização ocorre na próxima consulta.
- Prevenir execuções simultâneas, duplicação, timeouts e processamento ilimitado de imagens em uma única execução; para grandes lotes, processar em lotes controlados.
- Política para exclusão: **não apagar automaticamente as fotos publicadas só porque um arquivo sumiu temporariamente do Drive**, sem uma regra de exclusão deliberada.

## 7. Endpoints e módulos sugeridos

> **Referência inicial, não estrutura obrigatória:** usar `src/app` se o projeto já utiliza esse padrão; adaptar a `app/` ou ao Pages Router, se necessário.

```text
src/
├── app/
│   ├── ... página existente do Congresso ...
│   └── api/
│       ├── congresso/
│       │   ├── fotos/route.ts             # metadados da galeria
│       │   ├── fotos/[id]/route.ts        # proxy (somente se MVP precisar)
│       │   └── videos/route.ts            # metadados da playlist
│       └── cron/
│           └── sync-fotos/route.ts        # só se houver scheduler adequado
├── components/
│   └── congresso/
│       ├── GaleriaFotos.tsx
│       ├── ModalFoto.tsx
│       └── GaleriaVideos.tsx
├── lib/
│   └── congresso/
│       ├── google-drive.ts
│       ├── youtube.ts
│       ├── photos.ts
│       └── sync-photos.ts
└── types/
    └── congresso.ts
```

**Modelos de dados sugeridos (adaptar ao projeto):**

```ts
export type CongressPhoto = {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  thumbnailUrl?: string;
  day?: string;
  modifiedTime?: string;
};

export type CongressVideo = {
  id: string;             // ID do vídeo no YouTube
  title: string;
  thumbnailUrl?: string;
  description?: string;
  position?: number;
};
```

**Endpoints públicos, se fizerem sentido no repositório:**

- `GET /api/congresso/fotos`: resposta paginada com fotos publicáveis (sem dados privados do Drive).
- `GET /api/congresso/videos`: lista paginada ou limitada de vídeos da playlist (sem expor API key).
- `GET /api/congresso/fotos/[id]`: apenas quando necessário ao proxy seguro; validar permissões antes de entregar bytes.
- Endpoint de cron: **não público**, com autenticação por segredo e prevenção de concorrência.

Não criar endpoints redundantes se Server Components puderem consumir diretamente funções server-only ou se já existir infraestrutura equivalente.

## 8. Variáveis de ambiente (exemplos; sem valores reais)

Criar/atualizar `.env.example` **sem adicionar nenhuma credencial verdadeira**. Utilizar somente as variáveis de fato necessárias à solução selecionada.

```dotenv
# YouTube
YOUTUBE_PLAYLIST_ID=INSERIR_ID_DA_PLAYLIST
YOUTUBE_API_KEY=INSERIR_CHAVE_NO_AMBIENTE_DO_SERVIDOR

# Google Drive
GOOGLE_DRIVE_FOLDER_ID=INSERIR_ID_DA_PASTA_RAIZ
# Escolher forma de autenticação de acordo com as permissões reais:
GOOGLE_SERVICE_ACCOUNT_JSON=INSERIR_JSON_EM_UMA_LINHA_OU_USAR_SECRET_MANAGER
# Alternativamente: GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY, ou OAuth.

# Agendador (somente se for adotado)
CRON_SECRET=CONFIGURAR_SEGREDO_FORTE

# Armazenamento persistente (somente se for adotado)
R2_ACCOUNT_ID=CONFIGURAR
R2_ACCESS_KEY_ID=CONFIGURAR
R2_SECRET_ACCESS_KEY=CONFIGURAR
R2_BUCKET_NAME=CONFIGURAR
R2_PUBLIC_BASE_URL=CONFIGURAR_URL_PUBLICA_CONTROLADA
```

Regras:

- Validar configuração apenas quando a integração correspondente for usada, para não derrubar o build sem necessidade.
- Não usar `NEXT_PUBLIC_` para tokens, chaves privadas ou segredos.
- Nunca versionar `.env.local`, JSON de credenciais ou tokens reais.
- Documentar passo a passo para habilitar APIs, configurar permissões do Drive, obter ID da pasta e ID da playlist.

## 9. Segurança, desempenho e confiabilidade

- Segredos exclusivamente no servidor; mascarar informações sensíveis nos logs.
- Não construir URLs de download a partir de entradas arbitrárias do usuário.
- Limitar tamanho e formato das imagens aceitas; lidar com imagens corrompidas e falhas de download.
- Implementar paginação de listagens e carga progressiva de miniaturas.
- Usar cache com prazo adequado; proteger integrações contra estouro de quota.
- Evitar exposição acidental de arquivos privados que estejam fora da pasta autorizada.
- Garantir URLs estáveis para fotos publicadas ou implementar proxy com cache bem definido.
- Fornecer mensagens de erro e estados vazios em português.
- Não introduzir dependências ou serviços externos sem necessidade; usar bibliotecas já presentes quando viável.
- Não criar mock permanente exibido como dado real em produção.
- Respeitar requisitos de privacidade/direitos de imagem aplicáveis às fotos publicadas do evento.

## 10. Ordem de implementação

### Fase 1 — Inventário e integração com UI

1. Inspecionar repositório, confirmar versão do Next.js, hospedagem, roteamento e componentes existentes.
2. Identificar a seção/página onde galerias serão exibidas.
3. Criar tipos, componentes base e estados de carregamento, erro e conteúdo vazio.
4. Manter os estilos e a estrutura existentes.

### Fase 2 — Vídeos (menor risco)

1. Criar `youtube.ts` no servidor para listar vídeos da playlist ou, no MVP mais simples, incorporar a playlist.
2. Adicionar cache compatível com a versão real do Next.js.
3. Implementar grade responsiva e player sob demanda se a opção API estiver disponível.
4. Testar playlist vazia, vídeo privado/removido, erro de API e renderização no celular.

### Fase 3 — Fotos

1. Implementar autenticação do Drive e listar somente arquivos autorizados.
2. Mapear pastas/dias, tratar paginação e validar tipos de arquivo.
3. Escolher e implementar **uma estratégia real de entrega das imagens**: armazenamento persistente sincronizado (preferido quando disponível) ou proxy seguro com cache (MVP).
4. Implementar galeria responsiva e lightbox.
5. Confirmar comportamento ao adicionar novas fotos, remover/alterar arquivos e quando o Drive estiver temporariamente indisponível.

### Fase 4 — Atualização e operação

1. Configurar cache/revalidação para a playlist.
2. Se houver infraestrutura, configurar sincronização incremental das fotos via scheduler protegido.
3. Testar reexecução da sincronização e ausência de duplicações.
4. Documentar limites da hospedagem, atrasos esperados e como forçar uma sincronização **de forma autenticada** se necessário.

### Fase 5 — Verificação final

1. Rodar lint, checagem de tipos, testes existentes e build de produção; corrigir falhas introduzidas.
2. Fazer testes manuais locais com credenciais válidas, quando disponíveis, e testar interface desktop/mobile.
3. Verificar que as credenciais não aparecem no HTML, nas requisições do navegador ou no repositório.
4. Registrar claramente o que foi validado com serviços reais e o que permaneceu não testado por falta de acesso/configuração.

## 11. Critérios de aceite

- [ ] O projeto existente continua funcionando; páginas e componentes atuais não foram prejudicados.
- [ ] A galeria de fotos aparece de forma responsiva e permite ampliar imagens.
- [ ] A galeria de fotos não exibe documentos, arquivos não autorizados nem imagens inválidas.
- [ ] Novas imagens enviadas ao Drive passam a aparecer conforme a estratégia de sincronização/cache adotada, sem edição de código.
- [ ] A estratégia de atualização de fotos é descrita honestamente (cron real ou atualização na próxima consulta).
- [ ] A galeria de vídeos usa a playlist configurada e reproduz vídeos pelo YouTube.
- [ ] Novos vídeos entram na galeria após a atualização de cache/consulta, sem novo deploy.
- [ ] Segredos e credenciais ficam exclusivamente no backend e fora do Git.
- [ ] Há tratamento para APIs indisponíveis, falta de credenciais e conteúdo vazio.
- [ ] Dependências, limites e passos de configuração estão documentados.
- [ ] Lint, typecheck e build passam, ou são relatadas limitações anteriores com evidência.

## 12. O que o Codex deve apresentar ao finalizar

Forneça um resumo objetivo com:

1. **Arquitetura encontrada no projeto** (versão do Next, roteamento, hospedagem identificada e decisões técnicas).
2. **Arquivos criados/modificados**, incluindo rotas e componentes.
3. **Fluxo efetivo de fotos e vídeos**, explicando de onde vêm, onde ficam e quando atualizam.
4. **Variáveis de ambiente ainda necessárias**, sem revelar valores secretos.
5. **Passo a passo para habilitar as duas integrações** e começar a publicar conteúdo.
6. **Testes executados e seus resultados reais**; separar limitações de ambiente de erros no código.
7. **Pendências para produção**, se houver (por exemplo, credenciais, storage, agendador e acesso às pastas).

## 13. Restrições importantes ao Codex

- Não alterar projeto inteiro, dependências principais ou estratégia de deploy sem justificativa técnica.
- Não adicionar banco de dados ou serviço de armazenamento novo automaticamente se uma solução existente resolver com segurança.
- Não assumir que a conta do Drive permite service account: verificar e registrar pré-requisitos.
- Não presumir que `cron` está ativo apenas por existir um arquivo de configuração.
- Não afirmar “100% automático” quando a implementação apenas atualiza após nova visita/revalidação.
- Não deixar segredos expostos nem incluir credenciais de exemplo que pareçam reais.
- Em caso de impedimento externo, **avançar com a implementação possível e produzir uma lista curta das ações que dependem do responsável pelo projeto**, em vez de inventar valores.

## 14. Referências técnicas oficiais

- Next.js — Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Next.js — Revalidation: https://nextjs.org/docs/app/getting-started/revalidating
- Next.js — Cache (modelo anterior): https://nextjs.org/docs/app/guides/caching-without-cache-components
- Google Drive API — Listar arquivos: https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list
- Google Drive API — Obter arquivo: https://developers.google.com/workspace/drive/api/reference/rest/v3/files/get
- YouTube Data API — Itens de playlist: https://developers.google.com/youtube/v3/docs/playlistItems/list
- YouTube — IFrame Player: https://developers.google.com/youtube/iframe_api_reference
- Vercel — Cron Jobs: https://vercel.com/docs/cron-jobs

---

**Comando para o Codex:** "Leia este documento por completo. Inspecione primeiro o repositório Next.js que está aberto. Em seguida, implemente as galerias do Congresso em etapas, priorizando o MVP seguro e funcional. Preserve a arquitetura e o visual existentes. Ao final, mostre os arquivos modificados, testes executados, configurações pendentes e limitações reais da hospedagem."
