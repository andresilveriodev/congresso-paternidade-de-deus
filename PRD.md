# PRD — Melhoria de Arquitetura, Modularização e Escalabilidade

## Projeto: Hotsite Congresso Internacional de Teologia — Paternidade de Deus

## 1. Visão geral

O projeto atual é um hotsite desenvolvido em Next.js para o **I Congresso Internacional de Teologia sobre a Paternidade de Deus — “Entre Dogma e Devoção”**.

O site possui duas áreas principais:

1. **Página institucional**

   * Apresentação do congresso
   * Programação
   * Conferencistas
   * Trabalhos científicos
   * Local do evento
   * Informações gerais
   * Chamada para inscrição
   * Alternância de idiomas

2. **Página de inscrição**

   * Formulário completo com dados pessoais
   * Contatos
   * Vínculo eclesial/acadêmico
   * Modalidade de participação
   * Submissão de trabalho acadêmico
   * Necessidades especiais
   * Hospedagem e logística
   * Idioma preferencial
   * Certificação
   * Autorização de imagem
   * Termo de compromisso

A arquitetura atual já está bem encaminhada, com separação entre `app`, `components`, `content`, `lib` e `types`. Porém, o projeto precisa evoluir para uma estrutura mais profissional, preparada para manutenção, internacionalização, validação robusta, reaproveitamento de componentes, envio seguro das inscrições e futura expansão.

---

## 2. Objetivo do PRD

Definir as melhorias necessárias na arquitetura, modularização, organização de conteúdo, formulário, validação, serviços, rotas internas e boas práticas do projeto Next.js.

O objetivo é transformar o projeto em uma base mais limpa, escalável, segura e fácil de manter, evitando arquivos muito grandes, repetição de código e acoplamento entre interface, conteúdo e regra de negócio.

---

## 3. Estado atual da arquitetura

A estrutura atual do projeto está organizada da seguinte forma:

```txt
src/
  app/
    layout.tsx
    globals.css

    [locale]/
      layout.tsx
      page.tsx
      inscricao/
        page.tsx
        sucesso/
          page.tsx

    api/
      inscricoes/
        route.ts

  components/
    layout/
      Header.tsx
      Footer.tsx
      LanguageSwitcher.tsx

    sections/
      HeroSection.tsx
      ProgramacaoSection.tsx
      ApresentacaoSection.tsx
      ConferencistasSection.tsx
      InformacoesGeraisSection.tsx
      LocalEventoSection.tsx
      TrabalhosCientificosSection.tsx
      InscricaoCTASection.tsx

    inscricao/
      InscricaoForm.tsx
      DadosPessoaisFields.tsx
      ContatosFields.tsx
      VinculoFields.tsx
      ModalidadeFields.tsx
      TrabalhoAcademicoFields.tsx
      NecessidadesFields.tsx
      HospedagemFields.tsx
      IdiomaFields.tsx
      CertificacaoFields.tsx
      AutorizacaoFields.tsx
      TermoFields.tsx

    ui/
      Button.tsx
      Input.tsx
      Select.tsx
      RadioGroup.tsx
      CheckboxGroup.tsx
      Textarea.tsx
      SectionTitle.tsx
      Container.tsx
      Card.tsx

  content/
    pt/
      home.ts
      programacao.ts
      conferencistas.ts
      trabalhos.ts
      inscricao.ts
    en/
      home.ts
      programacao.ts
      conferencistas.ts
      trabalhos.ts
      inscricao.ts
    it/
      home.ts
      programacao.ts
      conferencistas.ts
      trabalhos.ts
      inscricao.ts

  lib/
    validations/
      inscricao.schema.ts
    services/
      inscricao.service.ts
      email.service.ts
      storage.service.ts
    constants/
      routes.ts
      site.ts
    utils/
      formatDate.ts
      cn.ts

  types/
    programacao.ts
    conferencista.ts
    inscricao.ts
```

Essa base é boa, mas ainda pode ser refinada para melhorar:

* Clareza entre conteúdo e interface.
* Separação entre formulário e regra de negócio.
* Organização dos dados por idioma.
* Reaproveitamento de componentes.
* Controle de validação.
* Padrão de envio de inscrição.
* Escalabilidade para novas páginas.
* Tratamento de erros.
* SEO e metadados.
* Acessibilidade.
* Performance.

---

## 4. Problemas a resolver

### 4.1 Conteúdo institucional muito acoplado à interface

O site possui muito conteúdo textual: programação, conferencistas, objetivos, trabalhos científicos e informações gerais. Esse conteúdo não deve ficar espalhado dentro dos componentes.

Problema esperado:

```tsx
<h1>Paternidade de Deus</h1>
<p>Uma jornada de fé no coração da devoção ao Pai Eterno</p>
```

O ideal é os componentes receberem os dados de arquivos de conteúdo.

---

### 4.2 Formulário grande e sensível

A página de inscrição possui muitos campos e regras. Se tudo ficar em um único componente, o código ficará difícil de manter.

Riscos:

* Validação incompleta.
* Campos duplicados.
* Erros difíceis de encontrar.
* Dificuldade para traduzir labels e mensagens.
* Dificuldade para enviar dados corretamente.
* Dificuldade para salvar anexos PDF.

---

### 4.3 Internacionalização ainda precisa de padrão forte

O site possui Português, Inglês e Italiano. A arquitetura já tem `[locale]`, mas precisa garantir que:

* Todas as rotas respeitem o idioma.
* O conteúdo venha do idioma correto.
* O Header troque idioma mantendo a página atual.
* Os textos do formulário também sejam traduzíveis.
* Metadados de SEO também mudem por idioma.

---

### 4.4 Falta de camada clara de domínio

Atualmente existem `types`, `services` e `validations`, mas o projeto pode ficar mais forte se separar melhor:

* Dados do formulário.
* Tipos do domínio.
* Serviços de envio.
* Serviços de e-mail.
* Serviços de armazenamento.
* Respostas padronizadas da API.

---

### 4.5 Necessidade de preparação para produção

O projeto precisa estar pronto para hospedagem e uso real no período do congresso.

Pontos críticos:

* SEO.
* Performance.
* Formulário estável.
* Segurança no envio.
* Proteção contra spam.
* Confirmação de inscrição.
* Tratamento de erro.
* Página de sucesso.
* Responsividade.
* Acessibilidade.

---

## 5. Objetivos do produto

### 5.1 Objetivo principal

Melhorar a arquitetura e modularização do projeto Next.js para entregar um hotsite institucional profissional, multilíngue, performático e com formulário de inscrição seguro e escalável.

### 5.2 Objetivos específicos

* Organizar o conteúdo institucional em arquivos separados por idioma.
* Melhorar a separação entre página, seção, componente visual e dados.
* Modularizar o formulário de inscrição.
* Criar validação centralizada com schema.
* Padronizar envio de dados para API interna.
* Criar camada de serviço para inscrição, e-mail e armazenamento.
* Preparar o projeto para tradução em Português, Inglês e Italiano.
* Melhorar SEO, acessibilidade e performance.
* Evitar duplicação de código.
* Garantir que futuras alterações possam ser feitas com baixo risco.

---

## 6. Escopo da melhoria

### Dentro do escopo

* Refatoração da arquitetura de pastas.
* Organização dos conteúdos.
* Padronização dos componentes.
* Modularização do formulário.
* Implementação ou melhoria da validação.
* Melhoria da rota `/api/inscricoes`.
* Padronização de tipos TypeScript.
* Criação de helpers utilitários.
* Organização dos textos por idioma.
* Melhoria de SEO e metadata.
* Preparação para deploy.
* Tratamento de loading, erro e sucesso no formulário.

### Fora do escopo neste momento

* Criação de painel administrativo.
* Sistema de pagamento online.
* Login de usuários.
* Área do participante.
* Geração automática de certificado.
* Sistema completo de submissão acadêmica com banca avaliadora.
* Dashboard de inscrições.
* Integração obrigatória com CRM.

Esses itens podem ser tratados em fases futuras.

---

## 7. Arquitetura alvo recomendada

A arquitetura atual pode ser evoluída para a seguinte estrutura:

```txt
src/
  app/
    layout.tsx
    globals.css
    not-found.tsx

    [locale]/
      layout.tsx
      page.tsx

      inscricao/
        page.tsx
        sucesso/
          page.tsx

      trabalhos-cientificos/
        page.tsx

      local/
        page.tsx

    api/
      inscricoes/
        route.ts

  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
      LanguageSwitcher.tsx

    sections/
      home/
        HeroSection.tsx
        ProgramacaoSection.tsx
        ApresentacaoSection.tsx
        ConferencistasSection.tsx
        InformacoesGeraisSection.tsx
        LocalEventoSection.tsx
        TrabalhosCientificosSection.tsx
        InscricaoCTASection.tsx

      shared/
        PageHero.tsx
        SectionHeader.tsx
        ContentBlock.tsx

    inscricao/
      InscricaoForm.tsx
      FormSection.tsx
      DadosPessoaisFields.tsx
      ContatosFields.tsx
      VinculoFields.tsx
      ModalidadeFields.tsx
      TrabalhoAcademicoFields.tsx
      NecessidadesFields.tsx
      HospedagemFields.tsx
      IdiomaFields.tsx
      CertificacaoFields.tsx
      AutorizacaoFields.tsx
      TermoFields.tsx
      SubmitInscricaoButton.tsx

    programacao/
      ProgramacaoTabs.tsx
      ProgramacaoDayCard.tsx
      ProgramacaoItem.tsx

    conferencistas/
      ConferencistaCard.tsx
      ConferencistasGrid.tsx

    trabalhos/
      EixosTematicosList.tsx
      RegulamentoCard.tsx

    ui/
      Button.tsx
      Input.tsx
      Select.tsx
      RadioGroup.tsx
      CheckboxGroup.tsx
      Textarea.tsx
      Container.tsx
      Card.tsx
      Badge.tsx
      Alert.tsx
      Loading.tsx

  content/
    pt/
      site.ts
      navigation.ts
      home.ts
      programacao.ts
      conferencistas.ts
      trabalhos.ts
      inscricao.ts
      seo.ts

    en/
      site.ts
      navigation.ts
      home.ts
      programacao.ts
      conferencistas.ts
      trabalhos.ts
      inscricao.ts
      seo.ts

    it/
      site.ts
      navigation.ts
      home.ts
      programacao.ts
      conferencistas.ts
      trabalhos.ts
      inscricao.ts
      seo.ts

  lib/
    api/
      responses.ts
      errors.ts

    validations/
      inscricao.schema.ts

    services/
      inscricao.service.ts
      email.service.ts
      storage.service.ts
      google-sheets.service.ts

    i18n/
      getDictionary.ts
      locales.ts

    constants/
      routes.ts
      site.ts

    utils/
      formatDate.ts
      formatCpf.ts
      sanitize.ts
      cn.ts

  types/
    locale.ts
    navigation.ts
    programacao.ts
    conferencista.ts
    trabalho.ts
    inscricao.ts
    api.ts
```

---

## 8. Requisitos funcionais

### RF01 — Página inicial institucional

A página inicial deve exibir:

* Menu principal.
* Hero com título, subtítulo e botão de inscrição.
* Programação em formato organizado por dias.
* Apresentação do congresso.
* Objetivo geral.
* Conferencistas.
* Informações gerais.
* Local do evento.
* Indicações de hotéis e restaurantes.
* Trabalhos científicos.
* CTA final para inscrição.
* Rodapé institucional.

Critério de aceite:

* A página deve carregar sem erro.
* Todas as seções devem estar componentizadas.
* O conteúdo deve vir de arquivos dentro de `content`.
* O layout deve ser responsivo.

---

### RF02 — Menu de navegação

O Header deve conter links para:

* Programação.
* Conferencistas.
* Trabalhos científicos.
* Local do evento.
* Inscrição.
* Idiomas: Português, Inglês e Italiano.

Critério de aceite:

* No desktop, o menu deve ser visível.
* No mobile, o menu deve ser adaptado para navegação responsiva.
* O botão de idioma deve manter o usuário na página correspondente.

---

### RF03 — Internacionalização

O projeto deve suportar as rotas:

```txt
/pt
/pt/inscricao
/pt/inscricao/sucesso

/en
/en/inscricao
/en/inscricao/sucesso

/it
/it/inscricao
/it/inscricao/sucesso
```

Critério de aceite:

* Cada idioma deve carregar seu próprio conteúdo.
* Caso o idioma seja inválido, o sistema deve redirecionar ou mostrar página 404.
* Os textos do formulário devem vir do arquivo de idioma.
* O Header e Footer devem ser traduzíveis.

---

### RF04 — Programação do evento

A seção de programação deve exibir os 5 dias do congresso:

* Segunda, 09 de novembro.
* Terça, 10 de novembro.
* Quarta, 11 de novembro.
* Quinta, 12 de novembro.
* Sexta, 13 de novembro.

Critério de aceite:

* A programação deve ser renderizada a partir de array de dados.
* Cada dia deve conter lista de horários e atividades.
* A estrutura deve permitir edição fácil do conteúdo sem alterar JSX.

---

### RF05 — Conferencistas

A seção de conferencistas deve listar os participantes acadêmicos e eclesiais do congresso.

Cada conferencista deve ter:

* Nome.
* Instituição ou origem.
* Cargo ou descrição.
* Imagem, quando disponível.
* País ou localidade, se aplicável.

Critério de aceite:

* A lista deve vir de `content/[locale]/conferencistas.ts`.
* O card deve ser reutilizável.
* A ausência de imagem não deve quebrar o layout.

---

### RF06 — Trabalhos científicos

A seção de trabalhos científicos deve exibir:

* Eixos temáticos.
* Regulamento.
* Normas de submissão.
* Informações sobre resumo.
* Informações sobre comunicação oral.
* Prazo de submissão.
* Chamada para mais informações.

Critério de aceite:

* O conteúdo deve ser organizado em dados estruturados.
* A seção deve ser fácil de traduzir.
* Os eixos temáticos devem ser renderizados por lista.

---

### RF07 — Página de inscrição

A página de inscrição deve exibir o formulário dividido em blocos:

1. Dados pessoais.
2. Contatos.
3. Vínculo eclesial/acadêmico.
4. Modalidade de participação.
5. Inscrição de trabalhos acadêmicos.
6. Necessidades especiais.
7. Hospedagem e logística.
8. Idioma preferencial.
9. Certificação.
10. Autorização de uso de imagem.
11. Termo de compromisso.

Critério de aceite:

* Cada bloco deve estar em um componente separado.
* O formulário deve validar campos obrigatórios.
* O formulário deve exibir mensagens de erro claras.
* O botão de envio deve mostrar estado de carregamento.
* Após envio bem-sucedido, deve redirecionar para página de sucesso.

---
### RF08 — Envio de inscrição atualizado

A inscrição deve ser enviada para:

POST /api/inscricoes

A API deve:

Receber os dados do formulário.
Validar os dados no servidor.
Criar o registro da inscrição com status inicial.
Definir a inscrição como aguardando_pagamento.
Gerar um identificador da inscrição.
Preparar os dados necessários para pagamento.
Retornar a URL ou rota da página de pagamento.
Não finalizar a inscrição como confirmada antes do pagamento.

Resposta esperada:

{
  success: true,
  message: "Inscrição recebida. Prossiga para o pagamento.",
  data: {
    inscricaoId: "INS-2026-0001",
    status: "aguardando_pagamento",
    redirectUrl: "/pt/pagamento?inscricaoId=INS-2026-0001"
  }
}

No front-end, após resposta positiva, o formulário deve redirecionar o usuário para:

/[locale]/pagamento?inscricaoId=INS-2026-0001

## RF08 — comportamento de envio do formulário

O componente `InscricaoForm.tsx` deve alterar o comportamento após o envio bem-sucedido do formulário.

Atualmente, o fluxo previsto era:

```txt
Enviar formulário → /inscricao/sucesso
```

O novo fluxo deve ser:

```txt
Enviar formulário → criar inscrição → gerar pagamento → redirecionar para /pagamento
```

A inscrição **não deve ser considerada confirmada imediatamente após o envio do formulário**. Primeiro, os dados devem ser recebidos, validados e salvos com o status inicial de `aguardando_pagamento`.

Após isso, a API deve retornar uma URL de redirecionamento para a página de pagamento.

### Comportamento esperado no front-end

No componente `InscricaoForm.tsx`, após o envio bem-sucedido, o usuário deve ser redirecionado para a URL retornada pela API.

Exemplo:

```tsx
const response = await enviarInscricao(data);

if (response.success) {
  router.push(response.data.redirectUrl);
}
```

### Resposta esperada da API

A rota `POST /api/inscricoes` deve retornar uma resposta parecida com esta:

```ts
{
  success: true,
  message: "Inscrição recebida. Prossiga para o pagamento.",
  data: {
    inscricaoId: "INS-2026-0001",
    status: "aguardando_pagamento",
    redirectUrl: "/pt/pagamento?inscricaoId=INS-2026-0001"
  }
}
```

### Regras de negócio

* O formulário deve validar os dados antes do envio.
* A API deve validar novamente os dados no servidor.
* A inscrição deve ser criada antes do pagamento.
* A inscrição deve receber o status inicial `aguardando_pagamento`.
* O usuário deve ser redirecionado para a página de pagamento somente após a inscrição ser criada com sucesso.
* A página de sucesso não deve ser exibida antes da confirmação do pagamento.
* Caso ocorra erro no envio, o usuário deve permanecer no formulário e visualizar uma mensagem amigável de erro.

### Critérios de aceite

* Ao enviar o formulário com dados válidos, a inscrição deve ser criada.
* A API deve retornar `redirectUrl`.
* O front-end deve redirecionar para `/[locale]/pagamento`.
* A inscrição deve ficar com status `aguardando_pagamento`.
* O usuário não deve ser redirecionado para `/inscricao/sucesso` após o envio do formulário.
* A confirmação final da inscrição deve acontecer somente após o pagamento aprovado.


### RF09 — Página de pagamento

Após enviar o formulário com sucesso, o usuário deve ser redirecionado para a página de pagamento.

A página de pagamento deve exibir:

Resumo da inscrição.
Nome do participante.
Nome do congresso.
Valor da inscrição.
Status inicial: aguardando pagamento.
Botão ou instrução para realizar o pagamento.
Orientação clara sobre confirmação após pagamento.

Valor da inscrição:

R$ 200,00

Critério de aceite:

A página deve carregar no idioma correto.
A página deve receber o identificador da inscrição.
A página não deve permitir pagamento sem inscrição válida.
A inscrição deve permanecer como aguardando_pagamento até confirmação.
Após pagamento aprovado, o usuário deve ser enviado para página de sucesso.

---

## 9. Requisitos não funcionais

### RNF01 — Performance

O site deve ser leve, rápido e otimizado.

Requisitos:

* Usar imagens otimizadas com `next/image`.
* Evitar JavaScript desnecessário.
* Usar Server Components sempre que possível.
* Usar `"use client"` apenas em componentes interativos.
* Evitar bibliotecas pesadas sem necessidade.

---

### RNF02 — SEO

O projeto deve ter metadados adequados por idioma.

Cada página deve conter:

* Title.
* Description.
* Open Graph.
* Canonical URL.
* Idioma da página.
* Imagem social, quando disponível.

Exemplo de títulos:

```txt
I Congresso Internacional de Teologia sobre a Paternidade de Deus
Inscrição — Congresso Paternidade de Deus
Trabalhos Científicos — Congresso Paternidade de Deus
```

---

### RNF03 — Acessibilidade

O site deve seguir boas práticas de acessibilidade.

Requisitos:

* Botões com texto claro.
* Inputs com labels associados.
* Contraste adequado.
* Navegação por teclado.
* Estados de foco visíveis.
* Textos alternativos em imagens.
* Estrutura semântica com `header`, `main`, `section` e `footer`.

---

### RNF04 — Segurança

A rota de inscrição deve aplicar boas práticas básicas:

* Validar os dados no servidor.
* Não confiar apenas no front-end.
* Sanitizar entradas de texto.
* Limitar tamanho dos campos.
* Validar arquivo PDF.
* Bloquear tipos de arquivo não permitidos.
* Evitar expor variáveis sensíveis no front-end.
* Usar `.env` para chaves privadas.

---

### RNF05 — Manutenibilidade

O projeto deve ser fácil de alterar.

Requisitos:

* Componentes pequenos.
* Nomes claros.
* Separação de responsabilidade.
* Conteúdo fora do JSX.
* Tipos TypeScript centralizados.
* Serviços isolados.
* Validações reaproveitáveis.

---

## 10. Estrutura dos dados de conteúdo

### 10.1 Conteúdo da Home

Arquivo recomendado:

```txt
src/content/pt/home.ts
```

Estrutura sugerida:

```ts
export const homeContent = {
  hero: {
    title: "Paternidade de Deus",
    subtitle: "Uma jornada de fé no coração da devoção ao Pai Eterno",
    cta: "Fazer inscrição",
  },
  presentation: {
    eyebrow: "Mistério, Ternura e Missão da Igreja",
    title: "Fundamentação teológica e eclesial",
    description:
      "O Santuário Basílica do Divino Pai Eterno acolhe o I Congresso Internacional de Teologia sobre a Paternidade de Deus.",
  },
  objectives: {
    general:
      "Promover reflexão e produção teológica sobre a Paternidade de Deus...",
    specific: [
      "Pesquisa Teológica",
      "Formação Eclesial",
      "Promoção e chancela institucional",
      "Resultados esperados",
    ],
  },
};
```

---

### 10.2 Conteúdo da programação

Arquivo recomendado:

```txt
src/content/pt/programacao.ts
```

Estrutura sugerida:

```ts
export const programacao = [
  {
    dayLabel: "Segunda",
    dayNumber: "09",
    month: "Novembro",
    events: [
      {
        time: "8h30",
        title: "Cerimonial de abertura",
      },
      {
        time: "9h30",
        title:
          "Conferência de abertura — O Pai revelado por Jesus Cristo: fundamentos cristológicos",
        speaker: "Cardeal José Tolentino de Mendonça",
      },
    ],
  },
];
```

---

### 10.3 Conteúdo dos conferencistas

Arquivo recomendado:

```txt
src/content/pt/conferencistas.ts
```

Estrutura sugerida:

```ts
export const conferencistas = [
  {
    name: "Cardeal José Tolentino de Mendonça",
    institution: "Vaticano",
    role: "Conferencista",
    image: "/images/conferencistas/jose-tolentino.jpg",
  },
  {
    name: "Prof.ª Maria Clara Lucchetti Bingemer",
    institution: "PUC-Rio",
    role: "Professora e pesquisadora",
    image: "/images/conferencistas/maria-clara.jpg",
  },
];
```

---

### 10.4 Conteúdo do formulário

Arquivo recomendado:

```txt
src/content/pt/inscricao.ts
```

Estrutura sugerida:

```ts
export const inscricaoContent = {
  title: "I Congresso Internacional de Teologia",
  subtitle: "Sobre a Paternidade de Deus",
  theme: "Entre Dogma e Devoção",
  quote:
    "Recebestes um Espírito de filhos adotivos, pelo qual clamamos: Abbá, Pai!",
  sections: {
    personalData: "Dados pessoais",
    contacts: "Contatos",
    ecclesialAcademic: "Vínculo eclesial / acadêmico",
    participationMode: "Modalidade de participação",
    academicWork: "Inscrição de trabalhos acadêmicos",
    specialNeeds: "Necessidades especiais",
    logistics: "Hospedagem e Logística",
    language: "Idioma preferencial",
    certification: "Certificação",
    imageAuthorization: "Autorização de uso de imagem",
    commitment: "Termo de compromisso",
  },
};
```

---

## 11. Validação do formulário

O projeto deve usar um schema centralizado em:

```txt
src/lib/validations/inscricao.schema.ts
```

O schema deve validar:

* Nome completo obrigatório.
* Nome para credencial obrigatório.
* Data de nascimento obrigatória.
* CPF ou passaporte conforme nacionalidade.
* E-mail válido.
* Telefone obrigatório.
* Cidade, estado, país e CEP.
* Modalidade de participação.
* Se houver comunicação científica, exigir título e área temática.
* Se houver necessidade especial, exigir descrição.
* Se desejar certificado, exigir nome para certificado.
* Autorização de imagem.
* Aceite do termo de compromisso.

Exemplo de regra importante:

```txt
Se modalidade = "Apresentação de Comunicação Científica",
então título do trabalho e área temática devem ser obrigatórios.
```

---

## 12. Serviço de inscrição

Arquivo:

```txt
src/lib/services/inscricao.service.ts
```

Responsabilidades:

* Receber dados já validados.
* Salvar inscrição.
* Acionar envio de e-mail.
* Acionar armazenamento de arquivo, caso exista.
* Retornar resultado padronizado.

O serviço não deve conter código visual e não deve depender de componentes React.

Fluxo recomendado:

```txt
Formulário
  ↓
/api/inscricoes
  ↓
inscricao.schema.ts
  ↓
inscricao.service.ts
  ↓
email.service.ts
storage.service.ts
google-sheets.service.ts
  ↓
Resposta de sucesso ou erro
```

---

## 13. API de inscrições

Arquivo:

```txt
src/app/api/inscricoes/route.ts
```

Responsabilidade da rota:

* Receber requisição.
* Validar método POST.
* Validar body.
* Chamar serviço.
* Retornar resposta padronizada.

Padrão de resposta recomendado:

```ts
{
  success: true,
  message: "Inscrição realizada com sucesso.",
  data: {
    protocol: "PD-2026-0001"
  }
}
```

Erro:

```ts
{
  success: false,
  message: "Não foi possível realizar a inscrição.",
  errors: {
    email: "Informe um e-mail válido."
  }
}
```

---

## 14. Componentes de UI

Os componentes em `components/ui` devem ser reutilizáveis e não depender do conteúdo do congresso.

Componentes mínimos:

```txt
Button
Input
Select
Textarea
RadioGroup
CheckboxGroup
Card
Container
SectionTitle
Badge
Alert
Loading
```

Regras:

* Não colocar texto fixo de negócio nesses componentes.
* Não misturar layout de seção com componente UI.
* Permitir `className`.
* Permitir estados: erro, desabilitado, loading, obrigatório.

---

## 15. Organização das seções da Home

A página inicial não deve conter HTML extenso. Ela deve apenas compor seções.

Exemplo desejado:

```tsx
export default async function HomePage({ params }) {
  const locale = params.locale;
  const content = await getDictionary(locale);

  return (
    <>
      <HeroSection content={content.home.hero} />
      <ProgramacaoSection items={content.programacao} />
      <ApresentacaoSection content={content.home.presentation} />
      <ConferencistasSection items={content.conferencistas} />
      <InformacoesGeraisSection content={content.home.info} />
      <LocalEventoSection content={content.home.location} />
      <TrabalhosCientificosSection content={content.trabalhos} />
      <InscricaoCTASection content={content.home.cta} />
    </>
  );
}
```

Critério de aceite:

* `page.tsx` deve ter pouca lógica.
* Cada seção deve receber dados por props.
* O conteúdo deve vir do idioma atual.

---

## 16. Organização do formulário

O componente `InscricaoForm.tsx` deve controlar:

* React Hook Form.
* Submit.
* Estado de loading.
* Erros gerais.
* Redirecionamento pós-sucesso.

Os componentes filhos devem renderizar campos específicos.

Exemplo:

```tsx
<InscricaoForm>
  <DadosPessoaisFields />
  <ContatosFields />
  <VinculoFields />
  <ModalidadeFields />
  <TrabalhoAcademicoFields />
  <NecessidadesFields />
  <HospedagemFields />
  <IdiomaFields />
  <CertificacaoFields />
  <AutorizacaoFields />
  <TermoFields />
</InscricaoForm>
```

Critério de aceite:

* Cada arquivo deve ter responsabilidade clara.
* Nenhum bloco de campo deve ultrapassar complexidade desnecessária.
* Campos condicionais devem ser controlados por `watch`.
* A validação final deve acontecer no schema.

---

## 17. Rotas recomendadas

Rotas principais:

```txt
/[locale]
/[locale]/inscricao
/[locale]/inscricao/sucesso
```

Rotas futuras opcionais:

```txt
/[locale]/programacao
/[locale]/conferencistas
/[locale]/trabalhos-cientificos
/[locale]/local
```

API:

```txt
/api/inscricoes
```

---

## 18. Regras de idioma

Idiomas suportados:

```ts
export const locales = ["pt", "en", "it"] as const;
export type Locale = (typeof locales)[number];
```

Idioma padrão:

```txt
pt
```

Regras:

* Se o usuário acessar `/`, redirecionar para `/pt`.
* Se acessar idioma inválido, retornar 404.
* LanguageSwitcher deve trocar apenas o prefixo do idioma.
* Conteúdos devem ser carregados com base no `locale`.

---

## 19. SEO e metadata

Criar arquivo:

```txt
src/content/pt/seo.ts
src/content/en/seo.ts
src/content/it/seo.ts
```

Cada idioma deve conter:

```ts
export const seo = {
  home: {
    title: "I Congresso Internacional de Teologia sobre a Paternidade de Deus",
    description:
      "Participe do congresso internacional sobre a Paternidade de Deus no Santuário Basílica do Divino Pai Eterno, em Trindade-GO.",
  },
  inscricao: {
    title: "Inscrição — Congresso Paternidade de Deus",
    description:
      "Realize sua inscrição para o I Congresso Internacional de Teologia sobre a Paternidade de Deus.",
  },
};
```

Critério de aceite:

* Cada página deve gerar metadata própria.
* Título e descrição devem mudar conforme idioma.
* Imagem Open Graph deve ser configurada.

---

## 21. Boas práticas de código

### Componentes

* Um componente deve ter uma responsabilidade principal.
* Evitar componentes gigantes.
* Evitar duplicação.
* Usar props tipadas.
* Separar componentes client e server.

### TypeScript

* Criar tipos para dados do domínio.
* Evitar `any`.
* Usar tipos inferidos do Zod quando possível.
* Centralizar tipos compartilhados.

### CSS

* Evitar CSS global excessivo.
* Usar classes organizadas.
* Criar padrões reutilizáveis para espaçamentos, containers e cards.
* Manter tokens de cores em local centralizado, se possível.

### API

* Validar tudo no servidor.
* Padronizar respostas.
* Separar serviços.
* Tratar erros corretamente.
* Não expor stack trace para o usuário.

---

## 22. Critérios de aceite gerais

A refatoração será considerada concluída quando:

* A home estiver dividida em seções reutilizáveis.
* O conteúdo estiver fora dos componentes.
* O formulário estiver dividido em blocos.
* A validação estiver centralizada.
* A API de inscrição estiver funcional.
* O projeto suportar `/pt`, `/en` e `/it`.
* O Header e Footer funcionarem em todos os idiomas.
* A página de sucesso estiver criada.
* O site estiver responsivo.
* O site não apresentar erros no build.
* O código estiver limpo, tipado e organizado.

---

## 23. Fases de implementação

### Fase 1 — Organização base

* Revisar estrutura de pastas.
* Criar arquivos de conteúdo por idioma.
* Criar tipos principais.
* Ajustar rotas `[locale]`.
* Configurar idioma padrão.

Entrega esperada:

```txt
Rotas com idioma funcionando e conteúdo separado.
```

---

### Fase 2 — Refatoração da Home

* Separar seções da página inicial.
* Criar componentes específicos para programação.
* Criar cards de conferencistas.
* Criar seção de trabalhos científicos.
* Organizar CTA de inscrição.

Entrega esperada:

```txt
Home limpa, componentizada e alimentada por dados.
```

---

### Fase 3 — Refatoração do formulário

* Criar schema de validação.
* Dividir campos em componentes.
* Criar estados de erro e loading.
* Criar campos condicionais.
* Criar redirecionamento para sucesso.

Entrega esperada:

```txt
Formulário modular, validado e funcional.
```

---

### Fase 4 — API e serviços

* Criar rota POST `/api/inscricoes`.
* Criar `inscricao.service.ts`.
* Criar `email.service.ts`.
* Criar `storage.service.ts`.
* Padronizar respostas.
* Tratar erros.

Entrega esperada:

```txt
Inscrição enviada com segurança e resposta padronizada.
```

---

### Fase 5 — SEO, acessibilidade e produção

* Configurar metadata.
* Revisar responsividade.
* Melhorar acessibilidade.
* Revisar performance.
* Testar build.
* Preparar deploy.

Entrega esperada:

```txt
Projeto pronto para produção.
```

---

## 24. Checklist técnico

### Arquitetura

* [ ] `page.tsx` limpo e sem conteúdo extenso.
* [ ] Conteúdo institucional dentro de `content`.
* [ ] Tipos dentro de `types`.
* [ ] Validações dentro de `lib/validations`.
* [ ] Serviços dentro de `lib/services`.
* [ ] Componentes UI sem regra de negócio.
* [ ] Componentes de seção separados por contexto.

### Formulário

* [ ] React Hook Form configurado.
* [ ] Zod configurado.
* [ ] Campos obrigatórios validados.
* [ ] Campos condicionais funcionando.
* [ ] Mensagens de erro amigáveis.
* [ ] Loading no envio.
* [ ] Página de sucesso funcionando.
* [ ] API validando no servidor.

### Idiomas

* [ ] `/pt` funcionando.
* [ ] `/en` funcionando.
* [ ] `/it` funcionando.
* [ ] Header traduzido.
* [ ] Footer traduzido.
* [ ] Formulário traduzido.
* [ ] Metadata traduzida.

### Produção

* [ ] Build sem erros.
* [ ] Imagens otimizadas.
* [ ] SEO configurado.
* [ ] Responsividade revisada.
* [ ] Acessibilidade básica revisada.
* [ ] `.env` protegido.
* [ ] Tratamento de erro na API.

---

## 25. Riscos

### Risco 1 — Formulário ficar muito complexo

Mitigação:

* Dividir em componentes menores.
* Usar schema centralizado.
* Criar tipos claros.
* Testar campos condicionais.

### Risco 2 — Conteúdo duplicado nos idiomas

Mitigação:

* Usar mesma estrutura de dados para todos os idiomas.
* Criar tipos compartilhados.
* Validar se todos os arquivos possuem as mesmas chaves.

### Risco 3 — API receber dados inválidos

Mitigação:

* Validar no front-end.
* Validar no back-end.
* Sanitizar entradas.
* Padronizar erros.

### Risco 4 — Site ficar pesado

Mitigação:

* Usar Server Components.
* Evitar bibliotecas desnecessárias.
* Otimizar imagens.
* Reduzir JavaScript client-side.

---

## 26. Decisões técnicas recomendadas

### Framework

Next.js com App Router.

### Linguagem

TypeScript.

### Formulário

React Hook Form.

### Validação

Zod.

### Estilização

CSS Modules, Tailwind CSS ou CSS global organizado.
Manter apenas uma estratégia principal para evitar bagunça.

### Envio da inscrição

Route Handler em:

```txt
src/app/api/inscricoes/route.ts
```

### Organização de conteúdo

Arquivos TypeScript dentro de:

```txt
src/content/[locale]
```

### Upload de PDF

Inicialmente, validar e armazenar via serviço separado:

```txt
storage.service.ts
```

---

## 27. Resultado esperado

Ao final da melhoria, o projeto deverá ter:

* Código mais limpo.
* Arquitetura mais profissional.
* Página inicial fácil de editar.
* Formulário seguro e organizado.
* Conteúdo pronto para tradução.
* Rotas multilíngues funcionando.
* Serviços separados.
* API de inscrição preparada.
* Site mais fácil de manter até o evento.
* Base preparada para futuras funcionalidades, como painel administrativo, pagamento, certificados e gestão de trabalhos científicos.

---

## 28. Resumo executivo

O projeto já possui uma boa base de organização, mas precisa evoluir para uma arquitetura mais robusta.

A principal melhoria é separar claramente:

```txt
Página → Seções → Componentes → Conteúdo → Tipos → Validação → Serviços → API
```

A Home deve ser apenas uma composição de seções.
O conteúdo deve morar em `content`.
O formulário deve ser dividido por blocos.
A validação deve ficar em `lib/validations`.
O envio deve passar pela API e pelos serviços.
Os idiomas devem ser tratados desde o início com `[locale]`.

Essa estrutura reduz manutenção, evita retrabalho e deixa o projeto pronto para produção.
