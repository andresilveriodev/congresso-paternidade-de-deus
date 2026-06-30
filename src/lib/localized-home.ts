import type { ReactNode } from "react";
import {
  formationTabs,
  mysteryTabs,
  recommendations,
  ruleCards,
  schedule,
  speakers
} from "@/lib/site-data";

type ScheduleItem = string[];
type ScheduleDay = { day: string; items: ScheduleItem[] };
type RecommendationItem = { name: string; image: string; text: string };
type RecommendationGroups = Record<string, RecommendationItem[]>;

type HomeCopy = {
  languages: { en: string; pt: string; it: string };
  hero: ReactNode;
  register: string;
  scheduleSubtitle: string;
  days: Array<{ label: string; day: string; month: string }>;
  schedule: ScheduleDay[];
  mysteryTitle: [string, string];
  formationTitle: [string, string];
  speakersTitle: [string, string];
  infoTitle: [string, string];
  locationTitle: [string, string];
  indicationsTitle: string;
  papersTitle: [string, string];
  mysteryTabs: typeof mysteryTabs;
  formationTabs: typeof formationTabs;
  speakers: typeof speakers;
  recommendations: RecommendationGroups;
  ruleCards: typeof ruleCards;
  info: Array<[string, string]>;
  location: { name: string; place: string; text: string };
  papersHeading: string;
  papers: string[];
  registerBand: string;
  footer: string;
};

const englishMysteryTabs: typeof mysteryTabs = [
  {
    ...mysteryTabs[0],
    title: "Introduction",
    summary:
      "The Basilica Sanctuary of the Divine Eternal Father hosts the 1st International Theology Congress on the Fatherhood of God.",
    detail:
      "The Basilica Sanctuary of the Divine Eternal Father, in Trindade (Goias/Brazil), is an eloquent expression of Brazilian popular piety and a spiritual heritage of the Church in Brazil. Recognized as a national pilgrimage center, this sacred place welcomes millions of faithful every year who express their faith and experience the tenderness of the Father who calls us beloved sons and daughters.\n\nFaithful to its evangelizing mission and in dialogue with the theological tradition of the Church, the Sanctuary will promote, from November 9 to 13, 2026, the 1st International Theology Congress on the Fatherhood of God, bringing together theologians, biblical scholars, liturgists, pastoral specialists, scholars of religious life, and lay Christian men and women."
  },
  {
    ...mysteryTabs[1],
    title: "Theological and ecclesial foundations",
    summary:
      "The Congress is born from the experience of faith lived at the Sanctuary, recognizing popular piety as a privileged place of encounter with God the Father.",
    detail:
      "The Congress is born from the recognition that the Sanctuary of the Divine Eternal Father is a privileged space where the faith of the people expresses and deepens the experience of divine Fatherhood. The event intends to place again at the center of theological reflection and pastoral practice the foundational experience of God as Father, source of ecclesial identity and ultimate horizon of Christian existence.\n\nIn the face of fragmented family and social bonds, reflecting on divine Fatherhood offers society a horizon of meaning, reconciliation, and universal fraternity. More than an academic symposium, the Congress seeks to unite scientific rigor, liturgical celebration, devotional expression, and pastoral conversion."
  }
];

const englishFormationTabs: typeof formationTabs = [
  {
    ...formationTabs[0],
    title: "General objective",
    text:
      "Promote theological reflection and production on the Fatherhood of God, articulating Sacred Scripture, patristic and magisterial Tradition, Systematic Theology, Liturgy, Theological Anthropology, and Pastoral Theology."
  },
  {
    ...formationTabs[1],
    title: "Specific objectives",
    text:
      "Deepen the mystery of the Fatherhood of God within the Trinity; investigate the biblical revelation of divine fatherhood; dialogue with contemporary theology; value popular piety; foster theological research and establish an international research network."
  },
  {
    ...formationTabs[2],
    title: "Institutional promotion and endorsement",
    text:
      "The Congress is promoted by the Basilica Sanctuary of the Divine Eternal Father and held under the endorsement of the Archdiocese of Goiania, the Province of Brasilia, CNBB, the Pontifical Lateran University, PUC Goias, and IFITEG."
  },
  {
    ...formationTabs[3],
    title: "Expected results",
    text:
      "Publication of proceedings, development of pastoral resources, establishment of an international research network, strengthening of dialogue between academic theology and popular piety, and contribution to ongoing formation."
  }
];

const englishSpeakers: typeof speakers = speakers.map((speaker, index) => ({
  ...speaker,
  ...[
    {
      name: "Cardinal Jose Tolentino de Mendonca",
      role: "Vatican",
      bio:
        "Prefect of the Dicastery for Culture and Education of the Vatican. He holds a master's degree in Biblical Sciences from the Pontifical Biblical Institute in Rome and a doctorate in Biblical Theology from the Portuguese Catholic University."
    },
    {
      name: "Prof. Maria Clara Lucchetti Bingemer",
      role: "PUC-Rio",
      bio:
        "She holds degrees in Social Communication and Theology from PUC-Rio, a master's degree in Theology from PUC-Rio, and a doctorate in Systematic Theology from the Pontifical Gregorian University."
    },
    {
      name: "Cardinal Oscar Rodriguez Maradiaga",
      role: "Honduras",
      bio:
        "Archbishop emeritus of Tegucigalpa, Honduras. He holds doctorates in Philosophy, Theology, and Moral Theology, as well as training in Clinical Psychology and Psychotherapy."
    },
    {
      name: "Archbishop Joao Justino de Medeiros Silva",
      role: "Archbishop of Goiania",
      bio:
        "Archbishop of Goiania and First Vice-President of the CNBB. He entered the Santo Antonio Archdiocesan Seminary in Juiz de Fora, where he studied Philosophy and Theology."
    },
    {
      name: "Bishop Ricardo Hoepers",
      role: "Secretary-General of the CNBB and Auxiliary Bishop",
      bio:
        "Ordained a priest in 1999 after studying Philosophy at the Federal University of Parana and Theology at Studium Theologicum, of the Claretian Faculty of Theology. He specialized and earned a master's degree in Bioethics from Faculdade Sao Camilo, Sao Paulo (1999), and the Alphonsian Academy, Rome (2011), as well as a master's degree in Education from the Pontifical Catholic University of Parana and a doctorate in Moral Theology from the Alphonsian Academy. He is currently Secretary-General of the CNBB and Auxiliary Bishop of the Archdiocese of Brasilia."
    },
    { name: "Friar Sidney Damasio Machado", role: "Curitiba" },
    { name: "Cardinal Berhaneyesus Demerew Souraphiel", role: "Ethiopia" },
    { name: "Dr. Bryan Thatcher", role: "Abba Our Father" },
    { name: "Fr. Elilio de Faria Matos Junior", role: "Archdiocese of Juiz de Fora" },
    { name: "Fr. Joao Paulo dos Santos, CSsR", role: "Redemptorist Missionaries" }
  ][index]
}));

const italianFormationTabs: typeof formationTabs = [
  {
    ...formationTabs[0],
    title: "Obiettivo generale",
    text:
      "Promuovere la riflessione e la produzione teologica sulla paternita di Dio, articolando la Sacra Scrittura, la Tradizione patristica e magisteriale, la Teologia sistematica, la Liturgia, l'Antropologia teologica e la Teologia pastorale."
  },
  { ...formationTabs[1], title: "Obiettivi specifici" },
  { ...formationTabs[2], title: "Promozione e sostegno istituzionale" },
  { ...formationTabs[3], title: "Risultati attesi" }
];

export const homeCopy: Record<"pt" | "en" | "it", HomeCopy> = {
  pt: {
    languages: { en: "Inglês", pt: "Português", it: "Italiano" },
    hero: "Uma jornada de fé no coração da devoção ao Pai Eterno",
    register: "Fazer Inscrição",
    scheduleSubtitle: "5 Dias de imersão teológica",
    days: [
      { label: "Segunda", day: "09", month: "Novembro" },
      { label: "Terça", day: "10", month: "Novembro" },
      { label: "Quarta", day: "11", month: "Novembro" },
      { label: "Quinta", day: "12", month: "Novembro" },
      { label: "Sexta", day: "13", month: "Novembro" }
    ],
    schedule,
    mysteryTitle: ["Mistério, Ternura", "e Missão da Igreja"],
    formationTitle: ["Pesquisa Teológica", "Formação Eclesial"],
    speakersTitle: ["Conferencistas", "e produção acadêmica"],
    infoTitle: ["Informações", "gerais"],
    locationTitle: ["Local do", "evento"],
    indicationsTitle: "Indicações",
    papersTitle: ["Trabalhos", "científicos"],
    mysteryTabs,
    formationTabs,
    speakers,
    recommendations,
    ruleCards,
    info: [
      ["Carga horária", "40 horas."],
      ["Certificado", "Será fornecido certificado a todos os que tiverem, no mínimo, 75% de frequência."],
      ["Valor da Inscrição", "R$ 350,00"]
    ],
    location: {
      name: "Santuário Basílica do Divino Pai Eterno",
      place: "Trindade, Goiás, Brasil",
      text: "Um lugar de fé, acolhimento e espiritualidade, que nos inspira a contemplar o mistério da Paternidade de Deus"
    },
    papersHeading: "Eixos temáticos sugeridos para comunicações científicas",
    papers: [
      "Teologia Trinitária e Ontologia",
      "Exegese e Teologia Bíblica da Filiação",
      "Cristologia: o Filho revelador do Pai",
      "Pneumatologia: o Espírito que clama \"Abbá\"",
      "Antropologia Teológica da Paternidade",
      "Teologia Espiritual e Mística",
      "Mariologia: Maria e o mistério da Paternidade",
      "Liturgia e Expressões Artísticas",
      "Piedade Popular e Sensus Fidei",
      "Teologia Pastoral e Evangelização",
      "Paternidade e Fraternidade Universal: Perspectivas Ecumênicas e Inter-religiosas",
      "Diálogos interdisciplinares sobre a devoção ao Divino Pai Eterno"
    ],
    registerBand:
      "Participe deste encontro internacional de fé, teologia e devoção no Santuário Basílica do Divino Pai Eterno, em Trindade-GO.",
    footer: "Todos direitos reservado Paternidade de Deus @2026"
  },
  en: {
    languages: { en: "English", pt: "Portuguese", it: "Italian" },
    hero: "A journey of faith at the heart of devotion to the Eternal Father",
    register: "Register",
    scheduleSubtitle: "5 Days of theological immersion",
    days: [
      { label: "Monday", day: "09", month: "November" },
      { label: "Tuesday", day: "10", month: "November" },
      { label: "Wednesday", day: "11", month: "November" },
      { label: "Thursday", day: "12", month: "November" },
      { label: "Friday", day: "13", month: "November" }
    ],
    schedule: [
      { day: "Monday", items: [["2:00 PM", "Accreditation — Cineteatro Fr. Jesus Flores"], ["8:00 PM", "Cultural performance at the Sanctuary square"]] },
      {
        day: "Tuesday",
        items: [
          ["8:30 AM", "Opening Ceremony"],
          ["9:30 AM", "Opening Lecture — The Father revealed by Jesus Christ: Christological foundations — Cardinal Jose Tolentino de Mendonca"],
          ["2:30 PM", "Roundtable: The revelation of the Father in the Old Testament — Fr. Joao Paulo Santos, CSsR"],
          ["3:15 PM", "Patristic theology of divine Fatherhood — Cardinal Berhaneyesus Souraphiel"],
          ["4:00 PM", "Discussion"],
          ["5:00 PM", "Refreshments"],
          ["5:15 PM", "Academic presentations"],
          ["7:00 PM", "Mass at the Basilica Sanctuary — presided over by Cardinal Jose Tolentino de Mendonca"],
          ["8:00 PM", "Cultural performance at the Sanctuary square"]
        ]
      },
      {
        day: "Wednesday",
        items: [
          ["8:30 AM", "Prayer"],
          ["9:00 AM", "Lecture — Fatherhood in the Trinitarian mystery: eternal generation and communion — Prof. Maria Clara Lucchetti Bingemer"],
          ["10:30 AM", "Refreshments"],
          ["11:00 AM", "Discussion"],
          ["2:30 PM", "Saint Thomas Aquinas: fatherhood in the Summa Theologiae — Fr. Elilio de Faria Matos Junior"],
          ["3:15 PM", "The Fatherhood of God in the Magisterium of Pope Francis — Bishop Ricardo Hoepers"],
          ["4:00 PM", "Discussion"],
          ["5:00 PM", "Refreshments"],
          ["5:15 PM", "Academic presentations"],
          ["7:00 PM", "Mass at the Mother Church Sanctuary — Cardinal Oscar Rodriguez Maradiaga"],
          ["8:00 PM", "Cultural performance at the Sanctuary square"]
        ]
      },
      {
        day: "Thursday",
        items: [
          ["8:30 AM", "Prayer"],
          ["9:00 AM", "Lecture — The Father in the Eucharistic liturgy and in the prayer of the Church — Cardinal Oscar Rodriguez Maradiaga"],
          ["10:30 AM", "Refreshments"],
          ["11:00 AM", "Discussion"],
          ["2:30 PM", "Popular piety and inculturation of faith — Dr. Bryan Thatcher"],
          ["3:15 PM", "The Sanctuary of the Divine Eternal Father as locus theologicus — Archbishop Joao Justino de Medeiros Silva"],
          ["4:00 PM", "Discussion"],
          ["5:00 PM", "Refreshments"],
          ["5:15 PM", "Academic presentations"],
          ["7:00 PM", "Mass at the Basilica Sanctuary — presided over by Bishop Danival Milagres Coelho"],
          ["8:00 PM", "Cultural performance at the Sanctuary square"]
        ]
      },
      {
        day: "Friday",
        items: [
          ["6:55 AM", "Mass at the Basilica Sanctuary — Archbishop Joao Justino de Medeiros Silva"],
          ["9:00 AM", "Lecture — The iconography of the Father in Christian tradition — Friar Sidney Damasio Machado"],
          ["10:30 AM", "Refreshments"],
          ["11:00 AM", "Letter of Trindade on the Fatherhood of God"],
          ["12:00 PM", "Closing"],
          ["2:30 PM", "Guided visit to the Sanctuary and construction site"]
        ]
      }
    ],
    mysteryTitle: ["Mystery, Tenderness,", "and the Mission of the Church"],
    formationTitle: ["Theological Research", "Ecclesial Formation"],
    speakersTitle: ["Speakers", "and academic output"],
    infoTitle: ["General", "information"],
    locationTitle: ["Event", "venue"],
    indicationsTitle: "Recommendations",
    papersTitle: ["Academic", "papers"],
    mysteryTabs: englishMysteryTabs,
    formationTabs: englishFormationTabs,
    speakers: englishSpeakers,
    recommendations: {
      Hotels: [
        { ...recommendations["Hotéis"][0], name: "Hotel 01", text: "Accommodation suggestion near the Sanctuary." },
        { ...recommendations["Hotéis"][1], name: "Hotel 02", text: "Option for participants who want easy transportation." }
      ],
      Restaurants: [
        { ...recommendations.Restaurantes[0], name: "Restaurant 01", text: "Restaurant for group meals during the event." },
        { ...recommendations.Restaurantes[1], name: "Restaurant 02", text: "Option for lunch and dinner nearby." }
      ]
    },
    ruleCards: [
      { ...ruleCards[0], title: "Submission Guidelines", summary: "Papers must be submitted exclusively via the event registration form by October 18, 2026 (access via QR code)." },
      { ...ruleCards[1], title: "Abstract submission", summary: "Title, authors, institution, abstract of up to 150 words, and keywords." },
      { ...ruleCards[2], title: "Oral presentation", summary: "10-minute presentations; requires a registered author and an approved paper." }
    ],
    info: [
      ["Course duration", "40 hours."],
      ["Certificate", "A certificate will be provided to all participants with at least 75% attendance."],
      ["Registration fee", "R$ 350.00"]
    ],
    location: {
      name: "Sanctuary Basilica of the Divine Eternal Father",
      place: "Trindade, Goias, Brazil",
      text: "A place of faith, hospitality, and spirituality that inspires us to contemplate the mystery of God's Fatherhood."
    },
    papersHeading: "Suggested thematic tracks for scientific papers",
    papers: [
      "Trinitarian Theology and Ontology",
      "Exegesis and Biblical Theology of Sonship",
      "Christology: The Son revealing the Father",
      "Pneumatology: The Spirit who cries out \"Abba\"",
      "Theological Anthropology of Fatherhood",
      "Spiritual Theology and Mysticism",
      "Mariology: Mary and the mystery of Fatherhood",
      "Liturgy and Artistic Expressions",
      "Popular Piety and Sensus Fidei",
      "Pastoral Theology and Evangelization",
      "Fatherhood and Universal Fraternity: Ecumenical and Interreligious Perspectives",
      "Interdisciplinary dialogues on devotion to the Divine Eternal Father"
    ],
    registerBand:
      "Join this international gathering of faith, theology, and devotion at the Sanctuary Basilica of the Divine Eternal Father in Trindade, Goias.",
    footer: "All rights reserved - Fatherhood of God @2026"
  },
  it: {
    languages: { en: "Inglese", pt: "Portoghese", it: "Italiano" },
    hero: "Un cammino di fede nel cuore della devozione al Padre Eterno",
    register: "Iscriviti",
    scheduleSubtitle: "5 giorni di immersione teologica",
    days: [
      { label: "Lunedì", day: "09", month: "Novembre" },
      { label: "Martedì", day: "10", month: "Novembre" },
      { label: "Mercoledì", day: "11", month: "Novembre" },
      { label: "Giovedì", day: "12", month: "Novembre" },
      { label: "Venerdì", day: "13", month: "Novembre" }
    ],
    schedule: [
      { day: "Lunedì", items: [["14:00", "Accreditamento — Cineteatro Padre Jesus Flores"], ["20:00", "Presentazione culturale nella piazza del Santuario"]] },
      {
        day: "Martedì",
        items: [
          ["8:30", "Cerimonia di apertura"],
          ["9:30", "Conferenza di apertura — Il Padre rivelato da Gesù Cristo: fondamenti cristologici — Cardinale Jose Tolentino de Mendonca"],
          ["14:30", "Tavola rotonda: La rivelazione del Padre nell'Antico Testamento — Padre Joao Paulo Santos, CSsR"],
          ["15:15", "La teologia patristica della paternità divina — Cardinale Berhaneyesus Souraphiel"],
          ["16:00", "Dibattito"],
          ["17:00", "Pausa caffè"],
          ["17:15", "Presentazioni scientifiche"],
          ["19:00", "Messa presso la Basilica Santuario — presieduta dal Cardinale Jose Tolentino de Mendonca"],
          ["20:00", "Presentazione culturale nella piazza del Santuario"]
        ]
      },
      {
        day: "Mercoledì",
        items: [
          ["8:30", "Preghiera"],
          ["9:00", "Conferenza — La paternità nel mistero trinitario: generazione eterna e comunione — Prof.ssa Maria Clara Lucchetti Bingemer"],
          ["10:30", "Pausa caffè"],
          ["11:00", "Dibattito"],
          ["14:30", "San Tommaso d'Aquino: la paternità nella Summa Theologiae — Padre Elilio de Faria Matos Junior"],
          ["15:15", "La Paternità di Dio nel Magistero di Papa Francesco — Dom Ricardo Hoepers"],
          ["16:00", "Dibattito"],
          ["17:00", "Pausa caffè"],
          ["17:15", "Presentazioni scientifiche"],
          ["19:00", "Messa presso il Santuario Matrice — Cardinale Oscar Rodriguez Maradiaga"],
          ["20:00", "Presentazione culturale nella piazza del Santuario"]
        ]
      },
      {
        day: "Giovedì",
        items: [
          ["8:30", "Preghiera"],
          ["9:00", "Conferenza — Il Padre nella liturgia eucaristica e nella preghiera della Chiesa — Cardinale Oscar Rodriguez Maradiaga"],
          ["10:30", "Pausa caffè"],
          ["11:00", "Dibattito"],
          ["14:30", "Pietà popolare e inculturazione della fede — Dr. Bryan Thatcher"],
          ["15:15", "Il Santuario del Divino Padre Eterno come locus theologicus — Dom Joao Justino de Medeiros Silva"],
          ["16:00", "Dibattito"],
          ["17:00", "Pausa caffè"],
          ["17:15", "Presentazioni scientifiche"],
          ["19:00", "Messa presso la Basilica Santuario — presieduta da Dom Danival Milagres Coelho"],
          ["20:00", "Presentazione culturale nella piazza del Santuario"]
        ]
      },
      {
        day: "Venerdì",
        items: [
          ["6:55", "Messa presso la Basilica Santuario — Dom Joao Justino de Medeiros Silva"],
          ["9:00", "Conferenza — L'iconografia del Padre nella tradizione cristiana — Frate Sidney Damasio Machado"],
          ["10:30", "Pausa caffè"],
          ["11:00", "Lettera di Trindade sulla Paternità di Dio"],
          ["12:00", "Chiusura"],
          ["14:30", "Visita guidata al Santuario e al cantiere"]
        ]
      }
    ],
    mysteryTitle: ["Mistero, tenerezza", "e missione della Chiesa"],
    formationTitle: ["Ricerca teologica", "Formazione ecclesiale"],
    speakersTitle: ["Relatori", "e produzione accademica"],
    infoTitle: ["Informazioni", "generali"],
    locationTitle: ["Luogo", "dell'evento"],
    indicationsTitle: "Indicazioni",
    papersTitle: ["Articoli", "scientifici"],
    mysteryTabs: [
      {
        ...mysteryTabs[0],
        title: "Presentazione",
        summary:
          "La Basilica Santuario del Divino Padre Eterno ospita il 1° Congresso Internazionale di Teologia sulla Paternità di Dio."
      },
      {
        ...mysteryTabs[1],
        title: "Fondamenti teologici ed ecclesiali",
        summary:
          "Il Congresso nasce dall'esperienza di fede vissuta nel Santuario, riconoscendo la pietà popolare come luogo privilegiato di incontro con Dio Padre."
      }
    ],
    formationTabs: italianFormationTabs,
    speakers: speakers.map((speaker, index) => ({
      ...speaker,
      ...[
        { name: "Cardinale Jose Tolentino de Mendonca", role: "Vaticano" },
        { name: "Prof. Maria Clara Lucchetti Bingemer", role: "PUC-Rio" },
        { name: "Cardinale Oscar Rodriguez Maradiaga", role: "Honduras" },
        { name: "Dom Joao Justino de Medeiros Silva", role: "Arcivescovo di Goiania" },
        { name: "Dom Ricardo Hoepers", role: "Segretario Generale della CNBB e Vescovo Ausiliare" },
        { name: "Frate Sidney Damasio Machado", role: "Curitiba" },
        { name: "Cardinale Berhaneyesus Demerew Souraphiel", role: "Etiopia" },
        { name: "Dr. Bryan Thatcher", role: "Abba Padre Nostro" },
        { name: "Fr. Elilio de Faria Matos Junior", role: "Arcidiocesi di Juiz de Fora" },
        { name: "Fr. Joao Paulo dos Santos, CSsR", role: "Missionari Redentoristi" }
      ][index]
    })),
    recommendations: {
      Hotel: [
        { ...recommendations["Hotéis"][0], name: "Hotel 01", text: "Sistemazione consigliata vicino al Santuario." },
        { ...recommendations["Hotéis"][1], name: "Hotel 02", text: "Opzione per i partecipanti che desiderano spostarsi facilmente." }
      ],
      Ristoranti: [
        { ...recommendations.Restaurantes[0], name: "Ristorante 01", text: "Ristorante per pasti di gruppo durante l'evento." },
        { ...recommendations.Restaurantes[1], name: "Ristorante 02", text: "Opzione per pranzo e cena nelle vicinanze." }
      ]
    },
    ruleCards: [
      { ...ruleCards[0], title: "Linee guida per la presentazione", summary: "Gli articoli devono essere inviati esclusivamente tramite il modulo di registrazione all'evento, entro il 18 ottobre 2026. (Accesso tramite codice QR)" },
      { ...ruleCards[1], title: "Invio dell'abstract", summary: "Titolo, autori, istituzione, abstract di massimo 150 parole e parole chiave." },
      { ...ruleCards[2], title: "Presentazione orale", summary: "Presentazioni di 10 minuti, con autore registrato e opera approvata." }
    ],
    info: [
      ["Durata del corso", "40 ore."],
      ["Certificato", "A tutti coloro che avranno almeno il 75% di presenze verrà rilasciato un attestato."],
      ["Quota di iscrizione", "R$ 350,00"]
    ],
    location: {
      name: "Santuario Basilica del Divino Padre Eterno",
      place: "Trindade, Goias, Brasile",
      text: "Un luogo di fede, accoglienza e spiritualità che ci ispira a contemplare il mistero della paternità di Dio."
    },
    papersHeading: "Aree tematiche suggerite per la comunicazione scientifica",
    papers: [
      "Teologia trinitaria e ontologia",
      "Esegesi e teologia biblica della filiazione",
      "Cristologia: il Figlio che rivela il Padre",
      "Pneumatologia: lo Spirito che grida \"Abbà\"",
      "Antropologia teologica della paternità",
      "Teologia spirituale e mistica",
      "Mariologia: Maria e il mistero della paternità",
      "Liturgia ed espressioni artistiche",
      "Pietà popolare e Sensus Fidei",
      "Teologia pastorale ed evangelizzazione",
      "Paternità e fraternità universale: prospettive ecumeniche e interreligiose",
      "Dialoghi interdisciplinari sulla devozione al Divino Padre Eterno"
    ],
    registerBand:
      "Partecipa a questo incontro internazionale di fede, teologia e devozione presso la Basilica Santuario del Divino Padre Eterno, a Trindade-GO.",
    footer: "Tutti i diritti riservati. Paternità di Dio @2026"
  }
};
