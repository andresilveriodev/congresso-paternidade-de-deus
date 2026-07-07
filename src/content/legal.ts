import type { Locale } from "@/types/locale";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type LegalPageCopy = {
  slug: "termos-de-uso" | "politica-de-privacidade" | "seguranca";
  title: string;
  eyebrow: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export const legalPages = {
  terms: {
    slug: "termos-de-uso",
    title: "Termos de Uso",
    eyebrow: "Termos legais",
    description:
      "Regras para acesso ao site, inscrição, submissão de trabalhos, participação no evento, registros de imagem e responsabilidades do usuário.",
    updatedAt: "Atualizado para o I Congresso Internacional sobre a Paternidade de Deus 2026.",
    sections: [
      {
        title: "1. Aceitação dos termos",
        paragraphs: [
          "Ao acessar o site, preencher formulários, realizar inscrição, enviar trabalhos, participar de atividades ou utilizar canais oficiais do I Congresso Internacional sobre a Paternidade de Deus 2026, o usuário declara ter lido, compreendido e aceitado estes Termos de Uso, a Política de Privacidade e as regras específicas do evento.",
          "Caso não concorde com alguma condição, o usuário deve se abster de usar o site, enviar dados ou prosseguir com a inscrição."
        ]
      },
      {
        title: "2. Finalidade do site e informações do evento",
        paragraphs: [
          "O site tem finalidade informativa, institucional, acadêmica, pastoral e operacional. Ele pode apresentar programação, conferencistas, local, regulamentos, comunicados, inscrições, orientações de pagamento, submissão de trabalhos, políticas, termos e demais informações relacionadas ao Congresso.",
          "As informações podem ser atualizadas, corrigidas, reorganizadas ou retiradas a qualquer tempo por razões logísticas, acadêmicas, pastorais, jurídicas, técnicas, sanitárias, climáticas, de segurança ou de força maior."
        ]
      },
      {
        title: "3. Inscrição e responsabilidade do participante",
        paragraphs: [
          "O participante é responsável por fornecer informações verdadeiras, completas, atualizadas e lícitas. Dados incorretos, incompletos ou de terceiros sem autorização podem impedir inscrição, credenciamento, pagamento, comunicação, certificação, apresentação de trabalhos ou participação em atividades.",
          "A inscrição pode depender de confirmação de pagamento, validação cadastral, disponibilidade de vagas, cumprimento de prazos, regras acadêmicas, normas do local do evento e demais condições informadas pela organização."
        ]
      },
      {
        title: "4. Pagamentos, cancelamentos e comprovantes",
        paragraphs: [
          "Valores, formas de pagamento, prazos, descontos, lotes, eventuais reembolsos e políticas de cancelamento poderão ser informados em páginas específicas, comunicados oficiais ou canais da organização.",
          "Comprovantes, recibos, notas, registros financeiros e dados necessários à conciliação de pagamento poderão ser mantidos pelo período exigido por lei ou necessário para resguardar direitos da organização e do participante."
        ]
      },
      {
        title: "5. Credenciamento, conduta e segurança",
        paragraphs: [
          "O participante deve respeitar regras de credenciamento, identificação, horários, áreas de acesso, orientações da equipe, normas do local, direitos de terceiros, ambiente religioso e acadêmico, bem como padrões de urbanidade, segurança e boa-fé.",
          "A organização poderá negar acesso, suspender atividades, cancelar credenciais ou retirar participante que viole estes Termos, normas do evento, direitos de terceiros, segurança, ordem, integridade física, patrimônio, imagem institucional ou legislação aplicável."
        ]
      },
      {
        title: "6. Trabalhos científicos e conteúdo enviado",
        paragraphs: [
          "Quem submete trabalho, arquivo, resumo, imagem, documento, apresentação ou qualquer conteúdo declara ser autor, coautor autorizado ou titular dos direitos necessários, responsabilizando-se por originalidade, licitude, citações, autorizações, uso de imagem, dados pessoais de terceiros e ausência de plágio.",
          "A organização poderá avaliar, recusar, editar aspectos formais, classificar, programar, publicar ou arquivar trabalhos conforme regulamento acadêmico, critérios científicos, prazos, adequação temática, disponibilidade e regras do Congresso."
        ]
      },
      {
        title: "7. Imagem, voz e registros do evento",
        paragraphs: [
          "O participante reconhece que eventos públicos ou semipúblicos podem ser fotografados, filmados, transmitidos ou gravados para memória institucional, divulgação, relatórios, imprensa, redes sociais, materiais acadêmicos, pastorais e promocionais.",
          "Ao permanecer em áreas de captação, plenárias, celebrações, painéis, filas, ambientes coletivos ou atividades abertas, o participante está ciente de que sua imagem e voz poderão aparecer de modo incidental, contextual ou coletivo. Usos destacados, entrevistas e depoimentos poderão depender de autorização específica quando exigido."
        ]
      },
      {
        title: "8. Propriedade intelectual",
        paragraphs: [
          "Marcas, logotipos, identidade visual, textos, imagens, fotografias, vídeos, layout, programação, materiais gráficos, documentos, certificados e demais conteúdos do site ou do evento pertencem aos respectivos titulares e não podem ser copiados, explorados, modificados, distribuídos ou usados comercialmente sem autorização.",
          "Materiais de palestrantes, autores, conferencistas e parceiros continuam sujeitos aos direitos de seus respectivos titulares."
        ]
      },
      {
        title: "9. Uso proibido do site",
        paragraphs: [
          "É proibido usar o site para inserir dados falsos, violar direitos de terceiros, tentar acessar áreas restritas, explorar falhas, interferir no funcionamento, automatizar envios abusivos, praticar fraude, disseminar código malicioso, copiar conteúdo indevidamente ou utilizar informações do Congresso para finalidade ilícita.",
          "A organização poderá registrar evidências técnicas, bloquear acessos, cancelar inscrições suspeitas, comunicar autoridades e adotar medidas administrativas, judiciais ou extrajudiciais cabíveis."
        ]
      },
      {
        title: "10. Limitação de responsabilidade",
        paragraphs: [
          "A organização empregará esforços razoáveis para manter informações corretas e disponibilidade do site, mas não garante funcionamento ininterrupto, ausência de erros, compatibilidade com todos os dispositivos, indisponibilidade de terceiros, falhas de internet, meios de pagamento, provedores, hospedagem, e-mail ou serviços externos.",
          "Alterações de programação, palestrantes, salas, horários, transmissão, disponibilidade de vagas, atividades culturais, logística e regras poderão ocorrer por motivos técnicos, pastorais, acadêmicos, climáticos, sanitários, jurídicos, operacionais, de segurança ou força maior."
        ]
      },
      {
        title: "11. Proteção de dados e privacidade",
        paragraphs: [
          "O uso de dados pessoais no contexto do site, inscrição e evento é regido pela Política de Privacidade. Ao se inscrever, o participante declara ciência de que dados pessoais, dados eventualmente sensíveis, arquivos, imagem, voz e registros de participação poderão ser tratados nos termos daquela Política e da legislação aplicável.",
          "O participante deve evitar enviar dados excessivos, documentos desnecessários ou informações de terceiros sem autorização."
        ]
      },
      {
        title: "12. Disposições finais",
        paragraphs: [
          "Estes Termos podem ser atualizados a qualquer tempo para refletir mudanças operacionais, jurídicas, acadêmicas, de segurança ou de organização do Congresso. A versão publicada no site prevalece sobre versões anteriores.",
          "Eventuais tolerâncias ou omissões não significam renúncia de direitos. Se alguma disposição for considerada inválida, as demais permanecerão em vigor na máxima extensão permitida pela legislação aplicável."
        ]
      }
    ]
  },
  privacy: {
    slug: "politica-de-privacidade",
    title: "Política de Privacidade",
    eyebrow: "Privacidade e LGPD",
    description:
      "Como dados pessoais relacionados ao Congresso, inscrições, comunicações, certificados, trabalhos científicos, imagens, vídeos e logística do evento podem ser tratados.",
    updatedAt: "Atualizado para o I Congresso Internacional sobre a Paternidade de Deus 2026.",
    sections: [
      {
        title: "1. Controlador, escopo e aplicação",
        paragraphs: [
          "Esta Política de Privacidade se aplica ao site, ao formulário de inscrição, aos canais oficiais de comunicação e às atividades presenciais ou digitais vinculadas ao I Congresso Internacional sobre a Paternidade de Deus 2026.",
          "Para fins da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018), a organização do Congresso atua, em regra, como controladora dos dados usados para inscrição, credenciamento, comunicação, certificação, gestão acadêmica, segurança, registros institucionais e cumprimento de obrigações legais."
        ]
      },
      {
        title: "2. Dados pessoais coletados",
        paragraphs: [
          "Podemos tratar dados de identificação e contato, como nome civil, nome para credencial, data de nascimento, nacionalidade, sexo, estado civil, CPF, passaporte, telefone, e-mail, endereço, cidade, estado, país e CEP.",
          "Também podemos tratar dados profissionais, acadêmicos, eclesiais e logísticos fornecidos pelo participante, como cargo ou função, área de atuação, vínculo institucional, modalidade de participação, título de trabalho, área temática, arquivos enviados, idioma preferencial, necessidade de certificado, nome para certificado, hospedagem, chegada e saída previstas, participação em visitas guiadas e demais informações necessárias à organização do evento."
        ]
      },
      {
        title: "3. Dados sensíveis e situações especiais",
        paragraphs: [
          "Informações sobre necessidade específica, acessibilidade, saúde, alimentação, idioma, participação religiosa, convicção religiosa, imagem, voz ou outras categorias protegidas podem ser consideradas dados sensíveis pela LGPD. Esses dados serão tratados com cautela adicional e apenas quando necessários para viabilizar participação, segurança, acessibilidade, comunicação, certificação, organização acadêmica ou cumprimento de obrigação legal.",
          "A inscrição de menores de idade, quando aceita pela organização, deverá ser realizada ou autorizada por responsável legal. Quem informa dados de terceiros, como coautores, acompanhantes ou contatos de emergência, declara possuir autorização ou outra base legal válida para fazê-lo."
        ]
      },
      {
        title: "4. Finalidades do tratamento",
        paragraphs: [
          "Os dados poderão ser utilizados para processar inscrições, confirmar pagamentos, emitir comprovantes, organizar credenciamento, controlar acesso, planejar salas, gerir atividades acadêmicas, avaliar trabalhos científicos, emitir certificados, enviar comunicados, prestar suporte, prevenir fraude, preservar segurança, manter registros administrativos e cumprir obrigações legais, contábeis, fiscais ou regulatórias.",
          "Também poderemos tratar dados para documentar o evento, preservar memória institucional, divulgar resultados, publicar anais, relatórios, registros fotográficos ou audiovisuais e materiais de comunicação, sempre observados os direitos de personalidade, a boa-fé, o contexto do evento e a legislação aplicável."
        ]
      },
      {
        title: "5. Bases legais",
        paragraphs: [
          "Conforme a finalidade, o tratamento poderá se apoiar em execução de contrato ou procedimentos preliminares relacionados à inscrição; cumprimento de obrigação legal ou regulatória; exercício regular de direitos; proteção da vida ou da incolumidade física; tutela da saúde, quando aplicável; consentimento; e legítimo interesse da organização.",
          "Quando houver dados sensíveis, a base legal será avaliada com rigor adicional, podendo envolver consentimento específico, cumprimento de obrigação legal, exercício regular de direitos, proteção da vida, tutela da saúde, garantia de prevenção à fraude e segurança do titular, ou outra hipótese admitida pela LGPD."
        ]
      },
      {
        title: "6. Imagem, voz, vídeos e depoimentos",
        paragraphs: [
          "O Congresso poderá ser fotografado, filmado, transmitido ou gravado para fins jornalísticos, institucionais, históricos, acadêmicos, pastorais, promocionais e de prestação de contas. Em atividades abertas, plenárias, celebrações, painéis, filas, áreas comuns e registros coletivos, a imagem e a voz do participante poderão aparecer de forma incidental ou contextual.",
          "Usos destacados, individualizados, publicitários, entrevistas ou depoimentos poderão depender de autorização específica quando exigido por lei ou pelas boas práticas. Participantes com restrição relevante ao uso de imagem devem comunicar a organização antes do evento e no credenciamento."
        ]
      },
      {
        title: "7. Trabalhos científicos, certificados e anais",
        paragraphs: [
          "Dados relacionados a trabalhos submetidos, autores, coautores, títulos, resumos, áreas temáticas, arquivos e apresentações poderão ser tratados para avaliação, organização acadêmica, comunicação com autores, programação, emissão de certificados e eventual publicação em anais, relatórios, páginas oficiais ou materiais do Congresso.",
          "O participante declara possuir direitos, autorizações e bases adequadas para enviar conteúdos, documentos, imagens, referências ou dados de terceiros em trabalhos acadêmicos, assumindo responsabilidade pela licitude, originalidade e correção das informações submetidas."
        ]
      },
      {
        title: "8. Compartilhamento e fornecedores",
        paragraphs: [
          "Os dados poderão ser compartilhados com fornecedores e parceiros necessários à operação do Congresso, como plataformas de hospedagem, formulários, e-mail, pagamento, armazenamento, segurança, credenciamento, secretaria, certificação, transporte, hospedagem, produção audiovisual, suporte técnico, contabilidade, assessoria jurídica, autoridades públicas e instituições envolvidas na realização do evento.",
          "O compartilhamento será limitado ao necessário para cada finalidade. Quando cabível, serão exigidos compromissos de confidencialidade, segurança e tratamento adequado dos dados pessoais."
        ]
      },
      {
        title: "9. Segurança, retenção e eliminação",
        paragraphs: [
          "Adotamos medidas técnicas e administrativas razoáveis para proteger dados contra acessos não autorizados, perda, alteração, divulgação indevida e tratamento inadequado. Nenhum ambiente digital, entretanto, é absolutamente imune a riscos.",
          "Os dados serão mantidos pelo tempo necessário para cumprir as finalidades informadas, executar o evento, emitir certificados, manter histórico acadêmico e administrativo, cumprir obrigações legais, resguardar direitos, prevenir fraudes e atender auditorias ou questionamentos. Ao final do período aplicável, os dados poderão ser eliminados, anonimizados ou mantidos quando houver base legal."
        ]
      },
      {
        title: "10. Cookies, logs e segurança do site",
        paragraphs: [
          "O site pode usar cookies técnicos, registros de acesso, identificadores de dispositivo, endereço IP, dados de navegador e ferramentas de segurança para manter o funcionamento, medir desempenho, prevenir abuso, proteger formulários, controlar tentativas automatizadas e melhorar a experiência.",
          "Cookies estritamente necessários podem ser usados independentemente de consentimento. Cookies analíticos, publicitários ou de terceiros não essenciais, quando utilizados, deverão observar a legislação aplicável e as configurações disponibilizadas ao usuário."
        ]
      },
      {
        title: "11. Direitos do titular",
        paragraphs: [
          "Nos termos da LGPD, o titular pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade quando aplicável, informações sobre compartilhamento, oposição a tratamento irregular, revogação de consentimento e informações sobre consequências da negativa.",
          "Pedidos serão analisados mediante verificação de identidade e poderão ser recusados, limitados ou atendidos parcialmente quando houver obrigação legal, segredo comercial, preservação de direitos, prevenção a fraude, registros acadêmicos, comprovantes financeiros ou outra justificativa legal."
        ]
      },
      {
        title: "12. Atualizações e contato",
        paragraphs: [
          "Esta Política poderá ser atualizada para refletir mudanças legais, operacionais ou de segurança. A versão publicada no site prevalece sobre versões anteriores.",
          "Solicitações sobre dados pessoais devem ser encaminhadas pelo canal oficial de contato do Congresso, com identificação suficiente do solicitante e descrição clara do pedido."
        ]
      }
    ]
  },
  security: {
    slug: "seguranca",
    title: "Segurança",
    eyebrow: "Proteções técnicas",
    description:
      "Resumo das medidas de segurança, privacidade e redução de exposição de dados implementadas no projeto do hotsite.",
    updatedAt: "Baseado nas implementações atuais do projeto.",
    sections: [
      {
        title: "1. Headers de segurança",
        paragraphs: [
          "O projeto define headers globais de segurança em next.config.ts e remove exposições desnecessárias em produção."
        ],
        items: [
          "Strict-Transport-Security com max-age, includeSubDomains e preload.",
          "X-Content-Type-Options: nosniff.",
          "X-Frame-Options: DENY.",
          "Referrer-Policy: strict-origin-when-cross-origin.",
          "Permissions-Policy restringindo câmera, microfone e geolocalização.",
          "Content-Security-Policy com restrições para scripts, estilos, fontes, imagens, conexões, frames, objetos, base URI, ancestrais de frame e envio de formulários.",
          "poweredByHeader desativado e source maps de produção desabilitados."
        ]
      },
      {
        title: "2. Proteção do formulário de inscrição",
        paragraphs: [
          "O endpoint principal /api/inscricao aplica proteções antes de processar a inscrição."
        ],
        items: [
          "Aceita apenas requisições multipart/form-data.",
          "Limita o tamanho total da requisição a 12 MB.",
          "Usa honeypot por campo oculto website.",
          "Bloqueia envios rápidos demais com tempo mínimo de preenchimento de 3 segundos.",
          "Valida Cloudflare Turnstile no servidor quando TURNSTILE_SECRET_KEY está configurada.",
          "Aplica rate limit por IP com Upstash Redis quando as credenciais estão configuradas.",
          "Retorna erro 429 para excesso de tentativas quando o rate limit está ativo."
        ]
      },
      {
        title: "3. Validação e sanitização dos dados",
        paragraphs: [
          "Os dados enviados pelo formulário são validados com Zod e sanitizados antes do processamento."
        ],
        items: [
          "Campos obrigatórios são verificados no servidor.",
          "E-mail é validado com formato correto.",
          "CPF ou passaporte são exigidos conforme o caso.",
          "Campos condicionais são validados, como necessidade específica e nome para certificado.",
          "Arrays de campos múltiplos são normalizados.",
          "Textos têm caracteres < e > removidos, espaços normalizados e limites de tamanho aplicados."
        ]
      },
      {
        title: "4. Proteção contra injeção em e-mails",
        paragraphs: [
          "Os e-mails de notificação escapam conteúdo vindo do usuário antes de montar o HTML, reduzindo risco de HTML injection ou execução indevida de conteúdo enviado no formulário."
        ]
      },
      {
        title: "5. Segurança de uploads",
        items: [
          "São aceitos no máximo 3 arquivos.",
          "Apenas arquivos PDF são aceitos.",
          "Cada arquivo pode ter no máximo 10 MB.",
          "O total de anexos pode ter no máximo 10 MB.",
          "A extensão .pdf é exigida.",
          "O MIME type precisa ser application/pdf.",
          "O conteúdo inicial do arquivo precisa bater com a assinatura %PDF-.",
          "O nome do arquivo é normalizado e limitado antes de ser enviado por e-mail."
        ]
      },
      {
        title: "6. Redução de exposição de dados pessoais",
        items: [
          "A URL de checkout da Hotmart é montada sem nome, e-mail, telefone, CPF, passaporte ou endereço.",
          "Erros externos não são retornados diretamente ao usuário final.",
          "O log do endpoint usa mensagem segura de erro e não registra o payload completo do formulário.",
          "O mapa LGPD orienta a não registrar payload completo em logs e a não colocar dados pessoais em query string."
        ]
      },
      {
        title: "7. Endpoints antigos desativados",
        paragraphs: [
          "Os endpoints antigos de inscrição foram encerrados com resposta 410 Gone: /api/enviar-formulario e /api/inscricoes. Essas rotas informam que foram substituídas por /api/inscricao."
        ]
      },
      {
        title: "8. Documentação operacional de segurança e LGPD",
        items: [
          "LGPD_DATA_MAP.md: mapa de dados pessoais, finalidades, destinos, retenção sugerida e observações.",
          "SECURITY_CHECKLIST.md: checklist de pré-deploy para build, dependências, formulário, upload, dados pessoais, headers e operação.",
          "SECURITY_INCIDENT_RESPONSE.md: roteiro de resposta a incidente de segurança."
        ]
      },
      {
        title: "9. Terceiros considerados no tratamento de dados",
        items: [
          "Netlify: hospedagem e execução serverless.",
          "Brevo/Resend: envio de e-mail.",
          "Hotmart: checkout e pagamento.",
          "Cloudflare Turnstile: validação anti-bot quando configurado.",
          "Upstash Redis: rate limit quando configurado."
        ]
      }
    ]
  }
} satisfies Record<string, LegalPageCopy>;

export const legalFooterLinks = [
  { href: "termos-de-uso", label: "Termos de Uso" },
  { href: "politica-de-privacidade", label: "Política de Privacidade" },
  { href: "seguranca", label: "Segurança" }
];

const localizedLegalFooterLinks: Record<Locale, typeof legalFooterLinks> = {
  pt: legalFooterLinks,
  en: [
    { href: "termos-de-uso", label: "Terms of Use" },
    { href: "politica-de-privacidade", label: "Privacy Policy" },
    { href: "seguranca", label: "Security" }
  ],
  it: [
    { href: "termos-de-uso", label: "Termini di utilizzo" },
    { href: "politica-de-privacidade", label: "Informativa sulla privacy" },
    { href: "seguranca", label: "Sicurezza" }
  ]
};

const localizedLegalCopy: Record<
  Exclude<Locale, "pt">,
  Record<keyof typeof legalPages, Pick<LegalPageCopy, "title" | "eyebrow" | "description" | "updatedAt"> & { sectionTitles: string[] }>
> = {
  en: {
    terms: {
      title: "Terms of Use",
      eyebrow: "Legal terms",
      description:
        "Rules for website access, registration, paper submission, event participation, image and voice records, and user responsibilities.",
      updatedAt: "Updated for the 2026 International Congress on the Fatherhood of God.",
      sectionTitles: [
        "1. Acceptance of the terms",
        "2. Purpose of the website and event information",
        "3. Registration and participant responsibility",
        "4. Payments, cancellations and receipts",
        "5. Accreditation, conduct and security",
        "6. Scientific papers and submitted content",
        "7. Image, voice and event records",
        "8. Intellectual property",
        "9. Prohibited use of the website",
        "10. Limitation of liability",
        "11. Data protection and privacy",
        "12. Final provisions"
      ]
    },
    privacy: {
      title: "Privacy Policy",
      eyebrow: "Privacy and LGPD",
      description:
        "How personal data related to the Congress, registrations, communications, certificates, scientific papers, images, videos and event logistics may be processed.",
      updatedAt: "Updated for the 2026 International Congress on the Fatherhood of God.",
      sectionTitles: [
        "1. Controller, scope and application",
        "2. Personal data collected",
        "3. Sensitive data and special situations",
        "4. Purposes of processing",
        "5. Legal bases",
        "6. Image, voice, videos and testimonials",
        "7. Scientific papers, certificates and proceedings",
        "8. Sharing and suppliers",
        "9. Security, retention and deletion",
        "10. Cookies, logs and website security",
        "11. Data subject rights",
        "12. Updates and contact"
      ]
    },
    security: {
      title: "Security",
      eyebrow: "Technical protections",
      description:
        "Summary of the security, privacy and personal-data exposure reduction measures implemented in the hotsite project.",
      updatedAt: "Based on the current project implementation.",
      sectionTitles: [
        "1. Security headers",
        "2. Registration form protection",
        "3. Data validation and sanitization",
        "4. Protection against email injection",
        "5. Upload security",
        "6. Reduction of personal-data exposure",
        "7. Deprecated endpoints disabled",
        "8. Operational security and LGPD documentation",
        "9. Third parties considered in data processing"
      ]
    }
  },
  it: {
    terms: {
      title: "Termini di utilizzo",
      eyebrow: "Termini legali",
      description:
        "Regole per l'accesso al sito, l'iscrizione, l'invio di lavori, la partecipazione all'evento, le registrazioni di immagine e voce e le responsabilità dell'utente.",
      updatedAt: "Aggiornato per il Congresso Internazionale 2026 sulla Paternità di Dio.",
      sectionTitles: [
        "1. Accettazione dei termini",
        "2. Finalità del sito e informazioni sull'evento",
        "3. Iscrizione e responsabilità del partecipante",
        "4. Pagamenti, cancellazioni e ricevute",
        "5. Accreditamento, condotta e sicurezza",
        "6. Lavori scientifici e contenuti inviati",
        "7. Immagine, voce e registrazioni dell'evento",
        "8. Proprietà intellettuale",
        "9. Uso vietato del sito",
        "10. Limitazione di responsabilità",
        "11. Protezione dei dati e privacy",
        "12. Disposizioni finali"
      ]
    },
    privacy: {
      title: "Informativa sulla privacy",
      eyebrow: "Privacy e LGPD",
      description:
        "Come possono essere trattati i dati personali relativi al Congresso, alle iscrizioni, alle comunicazioni, ai certificati, ai lavori scientifici, alle immagini, ai video e alla logistica dell'evento.",
      updatedAt: "Aggiornato per il Congresso Internazionale 2026 sulla Paternità di Dio.",
      sectionTitles: [
        "1. Titolare, ambito e applicazione",
        "2. Dati personali raccolti",
        "3. Dati sensibili e situazioni speciali",
        "4. Finalità del trattamento",
        "5. Basi giuridiche",
        "6. Immagine, voce, video e testimonianze",
        "7. Lavori scientifici, certificati e atti",
        "8. Condivisione e fornitori",
        "9. Sicurezza, conservazione ed eliminazione",
        "10. Cookie, log e sicurezza del sito",
        "11. Diritti dell'interessato",
        "12. Aggiornamenti e contatto"
      ]
    },
    security: {
      title: "Sicurezza",
      eyebrow: "Protezioni tecniche",
      description:
        "Sintesi delle misure di sicurezza, privacy e riduzione dell'esposizione dei dati personali implementate nel progetto del hotsite.",
      updatedAt: "Basato sull'implementazione attuale del progetto.",
      sectionTitles: [
        "1. Header di sicurezza",
        "2. Protezione del modulo di iscrizione",
        "3. Validazione e sanitizzazione dei dati",
        "4. Protezione contro l'iniezione nelle e-mail",
        "5. Sicurezza degli upload",
        "6. Riduzione dell'esposizione dei dati personali",
        "7. Endpoint precedenti disattivati",
        "8. Documentazione operativa di sicurezza e LGPD",
        "9. Terze parti considerate nel trattamento dei dati"
      ]
    }
  }
};

export function getLegalFooterLinks(locale: Locale) {
  return localizedLegalFooterLinks[locale];
}

export function getLegalPages(locale: Locale): Record<keyof typeof legalPages, LegalPageCopy> {
  if (locale === "pt") {
    return legalPages;
  }

  const localized = localizedLegalCopy[locale];

  return {
    terms: localizeLegalPage(legalPages.terms, localized.terms),
    privacy: localizeLegalPage(legalPages.privacy, localized.privacy),
    security: localizeLegalPage(legalPages.security, localized.security)
  };
}

function localizeLegalPage(
  page: LegalPageCopy,
  localized: Pick<LegalPageCopy, "title" | "eyebrow" | "description" | "updatedAt"> & { sectionTitles: string[] }
): LegalPageCopy {
  return {
    ...page,
    title: localized.title,
    eyebrow: localized.eyebrow,
    description: localized.description,
    updatedAt: localized.updatedAt,
    sections: page.sections.map((section, index) => ({
      ...section,
      title: localized.sectionTitles[index] ?? section.title
    }))
  };
}
