export const asset = (file: string) => `/figma-assets/${file}`;

export const images = {
  hero: "/figma-live/hero-bg.png",
  markDark: "/figma-live/header-logo.png",
  markMenu: "/figma-live/header-logo-compacta.png",
  markRegistration: asset("f99952d65570f9808efda718581e212e15dbed9a.png"),
  markGold: "/figma-live/hero-logo.png",
  heroBrush: "/figma-live/gold-brush.png",
  aerialNight: asset("c8cd7f4915c1e4a0e6d5b70cfd845b1115b66aba.jpg"),
  aerialFront: asset("ebc95632897e0003fa84daa15f8260bd302c9bcd.jpg"),
  aerialSide: asset("0a434210ab40c4fd5d869340cef02a266afdbd7d.jpg"),
  sanctuary: asset("c2efab4a74e128f2b96afccbb70f7b78dfb0d7af.jpg"),
  presentation: asset("3659b9ac7e666c772c104602a41247ba988bf38e.png"),
  theology: asset("4d35b2ba7d6516e20c8828f3b16bd048d737a3e3.png"),
  mysteryPresentation: asset("Aprsenta%C3%A7%C3%A3o.png"),
  mysteryTheology: asset("Fudamenta%C3%A7%C3%A3o%20Tol%C3%B3gica%20e%20eclesial.png"),
  academic: asset("801164d33e02f68ab6ac9146f2d5e9e8b9e5d57f.png"),
  results: asset("4824ce8893614987ed87ebbecfe13d27bb062f15.png")
};

export const logos = [
  "/santuario%20pai%20eterno.png",
  "/CONGREGACAO_REDENTORISTA.png",
  "/logo_abba.jpeg",
  asset("2a3b1367a9f59890738d1e5f690a7bed23f7906a.png"),
  asset("b01380e8c541931ed548baee09abdf1d27306ee8.png"),
  asset("76648d1d44417895acac40911e04cded7969151b.png"),
  asset("2cfe5dce2ec93ecc8729cea5cfdc9d4ac95f3e99.png"),
  asset("08047773b1e8c778ef7cc4e499449e0d2d7c27a3.png")
];

export const schedule = [
  {
    day: "DIA 09/11 — Segunda-feira",
    items: [
      ["14h", "Credenciamento — Cineteatro Pe. Jesus Flores"],
      ["20h", "Apresentações culturais na praça do Santuário"]
    ]
  },
  {
    day: "DIA 10/11 — Terça-feira",
    items: [
      ["8h30", "Cerimonial de abertura"],
      ["9h30", "Conferência de abertura — O Pai revelado por Jesus Cristo: fundamentos cristológicos — Cardeal José Tolentino de Mendonça"],
      ["14h30", "Mesa-redonda: A revelação do Pai no Antigo Testamento — Pe. João Paulo Santos, CSsR"],
      ["15h15", "A teologia patrística da Paternidade divina — Cardeal Berhaneyesus Souraphiel"],
      ["16h", "Debate"],
      ["17h", "Lanche"],
      ["17h15", "Comunicações científicas"],
      ["19h", "Missa no Santuário Basílica — presidida pelo Cardeal José Tolentino de Mendonça"],
      ["20h", "Apresentação cultural na praça do Santuário"]
    ]
  },
  {
    day: "DIA 11/11 — Quarta-feira",
    items: [
      ["8h30", "Oração"],
      ["9h", "Conferência — A Paternidade no mistério trinitário: geração eterna e comunhão — Prof.ª Maria Clara Lucchetti Bingemer"],
      ["10h30", "Lanche"],
      ["11h", "Debate"],
      ["14h30", "São Tomás de Aquino: a paternidade na Suma Teológica — Pe. Elílio de Faria Matos Júnior"],
      ["15h15", "A Paternidade de Deus no Magistério do Papa Francisco — Dom Ricardo Hoepers"],
      ["16h", "Debate"],
      ["17h", "Lanche"],
      ["17h15", "Comunicações científicas"],
      ["19h", "Missa no Santuário Matriz — Cardeal Óscar Rodriguez Maradiaga"],
      ["20h", "Apresentação cultural na praça do Santuário"]
    ]
  },
  {
    day: "DIA 12/11 — Quinta-feira",
    items: [
      ["8h30", "Oração"],
      ["9h", "Conferência — O Pai na liturgia eucarística e na oração da Igreja — Cardeal Óscar Rodriguez Maradiaga"],
      ["10h30", "Lanche"],
      ["11h", "Debate"],
      ["14h30", "Piedade popular e inculturação da fé — Dr. Bryan Thatcher"],
      ["15h15", "O Santuário do Divino Pai Eterno como locus theologicus — Dom João Justino de Medeiros Silva"],
      ["16h", "Debate"],
      ["17h", "Lanche"],
      ["17h15", "Comunicações científicas"],
      ["19h", "Missa no Santuário Basílica — presidida pelo Dom Danival Milagres Coelho"],
      ["20h", "Apresentação cultural na praça do Santuário"]
    ]
  },
  {
    day: "DIA 13/11 — Sexta-feira",
    items: [
      ["6h55", "Missa no Santuário Basílica — Dom João Justino de Medeiros Silva"],
      ["9h", "Conferência — A iconografia do Pai na tradição cristã — Frei Sidney Damasio Machado"],
      ["10h30", "Lanche"],
      ["11h", "Carta de Trindade sobre a Paternidade de Deus"],
      ["12h", "Encerramento"],
      ["14h30", "Visita guiada ao Santuário e canteiro de obras"]
    ]
  }
];

export const mysteryTabs = [
  {
    id: "apresentacao",
    title: "Apresentação",
    image: images.mysteryPresentation,
    summary:
      "O Santuário Basílica do Divino Pai Eterno acolhe o I Congresso Internacional de Teologia sobre a Paternidade de Deus.",
    detail:
      "O Santuário Basílica do Divino Pai Eterno, em Trindade (Goiás/Brasil), é uma expressão eloquente da piedade popular brasileira e um patrimônio espiritual da Igreja no Brasil. Reconhecido como centro nacional de peregrinação, este lugar sagrado acolhe, anualmente, milhões de fiéis que aqui manifestam sua fé e experimentam a ternura do Pai que nos chama de filhos e filhas amados.\n\nFiel à sua missão evangelizadora e em diálogo com a tradição teológica da Igreja, o Santuário promoverá, de <span>09 a 13 de novembro de 2026, o I Congresso Internacional de Teologia sobre a Paternidade de Deus,</span> reunindo teólogos, biblistas, liturgistas, pastoralistas, estudiosos da vida religiosa e cristãos leigos e leigas para aprofundar o mistério do Pai revelado em Jesus Cristo, celebrado na liturgia e vivido na piedade do povo de Deus."
  },
  {
    id: "fundamentacao",
    title: "Fundamentação teológica e eclesial",
    image: images.mysteryTheology,
    summary:
      "O Congresso nasce da experiência de fé vivida no Santuário, reconhecendo a piedade popular como lugar privilegiado de encontro com Deus Pai.",
    detail:
      "<span>1. O Santuário como locus theologicus da experiência do Pai</span>\n\nO Congresso nasce do reconhecimento de que o Santuário do Divino Pai Eterno é um espaço privilegiado onde a fé do povo expressa e aprofunda a experiência da Paternidade divina. Como afirma a Evangelii Gaudium, “na piedade popular pode-se perceber a modalidade em que a fé recebida se encarnou numa cultura e continua a transmitir-se” (EG 123).\n\n<span>2. Renovação cristocêntrica e trinitária da fé</span>\n\nO evento pretende recolocar no centro da reflexão teológica e da práxis pastoral a experiência fundante de Deus como Pai (Abbá), fonte da identidade eclesial e horizonte último da existência cristã. À luz da Revelação, redescobrimos que toda a vida cristã é resposta ao amor primordial do Pai: “a paternidade de Deus é amor infinito, ternura que se debruça sobre nós, filhos frágeis, necessitados de tudo” (Bento XVI, Audiência Geral, 30/01/2013).\n\n<span>3. Resposta teológico-pastoral à crise contemporânea de paternidade</span>\n\nDiante da fragmentação dos vínculos familiares e sociais, da crise das figuras de autoridade e do crescente individualismo, refletir sobre como a Paternidade divina oferece à sociedade um horizonte de sentido, reconciliação e fraternidade universal. Como ensina o Papa Francisco, Deus não é um ser distante ou anônimo, mas um Pai próximo, cheio de bondade e ternura (cf. Misericordiae Vultus).\n\n<span>4. Acolhida do Magistério Pontifício contemporâneo</span>\n\nO Congresso ecoa os apelos do Papa Francisco para que a Igreja testemunhe, de forma concreta, a ternura, a proximidade e a misericórdia — características que o Santo Padre identifica como “o estilo de Deus”. Está também em sintonia com o magistério de Bento XVI sobre o amor divino e com o ensinamento de São João Paulo II sobre a responsabilidade da paternidade.\n\nO Papa Leão XIV, no Angelus de 27 de julho de 2025, ensina que Jesus nos revela Deus Pai como aquele que manifesta a ternura do “Abbá”: um Pai próximo, amoroso e confiável, que acolhe seus filhos com simplicidade e confiança filial. Pela oração, especialmente o Pai-Nosso, descobrimos quem Ele é, e também quem somos nós: filhos amados, herdeiros de sua graça e sustentados por sua providência.\n\nAs imagens evangélicas nos mostram um Deus sempre disponível, que nunca fecha a porta, mesmo quando chegamos tarde, marcados por erros, cansaços ou oportunidades perdidas. Ele dá sempre o que é bom e age com sabedoria que supera nossa compreensão. Sua misericórdia ultrapassa nossas faltas e revela um amor que continuamente acolhe, perdoa e renova.\n\nAo chamarmos Deus de Pai, somos convidados a permitir que sua bondade transforme nosso coração, tornando-nos capazes de amar com paciência, brandura e solicitude, refletindo o rosto do Pai em nossas atitudes. A verdadeira filiação divina conduz à fraternidade: quem se reconhece filho aprende a ver nos outros seus irmãos, vivendo relações de cuidado, caridade e gratuidade. A liturgia, assim, nos introduz na doçura desse amor e nos envia a traduzi-lo em gestos concretos de bondade no cotidiano.\n\n<span>5. Perspectivas para a nova evangelização</span>\n\nEm contexto de pluralismo religioso e crescente secularização, o Congresso busca iluminar os caminhos da missão eclesial com categorias renovadas de comunhão, cuidado e esperança, todas fundadas na revelação da Paternidade divina como princípio (arché) e destino último (télos) da existência humana.\n\n<span>6. Contribuição para uma sociedade fraterna e solidária</span>\n\nRedescobrir o rosto paterno de Deus é reencontrar a raiz comum que nos constitui como irmãos em Cristo. Isso fortalece o compromisso da Igreja com a justiça social, a paz e o cuidado da Casa Comum (cf. Laudato Si’).\n\n<span>7. Integração entre lex orandi, lex credendi e lex vivendi</span>\n\nMais que um simpósio acadêmico, o Congresso deseja oferecer uma experiência integral que una rigor científico, celebração litúrgica, expressão devocional e conversão pastoral. Assim, testemunha-se a fecundidade do diálogo entre teologia e vida."
  }
];

export const formationTabs = [
  {
    title: "Objetivo geral",
    image: "/formation/objetivo-geral.png",
    text:
      "Promover reflexão e produção teológica sobre a Paternidade de Deus, articulando Sagrada Escritura, Tradição patrística e magisterial, Teologia Sistemática, Liturgia, Antropologia Teológica e Teologia Pastoral, com o intuito de iluminar a fé do povo de Deus e fortalecer a missão evangelizadora da Igreja."
  },
  {
    title: "Objetivos específicos",
    image: "/formation/objetivos-especificos.png",
    text:
      "Aprofundar o mistério da Paternidade de Deus no seio da Trindade; investigar a revelação bíblica da paternidade divina; dialogar com a teologia contemporânea; valorizar a piedade popular; fomentar a pesquisa teológica e estabelecer rede internacional de pesquisa.",
    detail:
      "Aprofundar o mistério da Paternidade de Deus no seio da Trindade;\nInvestigar a revelação bíblica da paternidade divina sob a perspectiva exegética e teológica;\nRevisitar a herança patrística, medieval e moderna sobre o tema;\nDialogar com a teologia contemporânea e os desafios culturais atuais;\nExaminar criticamente a crise de paternidade e suas repercussões antropológicas e sociais;\nValorizar a piedade popular como expressão autêntica do sensus fidei;\nFomentar a pesquisa teológica mediante publicação de anais e artigos científicos;\nEstabelecer rede internacional de pesquisa sobre a Paternidade de Deus."
  },
  {
    title: "Promoção e chancela institucional",
    image: "/formation/promocao-chancela-institucional.png",
    logos,
    text:
      "O I Congresso Internacional de Teologia sobre a Paternidade de Deus é promovido pelo Santuário Basílica do Divino Pai Eterno, por meio de sua Comissão Organizadora.",
    detail:
      "O I Congresso Internacional de Teologia sobre a Paternidade de Deus é promovido pelo Santuário Basílica do Divino Pai Eterno, por meio de sua Comissão Organizadora, e realizado sob a chancela da Arquidiocese de Goiânia, da Congregação do Santíssimo Redentor – Província de Brasília, da Conferência Nacional dos Bispos do Brasil <span>(CNBB), da Pontifícia Universidade Lateranense, da Pontifícia Universidade Católica de Goiás e do Instituto de Filosofia e Teologia de Goiás (IFITEG)</span>."
  },
  {
    title: "Resultados esperados",
    image: "/formation/resultados-esperados.png",
    text:
      "Publicação de anais, elaboração de subsídios pastorais, constituição de rede internacional de pesquisa, fortalecimento do diálogo entre teologia acadêmica e piedade popular e contribuição para a formação permanente."
  },
  {
    title: "Perspectiva acadêmica e metodológica",
    image: "/formation/perspectiva-academica-metodologica.png",
    text:
      "O Congresso articula a tradição de 186 anos de devoção ao Divino Pai Eterno, celebrada em Trindade, com a atualidade da pesquisa teológica internacional, percorrendo:",
    detail:
      "O Congresso articula a tradição de 186 anos de devoção ao Divino Pai Eterno, celebrada em Trindade, com a atualidade da pesquisa teológica internacional, percorrendo:\n\nos fundamentos bíblicos e patrísticos da revelação do Pai;\nos desenvolvimentos conciliares e magisteriais, de Niceia ao Vaticano II;\nas sínteses teológicas clássicas e contemporâneas;\nas expressões litúrgicas e devocionais, com atenção especial à piedade popular como sensus fidei.\n\nDestinado a bispos, presbíteros, diáconos, religiosos e religiosas, docentes, pesquisadores, estudantes de teologia, agentes de pastoral e devotos do Divino Pai Eterno, o evento oferece um espaço privilegiado de formação permanente e atualização teológica. Busca integrar academia, liturgia, pastoral e piedade popular, gerando frutos duradouros para a vida da Igreja."
  }
];

export const speakers = [
  {
    name: "Cardeal José Tolentino de Mendonça",
    role: "Vaticano",
    image: asset("21f4553cf34a8ef15b96036ac5f4cb58c8fdf9a4.jpg"),
    bio:
      "Prefeito do Dicastério para a Cultura e a Educação do Vaticano. É mestre em Ciências Bíblicas pelo Pontifício Instituto Bíblico, Roma, e doutor em Teologia Bíblica pela Universidade Católica Portuguesa."
  },
  {
    name: "Prof.ª Maria Clara Lucchetti Bingemer",
    role: "PUC-Rio",
    image: asset("c8a400be4b4eee37a5fd5ebdb0cc2a32e80902bf.png"),
    bio:
      "Possui graduação em Comunicação Social e Teologia pela PUC-Rio, mestrado em Teologia pela PUC-Rio e doutorado em Teologia Sistemática pela Pontifícia Universidade Gregoriana."
  },
  {
    name: "Cardeal Óscar Rodriguez Maradiaga",
    role: "Honduras",
    image: asset("06f7f8b71980367f439e221f9047802d4a14ab70.jpg"),
    bio:
      "Arcebispo emérito de Tegucigalpa, Honduras. Possui doutorados em Filosofia, Teologia e Teologia Moral, além de formação em Psicologia Clínica e Psicoterapia."
  },
  {
    name: "Dom João Justino de Medeiros Silva",
    role: "Arcebispo de Goiânia",
    image: asset("8ef937d58ca2c9b0679f4b32b1481bf245bd144f.jpg"),
    bio:
      "Arcebispo de Goiânia e Primeiro Vice-presidente da CNBB. Ingressou no Seminário Arquidiocesano Santo Antônio, em Juiz de Fora, onde cursou Filosofia e Teologia."
  },
  {
    name: "Dom Ricardo Hoepers",
    role: "secretário-geral da CNBB e Bispo Auxiliar",
    image: "/speakers/dom-ricardo-hoepers.jpg",
    bio:
      "Ordenado presbítero em 1999, após ter cursado Filosofia na Universidade Federal do Paraná e Teologia no Studium Theologicum, da Faculdade Claretiana de Teologia. Especialização e mestrado em Bioética, pela Faculdade São Camilo, de São Paulo (1999), e pela Academia Alfonsiana, de Roma (2011). Além de mestrado em Educação pela Pontifícia Universidade Católica do Paraná e doutorado em Teologia Moral pela Academia Alfonsiana. Atual secretário-geral da CNBB e Bispo Auxiliar da Arquidiocese de Brasília."
  },
  {
    name: "Frei Sidney Damasio Machado",
    role: "Curitiba",
    image: asset("742e74be3dc907bbb03dae076ba949dc1e1ff66e.png"),
    bio:
      "Frade menor capuchinho, doutor em Teologia pela Pontifícia Universidade Gregoriana de Roma, diplomado em Bens Culturais da Igreja e professor de Teologia."
  },
  {
    name: "Cardeal Berhaneyesus Demerew Souraphiel",
    role: "Etiópia",
    image: asset("008294b94eb3b748eda037d79e86d92c61a06129.png"),
    bio:
      "Arcebispo Metropolitano de Adis Abeba, Etiópia. Líder da Igreja Católica Etíope e Presidente da Conferência dos Bispos Católicos da Etiópia e Eritreia."
  },
  {
    name: "Dr. Bryan Thatcher",
    role: "Abba Our Father",
    image: asset("d83b295e33d23607a17782190d118424bf97957b.png"),
    bio:
      "Doutor em Medicina, Presidente da Organização Abba Our Father e fundador dos Apóstolos Eucarísticos da Divina Misericórdia."
  },
  {
    name: "Pe. Elílio de Faria Matos Júnior",
    role: "Arquidiocese de Juiz de Fora",
    image: asset("371910ef5f4acfbc9ede18da672e88e63e32fdff.png"),
    bio:
      "Padre da Arquidiocese de Juiz de Fora, com formação em Teologia, Filosofia e Teologia Moral, e doutorando em Filosofia pela Pontifícia Università Lateranense."
  },
  {
    name: "Pe. João Paulo dos Santos, CSsR",
    role: "Missionários Redentoristas",
    image: asset("b57fbb187434127b3f83762a27d533eab67345e4.png"),
    bio:
      "Mestre em Exegese Bíblica pelo Pontifício Instituto Bíblico de Roma. Superior Provincial dos Missionários Redentoristas, Província de Goiás."
  }
];

export const recommendations = {
  "Hotéis": [
    { name: "Hotel 01", image: "/hotel_01.jpg", text: "Sugestão de hospedagem próxima ao Santuário." },
    { name: "Hotel 02", image: "/hotel_02.jpg", text: "Opção para participantes que desejam fácil deslocamento." }
  ],
  "Restaurantes": [
    { name: "Restaurante 01", image: "/Restaurante_01.jpg", text: "Restaurante para refeições em grupo durante o evento." },
    { name: "Restaurante 02", image: "/Restaurante_02.jpg", text: "Opção para almoço e jantar nas proximidades." }
  ]
};

export const ruleCards = [
  {
    title: "Normas de Submissão",
    summary:
      "O envio dos trabalhos deverá ser feito exclusivamente pelo formulário de inscrição do evento: até o dia <span>18/10/2026. (acesso através do QR CODE)</span>",
    detail:
      "<span>IMPORTANTE:</span> É de responsabilidade do(a) participante, no momento da inscrição, inserir os dados do trabalho submetido (título, dados do autor ou coautores, se houver). Caso contrário, não será possível emitir o certificado de “trabalho apresentado”."
  },
  {
    title: "Submissão do resumo",
    summary: "Título, autores, instituição, resumo de até 150 palavras e palavras-chave.",
    detail:
      "• Título do trabalho.\n• Autor ou coautores e sua instituição de origem.\n• O texto do resumo deverá seguir as seguintes normas: máximo de 150 palavras, fonte Times New Roman 12, espaçamento entre linhas 1,5.\n• Palavras-chave: de 3 a 5 palavras, separadas por ponto-e-vírgula.\n• Os resumos deverão ser encaminhados em arquivo Word ou equivalente.\n• Observações:\n• Os resumos APROVADOS permitem ao autor (ou aos coautores) comunicar oralmente o tema proposto no Congresso.\n• Após o Congresso, os autores são convidados a publicar seus trabalhos nos anais do evento.\n• Os artigos enviados para os anais deverão possuir no mínimo 7 laudas e no máximo 10 laudas – incluindo referências e anexos. Deverão, além disso, ter a seguinte diagramação: fonte Times New Roman, tamanho 12, com espaçamento interlinear de 1,5, respeitando a seguinte sequência: Título // Título traduzido // Resumo // Palavras-chave // Resumo traduzido // Palavras-chave traduzidas // Introdução // Texto com subtítulos // Conclusão // Referências."
  },
  {
    title: "Comunicação oral",
    summary: "Apresentações de 10 minutos, com autor inscrito e trabalho aprovado.",
    detail:
      "• Tempo de apresentação de trabalhos: 10 minutos.\n• As comunicações orais poderão ter um autor ou até 3 coautores.\n• O autor apresentador necessariamente deverá estar inscrito no evento.\n• A comunicação deve partir do trabalho com resumo aprovado.\n• Está previsto tempo para discussão e interação com os autores, através de perguntas por parte dos participantes, mediadas pela coordenação de cada sala.\n• Conforme o cronograma, os trabalhos serão apresentados em 10, 11 e 12/11/2026, das 17h15 às 18h15.\n• O detalhamento da ordem de trabalhos por salas será disponibilizado no site, com, no mínimo, uma semana de antecedência ao início do evento."
  }
];
