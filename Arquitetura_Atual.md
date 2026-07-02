# Arquitetura Atual do Projeto

Documento gerado em 01/07/2026 a partir da estrutura atual do repositório `Hotsite-Paternidade-de-Deus-03`.

## 1. Visão geral

Este projeto é um hotsite em Next.js para o **I Congresso Internacional de Teologia sobre a Paternidade de Deus**.

A aplicação possui:

- Página inicial institucional em `/`.
- Página de inscrição em `/inscricao`.
- API interna para envio do formulário em `/api/enviar-formulario`.
- Conteúdo multilíngue em português, inglês e italiano.
- Assets visuais exportados do Figma e imagens públicas organizadas em `public/`.
- Deploy preparado para Netlify via `netlify.toml`.

## 2. Tecnologias

| Área | Tecnologia |
| --- | --- |
| Framework | Next.js `16.1.6` |
| UI | React `19.2.0` |
| Linguagem | TypeScript |
| Estilo | CSS global em `src/app/globals.css` |
| Formulário | `react-hook-form` |
| Envio de e-mail | Resend |
| Lint | ESLint `9` com `eslint-config-next` |
| Teste/validação visual presente | Playwright como dependência dev |
| Deploy | Netlify com plugin `@netlify/plugin-nextjs` |

## 3. Scripts

Definidos em `package.json`:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 4. Estrutura principal

```text
.
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── enviar-formulario/
│   │   │       └── route.ts
│   │   ├── inscricao/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ArrowIcon.tsx
│   │   ├── Drawer.tsx
│   │   ├── HomePage.tsx
│   │   ├── LanguageSwitch.tsx
│   │   ├── RegistrationPage.tsx
│   │   └── SiteMenu.tsx
│   └── lib/
│       ├── i18n.ts
│       ├── localized-home.ts
│       └── site-data.ts
├── public/
│   ├── figma-assets/
│   ├── figma-live/
│   ├── formation/
│   ├── speakers/
│   └── imagens e textos públicos da raiz
├── netlify-deploy/
├── output/
├── .next/
├── node_modules/
├── package.json
├── next.config.ts
├── netlify.toml
├── tsconfig.json
└── eslint.config.mjs
```

## 5. Pastas e responsabilidades

| Caminho | Responsabilidade |
| --- | --- |
| `src/app/` | Rotas do App Router do Next.js, layout global, CSS global e API route. |
| `src/app/page.tsx` | Entrada da página inicial. Renderiza `HomePage`. |
| `src/app/inscricao/page.tsx` | Entrada da página de inscrição. Renderiza `RegistrationPage`. |
| `src/app/api/enviar-formulario/route.ts` | Endpoint `POST` que recebe `FormData`, valida campos obrigatórios, processa anexos e envia e-mail pelo Resend. |
| `src/app/layout.tsx` | Layout raiz com metadata, favicon e `<html lang="pt-BR">`. |
| `src/app/globals.css` | Toda a camada visual: variáveis CSS, header, hero, seções, drawer, formulário e responsividade. |
| `src/components/` | Componentes React usados pelas páginas. |
| `src/lib/` | Dados estruturados, traduções, textos localizados e helpers de idioma/assets. |
| `public/` | Imagens, logos, arquivos exportados do Figma e textos auxiliares servidos diretamente pelo Next.js. |
| `netlify-deploy/` | Cópia/pacote auxiliar para deploy Netlify, incluindo build e configuração próprios. |
| `output/playwright/` | Evidências visuais/screenshot geradas por Playwright. |
| `.next/` | Build/cache gerado pelo Next.js. Não é código-fonte. |
| `node_modules/` | Dependências instaladas. Não é código-fonte. |

## 6. Rotas da aplicação

| Rota | Arquivo | Função |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Página inicial do hotsite. |
| `/inscricao` | `src/app/inscricao/page.tsx` | Formulário completo de inscrição. |
| `/api/enviar-formulario` | `src/app/api/enviar-formulario/route.ts` | API server-side para recebimento e envio da inscrição por e-mail. |

## 7. Modularização dos componentes

| Componente | Tipo | Responsabilidade |
| --- | --- | --- |
| `HomePage.tsx` | Client component | Monta toda a homepage: header, hero, programação, apresentação, formação, conferencistas, informações, local, indicações, trabalhos, regulamento, chamada de inscrição e footer. |
| `RegistrationPage.tsx` | Client component | Monta a página de inscrição com `react-hook-form`, validação client-side, upload de arquivos, status de envio e chamada para a API. |
| `SiteMenu.tsx` | Client component | Menu principal responsivo com links de âncora, botão de inscrição e seletor de idioma para mobile. |
| `Drawer.tsx` | Client component | Painel lateral/modal usado para detalhes de conteúdos, conferencistas e regras. Bloqueia scroll do body quando aberto. |
| `LanguageSwitch.tsx` | Client component | Alternador visual de idioma. Está disponível, embora a homepage use botões próprios no header. |
| `ArrowIcon.tsx` | Server-compatible component | Ícone SVG simples usado em CTAs e ações. |

### Fluxo simplificado de renderização

```text
src/app/page.tsx
└── HomePage
    ├── SiteMenu
    ├── Drawer
    ├── ArrowIcon
    ├── dados de src/lib/i18n.ts
    ├── textos de src/lib/localized-home.ts
    └── imagens/dados de src/lib/site-data.ts

src/app/inscricao/page.tsx
└── RegistrationPage
    ├── SiteMenu
    ├── ArrowIcon
    ├── react-hook-form
    ├── dados de src/lib/i18n.ts
    ├── imagens de src/lib/site-data.ts
    └── POST /api/enviar-formulario
```

## 8. Camada de dados e conteúdo

### `src/lib/site-data.ts`

Arquivo central de dados em português e referências visuais.

Exporta:

- `asset(file)`: helper para montar caminho em `/figma-assets/`.
- `images`: mapa de imagens principais usadas no layout.
- `logos`: lista de logos institucionais.
- `schedule`: programação de 09/11 a 13/11.
- `mysteryTabs`: abas da seção de apresentação/fundamentação.
- `formationTabs`: abas de formação, objetivos, promoção/chancela e resultados.
- `speakers`: conferencistas com nome, função, imagem e bio.
- `recommendations`: hotéis e restaurantes.
- `ruleCards`: regras de submissão, resumo e comunicação oral.

### `src/lib/i18n.ts`

Define a infraestrutura de idiomas:

- Tipo `Locale = "pt" | "en" | "it"`.
- Nomes exibidos dos idiomas.
- Labels gerais de navegação e interface.
- Conteúdo básico de hero e introdução.
- `getInitialLocale()`: lê `localStorage` e retorna idioma salvo ou `pt`.
- `saveLocale(locale)`: salva idioma em `localStorage` e atualiza `document.documentElement.lang`.

Chave usada no navegador:

```text
paternidade-locale
```

### `src/lib/localized-home.ts`

Centraliza os textos completos da homepage por idioma:

- `pt`: usa os dados-base de `site-data.ts`.
- `en`: adapta programação, títulos, conferencistas, recomendações e regras.
- `it`: adapta programação, títulos, conferencistas, recomendações e regras.

Idiomas atualmente suportados:

| Código | Idioma |
| --- | --- |
| `pt` | Português |
| `en` | Inglês |
| `it` | Italiano |

## 9. Seções da homepage

A homepage é montada em `HomePage.tsx` com as seguintes seções e âncoras:

| Seção | ID/âncora | Dados principais |
| --- | --- | --- |
| Hero | `#top` | `images.hero`, `images.markGold`, CTA para `/inscricao`. |
| Programação | `#programacao` | `homeCopy[locale].schedule`. |
| Apresentação/Mistério | `#misterio` | `homeCopy[locale].mysteryTabs`. |
| Formação | `#formacao` | `homeCopy[locale].formationTabs`. |
| Conferencistas | `#conferencistas` | `homeCopy[locale].speakers`. |
| Informações gerais | `#informacoes` | `homeCopy[locale].info`. |
| Local do evento | `#local` | `homeCopy[locale].location` e galeria de imagens do Santuário. |
| Indicações | `#indicacoes` | `homeCopy[locale].recommendations`. |
| Trabalhos científicos | `#trabalhos` | `homeCopy[locale].papers`. |
| Regulamento | `#regulamento` | `homeCopy[locale].ruleCards`. |
| Chamada de inscrição | `#inscricao` | Link para `/inscricao`. |

## 10. Página de inscrição

Arquivo principal: `src/components/RegistrationPage.tsx`.

Características:

- Formulário client-side com `react-hook-form`.
- Estado interno para idioma, uploads, drag-and-drop e status de envio.
- Envia os dados via `fetch("/api/enviar-formulario")`.
- Monta `FormData` incluindo campos textuais e arquivos no campo `arquivos`.
- Suporta campos de dados pessoais, contato, vínculo, participação, trabalho acadêmico, necessidades especiais, hospedagem, idioma, certificação, autorização de imagem e termo de compromisso.

Campos principais do tipo `RegistrationForm`:

```text
nome, nomeCredencial, dataNascimento, cpf, passaporte, nacionalidade,
sexo, estadoCivil, telefoneWhatsapp, emailContato, endereco, cidade,
estado, paisContato, cep, cargoFuncao, areaAtuacao, areaOutraQual,
modalidadeParticipacao, tituloTrabalho, areaTematica,
necessidadeEspecifica, necessidadeQual, necessidadesEspeciais,
hospedagemNecessita, chegadaPrevista, saidaPrevista,
participaraEventosCulturais, idiomaPreferencial, certificacaoDeseja,
nomeCertificado, autorizacaoImagem, cidadeCompromisso,
dataCompromisso, assinaturaCompromisso
```

Opções internas:

- Cargo/função: bispo, padre, diácono, religioso(a), seminarista, leigo(a), professor(a), pesquisador(a), estudante e outro.
- Área de atuação: teologia sistemática, bíblica, moral, espiritualidade, liturgia, catequese, pastoral, direito canônico, filosofia e ciências da religião.
- Modalidade: participante, participante com certificado, apresentação de comunicação científica e conferencista convidado.
- Necessidades especiais: acessibilidade física, Libras, tradução simultânea, alimentação especial e outro.
- Idioma preferencial: português, espanhol, inglês, italiano e francês.

## 11. API de formulário

Arquivo: `src/app/api/enviar-formulario/route.ts`.

Funcionamento:

1. Recebe requisição `POST`.
2. Lê `request.formData()`.
3. Extrai campos textuais para um objeto `payload`.
4. Extrai arquivos enviados no campo `arquivos`.
5. Valida campos obrigatórios.
6. Limita anexos a 25 MB no total.
7. Envia e-mail pelo Resend para o e-mail da organização.
8. Retorna JSON de sucesso ou erro.

Runtime:

```ts
export const runtime = "nodejs";
```

Variáveis de ambiente usadas:

| Variável | Uso |
| --- | --- |
| `RESEND_API_KEY` | Chave da API Resend. |
| `RESEND_FROM_EMAIL` | Remetente usado no envio. |
| `ORGANIZER_EMAIL` | Destinatário da inscrição. Possui fallback para o e-mail do congresso. |

Observação de segurança: o arquivo `.env.example` atual contém um valor que parece chave real da Resend. O ideal é trocar por placeholder e rotacionar a chave se ela já foi exposta.

## 12. Estilo e layout

Arquivo: `src/app/globals.css`.

O CSS é global e concentra toda a identidade visual. Variáveis principais:

```css
:root {
  --navy: #021e30;
  --gold: #cca362;
  --ink: #151515;
  --muted: #6d7478;
  --line: #e8e2d8;
  --paper: #fbfaf7;
  --white: #ffffff;
  --radius: 4px;
}
```

Principais grupos de classe:

- Header e menu: `.site-header`, `.home-header`, `.registration-header`, `.main-menu`, `.menu-toggle`.
- Idioma: `.home-language`, `.language-switch`, `.language-options`.
- Homepage: `.hero-section`, `.section`, `.figma-section`, `.schedule-section`, `.split-section`, `.speakers-section`, `.info-section`, `.location-section`, `.papers-section`, `.rules-section`, `.register-band`, `.footer`.
- Componentes interativos: `.tab-stage`, `.tab-list`, `.drawer-shell`, `.drawer-panel`, `.drawer-overlay`.
- Formulário: `.registration-page`, `.registration-hero`, `.registration-form`, `.plain-field`, `.registration-radio-group`, `.dropzone`, `.upload-list`.
- Responsividade: há media queries para larguras como `1025px`, `1024px`, `900px`, `860px`, `700px`, `520px` e `480px`.

## 13. Imagens e assets

Resumo atual de arquivos em `public/`:

| Extensão | Quantidade | Tamanho aproximado |
| --- | ---: | ---: |
| `.jpeg` | 1 | 50,38 KB |
| `.jpg` | 22 | 23.253,22 KB |
| `.png` | 57 | 53.364,17 KB |
| `.svg` | 1 | 1,45 KB |
| `.txt` | 2 | 13,42 KB |

Resumo por pasta:

| Pasta | Arquivos | Tamanho aproximado |
| --- | ---: | ---: |
| `public/figma-assets` | 62 | 64.033,51 KB |
| `public/figma-live` | 6 | 4.592,75 KB |
| `public/formation` | 4 | 3.411,49 KB |
| `public/speakers` | 1 | 140,77 KB |

### Imagens da raiz de `public/`

| Arquivo | Uso provável |
| --- | --- |
| `CONGREGACAO_REDENTORISTA.png` | Logo institucional. |
| `favicom.png` | Favicon configurado em `layout.tsx`. |
| `hotel_01.jpg` | Indicação de hospedagem. |
| `hotel_02.jpg` | Indicação de hospedagem. |
| `logo_abba.jpeg` | Logo institucional. |
| `Restaurante_01.jpg` | Indicação de restaurante. |
| `Restaurante_02.jpg` | Indicação de restaurante. |
| `santuario pai eterno.png` | Logo/imagem institucional do Santuário. |
| `Inglês.txt` | Texto auxiliar em inglês. |
| `Italiano.txt` | Texto auxiliar em italiano. |

### `public/figma-live/`

| Arquivo | Uso |
| --- | --- |
| `hero-bg.png` | Imagem de fundo do hero. |
| `hero-logo.png` | Marca central dourada do hero. |
| `header-logo.png` | Marca usada no footer e variações escuras. |
| `header-logo-compacta.png` | Marca compacta usada no menu/header. |
| `gold-brush.png` | Asset decorativo/apoio visual. |
| `figma-page-reference.png` | Referência visual exportada do Figma. |

### `public/formation/`

| Arquivo | Uso |
| --- | --- |
| `objetivo-geral.png` | Aba "Objetivo geral". |
| `objetivos-especificos.png` | Aba "Objetivos específicos". |
| `promocao-chancela-institucional.png` | Aba "Promoção e chancela institucional". |
| `resultados-esperados.png` | Aba "Resultados esperados". |

### `public/speakers/`

| Arquivo | Uso |
| --- | --- |
| `dom-ricardo-hoepers.jpg` | Foto do conferencista Dom Ricardo Hoepers. |

### Imagens mapeadas em `src/lib/site-data.ts`

| Chave | Caminho |
| --- | --- |
| `hero` | `/figma-live/hero-bg.png` |
| `markDark` | `/figma-live/header-logo.png` |
| `markMenu` | `/figma-live/header-logo-compacta.png` |
| `markRegistration` | `/figma-assets/f99952d65570f9808efda718581e212e15dbed9a.png` |
| `markGold` | `/figma-live/hero-logo.png` |
| `heroBrush` | `/figma-live/gold-brush.png` |
| `aerialNight` | `/figma-assets/c8cd7f4915c1e4a0e6d5b70cfd845b1115b66aba.jpg` |
| `aerialFront` | `/figma-assets/ebc95632897e0003fa84daa15f8260bd302c9bcd.jpg` |
| `aerialSide` | `/figma-assets/0a434210ab40c4fd5d869340cef02a266afdbd7d.jpg` |
| `sanctuary` | `/figma-assets/c2efab4a74e128f2b96afccbb70f7b78dfb0d7af.jpg` |
| `presentation` | `/figma-assets/3659b9ac7e666c772c104602a41247ba988bf38e.png` |
| `theology` | `/figma-assets/4d35b2ba7d6516e20c8828f3b16bd048d737a3e3.png` |
| `mysteryPresentation` | `/figma-assets/Aprsentação.png` via URL encoded |
| `mysteryTheology` | `/figma-assets/Fudamentação Tológica e eclesial.png` via URL encoded |
| `academic` | `/figma-assets/801164d33e02f68ab6ac9146f2d5e9e8b9e5d57f.png` |
| `results` | `/figma-assets/4824ce8893614987ed87ebbecfe13d27bb062f15.png` |

### Arquivos em `public/figma-assets/`

```text
008294b94eb3b748eda037d79e86d92c61a06129.png
03c9add66e3194100b35c8332282299740e71f2f.png
06628f88b76c03bb3a77f187826dfb6b8b2c5a0a.png
06f7f8b71980367f439e221f9047802d4a14ab70.jpg
08047773b1e8c778ef7cc4e499449e0d2d7c27a3.png
0861d975aabe7a758b7e202b093057ba805c9ee4.png
0a434210ab40c4fd5d869340cef02a266afdbd7d.jpg
12348acf1a8fd8a6d1f4eafcd947b180ecc66467.png
166b32894032dc5760eef2bf637b8884579d3cac.jpg
1934a447e1d3e7f44956076987da18195f28378d.png
1937bf6349d5ccbdac4de006187395008b195fe6.jpg
1a932d30f215adc2e8e1a1c2dece1d8327375d87.png
21f4553cf34a8ef15b96036ac5f4cb58c8fdf9a4.jpg
2a322e46253130183e43f61c5a0304bbd24ead4d.png
2a3b1367a9f59890738d1e5f690a7bed23f7906a.png
2cfe5dce2ec93ecc8729cea5cfdc9d4ac95f3e99.png
2f4986d1c998bc81ed98675c21fd0949b3a02b47.jpg
34d582540a42c554c2ea4cbe6cebb4e02f5a44f6.jpg
3541becb5ea49349781bc802c00b5adbd28d4f70.png
35c59fb35025c1d5e16d4f4f5e1013382609409f.jpg
3659b9ac7e666c772c104602a41247ba988bf38e.png
371910ef5f4acfbc9ede18da672e88e63e32fdff.png
3bde4d08890c0e7984f9709d5ba8c05e6898072d.png
40703e8769c580a5c8ccd9eeafe2c7a3ac53b88f.jpg
4152d8f462f33108ba3ba41fe2105fca89b6f2d6.jpg
45a9de2915a6c10d94514b9380944c9b432ef8bb.png
47ea7c3709e2dd0802e560dfd81aadf5e887a826.png
4824ce8893614987ed87ebbecfe13d27bb062f15.png
4c9d047764d6c0dd9d9973e7a9e20bb235f3ec29.png
4d35b2ba7d6516e20c8828f3b16bd048d737a3e3.png
51f433c7a037e6cc1c4663e442e5dbc16d919246.png
597c7619991299aae2884a0d5e4ed856b445ed3d.png
59a19ec893fe3abcd6166d4eb8bf655bfd6b33bc.png
5d0bcf022af35efe0918de1d765eb0cb46924038.png
5f0c3dd89689ead6e61d52df7a3a2a2dea1d3e33.png
742e74be3dc907bbb03dae076ba949dc1e1ff66e.png
76648d1d44417895acac40911e04cded7969151b.png
801164d33e02f68ab6ac9146f2d5e9e8b9e5d57f.png
85234fff5b0b773b6d604ce8456b884b8319ca7f.png
8942ab9bad88a968d7d2cf49e97ed4b228ac9623.png
8ef937d58ca2c9b0679f4b32b1481bf245bd144f.jpg
99df37f24337fe5fa7df0bed3963e740621744e9.png
a5ea1be1dd525e92dd8b3dbd5c999811306fb9f6.png
ab8518ba92eff2b1169f2139b38b3c60e2991415.png
Aprsentação.png
b01380e8c541931ed548baee09abdf1d27306ee8.png
b57fbb187434127b3f83762a27d533eab67345e4.png
c2efab4a74e128f2b96afccbb70f7b78dfb0d7af.jpg
c8a400be4b4eee37a5fd5ebdb0cc2a32e80902bf.png
c8cd7f4915c1e4a0e6d5b70cfd845b1115b66aba.jpg
contact-sheet.jpg
d0c857102433cbaa2a2080b8a7b4ffd741b87a08.jpg
d26fb3606e33782621bd000272db21de85f80c05.png
d83b295e33d23607a17782190d118424bf97957b.png
de13974418df1fea7667ca55963f68e48bd7f116.jpg
ebc95632897e0003fa84daa15f8260bd302c9bcd.jpg
ed1a583acf378a18722b5284ea616e3660e0ac12.png
f2285bd2ba032055a903b36bf4767f2d97fc40a7.png
f99952d65570f9808efda718581e212e15dbed9a.png
figma-thumbnail.png
Fudamentação Tológica e eclesial.png
Vector.svg
```

## 14. Configuração Next.js

Arquivo: `next.config.ts`.

Configurações atuais:

- `images.unoptimized = true`: imagens não passam pela otimização padrão do Next.
- `turbopack.root = process.cwd()`: raiz do Turbopack apontada para o diretório atual.

## 15. Configuração TypeScript

Arquivo: `tsconfig.json`.

Pontos principais:

- `strict: true`.
- `jsx: "react-jsx"`.
- `moduleResolution: "bundler"`.
- Alias configurado:

```json
"@/*": ["./src/*"]
```

Isso permite imports como:

```ts
import { HomePage } from "@/components/HomePage";
import { images } from "@/lib/site-data";
```

## 16. Deploy Netlify

Arquivo: `netlify.toml`.

Configuração atual:

```toml
[build]
  base = "netlify-deploy"
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22"
  NEXT_TELEMETRY_DISABLED = "1"
  NPM_FLAGS = "--no-audit --no-fund"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Observação: o build aponta para a pasta `netlify-deploy`, não diretamente para a raiz do repositório.

## 17. Arquivos auxiliares e gerados

| Caminho | Tipo | Observação |
| --- | --- | --- |
| `.next/` | Gerado | Cache/build do Next.js. Pode ser recriado. |
| `node_modules/` | Gerado | Dependências instaladas. Pode ser recriado com `npm install`. |
| `output/playwright/` | Evidência visual | Contém screenshots de validação. |
| `netlify-deploy/.next/` | Gerado | Build/cache dentro do pacote de deploy. |
| `Paternidade de Deus.fig` | Fonte visual | Arquivo Figma local grande, provável origem do design. |
| `design-system.html` | Referência visual | Arquivo HTML de design system/referência. |
| `.language-check.*.log`, `.menu-check.*.log`, `ui-dev*.log` | Logs | Arquivos de validação/desenvolvimento. |

## 18. Estado Git observado

No momento da leitura, havia alterações não commitadas em:

```text
public/Inglês.txt
public/Italiano.txt
src/lib/localized-home.ts
```

Este documento foi criado sem reverter nem modificar essas alterações.

## 19. Pontos de atenção

- O projeto centraliza muito CSS em `globals.css`; para crescer, pode valer separar estilos por domínio ou componente.
- A internacionalização é manual e baseada em objetos TypeScript; adicionar novo idioma exige atualizar `Locale`, `localeNames`, `locales`, `homeCopy` e textos da inscrição.
- A página de inscrição tem textos multilíngues internos em `RegistrationPage.tsx`, enquanto a homepage usa `localized-home.ts`; isso cria duas fontes de tradução.
- O `.env.example` deve usar placeholders, não chaves reais.
- O `netlify.toml` usa `base = "netlify-deploy"`, então mudanças feitas apenas na raiz precisam ser refletidas nessa pasta se ela continuar sendo a base real de deploy.
- Alguns nomes de assets possuem espaços, acentos ou grafia inconsistente, como `Aprsentação.png` e `Fudamentação Tológica e eclesial.png`; o código usa URL encoding para acessá-los.

## 20. Como adicionar conteúdo novo

### Nova seção na homepage

1. Adicionar dados/textos em `src/lib/site-data.ts` ou `src/lib/localized-home.ts`.
2. Renderizar a seção em `src/components/HomePage.tsx`.
3. Criar estilos correspondentes em `src/app/globals.css`.
4. Se precisar entrar no menu, adicionar link em `src/components/SiteMenu.tsx`.

### Novo idioma

1. Adicionar o código no tipo `Locale` em `src/lib/i18n.ts`.
2. Adicionar nome em `localeNames`.
3. Criar labels em `locales`.
4. Criar entrada completa em `homeCopy` dentro de `src/lib/localized-home.ts`.
5. Traduzir `registrationCopy` em `src/components/RegistrationPage.tsx`.
6. Atualizar os arrays de idioma no `SiteMenu`, `LanguageSwitch`, `HomePage` e `RegistrationPage`, se necessário.

### Nova imagem

1. Colocar o arquivo em `public/`, preferencialmente em uma pasta sem espaços/acentos.
2. Se for imagem reutilizável, mapear em `src/lib/site-data.ts`.
3. Referenciar usando caminho público, por exemplo `/minha-pasta/imagem.png`.

### Novo campo no formulário

1. Adicionar o campo no tipo `RegistrationForm`.
2. Renderizar o input em `RegistrationPage.tsx`.
3. Registrar com `register("nomeDoCampo")`.
4. Se for obrigatório também no servidor, adicionar em `requiredFields` na API.
5. Incluir o campo em `emailSections` para aparecer no e-mail.

