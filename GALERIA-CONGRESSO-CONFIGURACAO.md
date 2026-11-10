# Galeria do Congresso — implementação e ativação

## O que já está implementado

A seção `#galeria` fica imediatamente antes de `#conferencistas` na página inicial. Mantém a paleta e os elementos do site e tem textos em português, inglês, espanhol e italiano. As 13 fotos da primeira remessa estão incluídas no projeto e aparecem sem configurar o Drive, com rolagem horizontal, três fotos por vez no computador e ampliação ao clicar. A área de vídeos está oculta por padrão, incluindo o título e a mensagem de publicação em breve.

O envio direto pelo próprio site está implementado em `/admin/galeria`, com senha e armazenamento Blob privado na Vercel. Consulte [PAINEL-FOTOS.md](PAINEL-FOTOS.md) para ativação inicial e uso. O Google Drive descrito abaixo passa a ser uma integração opcional.

### Visibilidade dos vídeos — atualização de 10/11/2026

Para mostrar novamente a área, defina `NEXT_PUBLIC_CONGRESS_VIDEOS_ENABLED=true` em `.env.local` e configure a playlist conforme as instruções abaixo. Reinicie o servidor local. Na hospedagem, defina a mesma variável e faça uma nova compilação/publicação, pois variáveis `NEXT_PUBLIC_` são incorporadas durante a compilação. Enquanto a variável estiver ausente ou com valor `false`, o componente de vídeos não é exibido nem faz consultas à API de vídeos. Para ocultar novamente, use `false`.

O projeto usa Next.js 16.4.6, React 19, TypeScript e App Router em `src/app`. O repositório está conectado à publicação na Vercel; o arquivo `netlify.toml` foi preservado como configuração legada. O painel usa armazenamento persistente Blob quando ativado, sem banco relacional ou agendador. O checkout está conectado ao histórico Git do repositório.

Foi implementado o MVP com proxy de fotos e cache sob demanda. Não foi criado cron nem uma sincronização para storage. Apenas a dependência `sharp`, que já era instalada pelo Next, foi declarada diretamente para gerar miniaturas e validar imagens.

## Configuração opcional do Google Drive e YouTube

### Atualização de 09/11/2026

- `YOUTUBE_API_KEY` foi preenchida somente em `.env.local`, ignorado pelo versionamento. Nenhum valor secreto foi incluído neste guia ou no código público.
- Um teste real em `i18nLanguages.list` retornou **HTTP 403 / `API_KEY_HTTP_REFERRER_BLOCKED`**. A chave possui restrição por site/referenciador HTTP, incompatível com esta chamada no servidor. A integração não deve enviar um referenciador falso para contornar essa restrição.
- Conforme a orientação de usar apenas a playlist já criada, o modo padrão passou a ser **playlist oficial incorporada**, independentemente de haver chave salva. **Esse modo dispensa a chave e qualquer ajuste no Google Cloud.** O erro 403 só importa caso seja escolhido, no futuro, o modo opcional de cards via Data API. A configuração externa da chave não foi alterada.
- `YOUTUBE_PLAYLIST_ID` continua pendente; as fotos também continuam aguardando pasta e autenticação. A rota de vídeos permanece em `unconfigured` e a interface mostra a mensagem de publicação em breve.

Não é necessário inserir nenhum link hoje. Quando estiverem disponíveis, abra o terminal nesta pasta e execute:

```powershell
npm run galeria:configurar -- --drive "LINK_DA_PASTA_DO_GOOGLE_DRIVE" --playlist "LINK_DA_PLAYLIST_DO_YOUTUBE"
```

O comando aceita links reais ou IDs, extrai os IDs, cria/atualiza somente essas duas entradas em `.env.local` e preserva as demais configurações. Também pode ser executado apenas com `--drive` ou apenas com `--playlist`. Ele não altera permissões do Google, não cria credenciais e não publica o site.

Para consultar o que falta, sem exibir os valores:

```powershell
npm run galeria:verificar
```

O arquivo `.env.example` contém os campos abaixo; apenas o modo de exibição vem preenchido como `playlist`. Credenciais verdadeiras ficam somente em `.env.local` ou no painel da hospedagem, nunca no repositório.

| Variável | Finalidade |
| --- | --- |
| `GOOGLE_DRIVE_FOLDER_ID` | ID da pasta raiz de fotos. |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | JSON da conta de serviço, completo e em uma linha. |
| `YOUTUBE_PLAYLIST_ID` | ID da playlist; corresponde ao parâmetro `list` no link. |
| `YOUTUBE_DISPLAY_MODE` | `playlist` por padrão. `cards` somente se houver decisão de usar a Data API. |
| `YOUTUBE_API_KEY` | Ignorada no modo `playlist`; usada apenas no modo opcional `cards`. |
| `NEXT_PUBLIC_CONGRESS_VIDEOS_ENABLED` | `false` por padrão; `true` exibe a área de vídeos. Configuração pública, sem credenciais. |

### Ativar as fotos do Drive

1. No projeto correto do Google Cloud, habilite **Google Drive API**.
2. Crie ou selecione uma conta de serviço destinada à galeria e obtenha seu JSON, caso a política da organização permita esse tipo de credencial.
3. Compartilhe **somente a pasta de fotos do Congresso** com o `client_email` dessa conta, como **Leitor**. Mantenha a pasta restrita; não a torne pública.
4. Preencha `GOOGLE_DRIVE_FOLDER_ID` pelo comando acima e `GOOGLE_SERVICE_ACCOUNT_JSON` em `.env.local`. Para converter o JSON para uma linha, use um editor local ou `JSON.stringify`; não utilize um site externo para formatar a chave.
5. Se a organização bloquear contas de serviço, chaves ou esse compartilhamento, a leitura de fotos continuará pendente. Será necessário implementar OAuth autorizado; essa alternativa não foi configurada nem testada. Não mude a pasta para pública como contorno.
6. Reinicie o servidor local após alterar as variáveis.

Organização aceita:

```text
Pasta raiz do Congresso
├── abertura.jpg
├── Dia 1 — 09 de novembro
│   ├── conferencia.jpg
│   └── celebracao.webp
└── Dia 2 — 10 de novembro
    └── encontro.png
```

As subpastas imediatas viram filtros por dia. Pastas dentro de outras subpastas não são percorridas. O nome do arquivo vira legenda e a descrição preenchida no Drive vira texto alternativo; use apenas descrições destinadas ao público. A equipe deve colocar nessa pasta somente imagens autorizadas para publicação: os bytes serão disponibilizados publicamente pelo site, embora a pasta do Drive permaneça restrita.

Aceita JPG, PNG e WebP, até 20 MiB por arquivo e 40 milhões de pixels. PDFs, SVGs, atalhos, arquivos na lixeira e arquivos sem tamanho válido são ignorados. O proxy verifica novamente a pasta de origem, valida/reencoda a imagem com `sharp`, remove metadados EXIF/GPS e entrega WebP: miniatura de até 640 × 480 e versão ampliada de até 1920 × 1920.

### Ativar os vídeos

1. Use uma playlist pública do Congresso e adicione os vídeos que a equipe deseja apresentar.
2. Configure `YOUTUBE_PLAYLIST_ID` pelo comando acima.
3. Defina `NEXT_PUBLIC_CONGRESS_VIDEOS_ENABLED=true` para exibir a área. Com o ID configurado, ela apresenta um botão que abre o **player oficial da playlist**. `YOUTUBE_DISPLAY_MODE` fica em `playlist` por padrão; a chave já salva não muda esse comportamento.
4. Reinicie o servidor depois de cadastrar o link. A partir daí, a equipe adiciona os vídeos à **mesma playlist no YouTube**. Ao abrir/reabrir o player ou recarregar a página, o YouTube carrega a lista disponível, sem editar o site ou fazer novo deploy. Uma lista que já esteja aberta pode precisar ser recarregada; não se promete atualização instantânea durante a reprodução, e vale o tempo de processamento/cache do YouTube.
5. A playlist e os vídeos precisam permitir visualização e incorporação. A reprodução real continua pendente do link correto.

Somente se for solicitado no futuro o modo de cards individuais: defina `YOUTUBE_DISPLAY_MODE=cards`, habilite **YouTube Data API v3** e configure uma chave adequada ao servidor em `YOUTUBE_API_KEY`. Nesse modo, a integração consulta `playlistItems.list` e `videos.list`, preserva a ordem e descarta vídeos privados, removidos, não processados ou sem incorporação. A restrição por referenciador HTTP da chave recebida precisaria ser revista apenas para esse uso opcional.

O iframe só é criado após um clique. O conteúdo é reproduzido em `youtube-nocookie.com`; nenhum vídeo é baixado pelo site. No modo opcional de cards, uma miniatura ausente recebe alternativa visual e falhas de quota/rede mostram indisponibilidade.

## Atualização e limites reais

- Metadados de fotos e do modo opcional de cards usam `unstable_cache`, compatível com a configuração instalada sem `cacheComponents`, com revalidação de **600 segundos**. O player de playlist padrão consulta diretamente o YouTube quando é aberto; não utiliza o cache de vídeos da Data API.
- O cache é revalidado **por consulta após o prazo**; não há tarefa executando a cada dez minutos. A primeira resposta após vencer o prazo pode conter o catálogo anterior durante a revalidação.
- Uma página aberta e visível consulta as fotos a cada 30 segundos e ao voltar para a aba. Os vídeos, quando ativados, continuam com intervalo de dez minutos. A galeria preserva as fotos de páginas já carregadas ao incorporar novas imagens; as versões ampliadas continuam sob demanda.
- Cada página de fotos apresenta até 24 itens, cada página de vídeos 6; o botão “Carregar mais” busca os seguintes.
- Listagens Google usam `nextPageToken`. Por segurança, o catálogo é limitado a 30 pastas imediatas, 2.000 fotos e 500 itens de playlist; cada listagem tem limite de páginas. A API informa `limited` quando um teto de catálogo é alcançado. Para mais volume, evolua para storage persistente/sincronização em lotes.
- Consultas de catálogo têm prazo total de 25 segundos; a leitura do Drive tem orçamento de 45 chamadas por atualização. Uma falha não substitui deliberadamente o cache válido por um catálogo vazio.
- Os metadados são cacheados pelo mecanismo de dados do Next e seu adaptador de hospedagem. O comportamento de retenção em falhas precisa ser confirmado na implantação real; não há banco próprio nem índice durável adicional.
- O proxy pode baixar o original do Drive para gerar cada versão em uma requisição sem cache. Ele custa tráfego, CPU, chamadas e latência. As respostas WebP têm cache HTTP/CDN de dez minutos. O custo e os limites da conta Netlify não foram consultados no painel.
- Arquivos removidos ou movidos deixam de ser autorizados na próxima requisição ao servidor; uma cópia já em cache pode permanecer por até dez minutos. Não há rotina que apague cópias persistentes, pois elas não foram criadas.
- Não são gravadas fotos em `public/` durante a execução.

## Rotas e arquivos

| Caminho | Função |
| --- | --- |
| `src/components/HomePage.tsx` | Posição da seção antes dos conferencistas. |
| `src/components/sections/home/GaleriaCongressoSection.tsx` | Integração com o título e a identidade do site. |
| `src/components/congresso/` | Fotos, vídeos, modal nativo com foco/teclado, estados e carregamento. |
| `src/content/gallery.ts` | Textos dos quatro idiomas. |
| `src/app/galeria.css` e `src/app/layout.tsx` | Estilos isolados da galeria e importação. |
| `src/types/congresso.ts` | Contratos públicos de dados. |
| `src/lib/congresso/` | Autenticação, permissões, cache, Google Drive, YouTube e processamento das imagens. |
| `GET /api/congresso/fotos?page=1&day=...` | Fotos paginadas, dias disponíveis e próximo número de página. |
| `GET /api/congresso/fotos/[id]?size=thumbnail` | Miniatura de arquivo autorizado; `size=large` para ampliar. |
| `GET /api/congresso/videos?page=1` | Cards paginados ou modo de playlist sem chave. |
| `scripts/configurar-galeria.mjs` | Preparar links locais e listar pendências sem mostrar segredos. |
| `tests/congresso.test.mjs` | Regras de acesso, formatos, limites, IDs e paginação. |
| `.env.example`, `.gitignore`, `package.json`, `package-lock.json` | Exemplo de configuração, proteção de credenciais, comandos e dependência direta. |

## Verificação

```powershell
npm run test:galeria
npx tsc --noEmit
npm run lint
npm run build
```

Executado localmente: seis testes de regras de acesso/paginação aprovados; TypeScript e build de produção aprovados; ESLint sem erros, com 15 avisos de `<img>` em componentes anteriores à galeria.

Nas APIs reais locais, sem credenciais: fotos e vídeos retornaram `unconfigured` com HTTP 200, página inválida retornou 400, arquivo não autorizado retornou 404 e tamanho não aceito retornou 400.

Após a mudança para playlist como padrão, TypeScript, lint dos arquivos alterados e build passaram. Um teste isolado da rota compilada de produção, com ID e chave sintéticos apenas na memória do processo e a rede externa bloqueada, confirmou HTTP 200 em modo `playlist`, zero chamadas à Data API e nenhuma chave na resposta pública. Nenhum ID de exemplo foi salvo na configuração local. A reprodução da playlist real segue pendente do link.

Playwright validou ordem da seção, estado vazio, paginação, filtro por dia, navegação com setas, Escape, foco no modal e restauração do foco ao fechar, player criado só após clique, e ausência de rolagem horizontal em 320, 390, 1024 e 1440 px. Também foram validados erro de API, nova tentativa, miniatura ausente, modo de playlist e os títulos nos outros três idiomas. Os testes com conteúdo usaram **respostas simuladas somente na sessão do navegador** e imagens já existentes no projeto; o player externo foi interceptado. Nenhum exemplo foi adicionado à galeria real e as interceptações foram removidas ao terminar. Capturas e scripts de QA ficam em `output/playwright/`, ignorado pelo versionamento.

**Ainda não validado:** autenticação real no Google, adição/alteração/remoção de fotos reais, playlist real, reprodução e permissões reais no YouTube, quota, cache e tráfego na hospedagem. Isso depende da configuração de amanhã. Não há publicação efetuada nesta tarefa.

## Quando publicar

No projeto existente da Netlify, cadastre as mesmas variáveis com disponibilidade para Functions/runtime e build conforme o painel. Faça o deploy inicial desta implementação com as configurações e confirme as rotas no domínio real. Uma mudança de variáveis pode exigir novo deploy na hospedagem; já adicionar fotos à pasta ou vídeos à playlist configuradas não exige mudança de código ou novo deploy.

## Documentação oficial consultada

- [Drive: listar arquivos e paginação](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list)
- [Drive: leitura de metadados e conteúdo](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/get)
- [OAuth com conta de serviço](https://developers.google.com/identity/protocols/oauth2/service-account)
- [YouTube: itens de playlist](https://developers.google.com/youtube/v3/docs/playlistItems/list)
- [Next.js: unstable_cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
- [Next.js na Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
