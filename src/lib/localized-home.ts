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

export type HomeCopy = {
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
      "Deepen the mystery of the Fatherhood of God within the Trinity; investigate the biblical revelation of divine fatherhood; dialogue with contemporary theology; value popular piety; foster theological research and establish an international research network.",
    detail:
      "Deepen the mystery of the Fatherhood of God within the Trinity;\nInvestigate the biblical revelation of divine fatherhood from an exegetical and theological perspective;\nRevisit the patristic, medieval, and modern heritage on the theme;\nDialogue with contemporary theology and current cultural challenges;\nCritically examine the crisis of fatherhood and its anthropological and social repercussions;\nValue popular piety as an authentic expression of the sensus fidei;\nFoster theological research through the publication of proceedings and scientific articles;\nEstablish an international research network on the Fatherhood of God."
  },
  {
    ...formationTabs[2],
    title: "Institutional promotion and endorsement",
    text:
      "The 1st International Theology Congress on the Fatherhood of God is promoted by the Basilica Sanctuary of the Divine Eternal Father, through its Organizing Committee.",
    detail:
      "The 1st International Theology Congress on the Fatherhood of God is promoted by the Basilica Sanctuary of the Divine Eternal Father, through its Organizing Committee, and held under the endorsement of the Archdiocese of Goiania, the Congregation of the Most Holy Redeemer – Province of Brasilia, the National Conference of Bishops of Brazil <span>(CNBB), the Pontifical Lateran University, the Pontifical Catholic University of Goias, and the Institute of Philosophy and Theology of Goias (IFITEG)</span>."
  },
  {
    ...formationTabs[3],
    title: "Expected results",
    text:
      "Publication of proceedings, development of pastoral resources, establishment of an international research network, strengthening of dialogue between academic theology and popular piety, and contribution to ongoing formation."
  },
  {
    ...formationTabs[4],
    title: "Academic and methodological perspective",
    text:
      "The Congress connects the 186-year tradition of devotion to the Divine Eternal Father, celebrated in Trindade, with the current context of international theological research, covering:",
    detail:
      "The Congress connects the 186-year tradition of devotion to the Divine Eternal Father, celebrated in Trindade, with the current context of international theological research, covering:\n\nthe biblical and patristic foundations of the revelation of the Father;\nconciliar and magisterial developments, from Nicaea to Vatican II;\nclassical and contemporary theological syntheses;\nliturgical and devotional expressions, with special attention to popular piety as sensus fidei.\n\nIntended for bishops, priests, deacons, religious men and women, professors, researchers, theology students, pastoral agents, and devotees of the Divine Eternal Father, the event offers a privileged space for ongoing formation and theological updating. It seeks to integrate academia, liturgy, pastoral ministry, and popular piety, generating lasting fruits for the life of the Church."
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
    {
      name: "Cardinal Berhaneyesus Demerew Souraphiel",
      role: "Ethiopia",
      bio:
        "Metropolitan Archbishop of Addis Ababa, Ethiopia. Leader of the Ethiopian Catholic Church and President of the Catholic Bishops' Conference of Ethiopia and Eritrea."
    },
    {
      name: "Dr. Bryan Thatcher",
      role: "Abba Our Father",
      bio:
        "Doctor of Medicine, President of the Abba Our Father organization, and founder of the Eucharistic Apostles of Divine Mercy."
    },
    {
      name: "Fr. Elilio de Faria Matos Junior",
      role: "Archdiocese of Juiz de Fora",
      bio:
        "Priest of the Archdiocese of Juiz de Fora, with formation in Theology, Philosophy, and Moral Theology, and a doctoral candidate in Philosophy at the Pontifical Lateran University."
    },
    {
      name: "Fr. Joao Paulo dos Santos, CSsR",
      role: "Redemptorist Missionaries",
      bio:
        "Master in Biblical Exegesis from the Pontifical Biblical Institute in Rome. Provincial Superior of the Redemptorist Missionaries, Province of Goias."
    }
  ][index]
}));

const italianFormationTabs: typeof formationTabs = [
  {
    ...formationTabs[0],
    title: "Obiettivo generale",
    text:
      "Promuovere la riflessione e la produzione teologica sulla paternita di Dio, articolando la Sacra Scrittura, la Tradizione patristica e magisteriale, la Teologia sistematica, la Liturgia, l'Antropologia teologica e la Teologia pastorale."
  },
  {
    ...formationTabs[1],
    title: "Obiettivi specifici",
    text:
      "Approfondire il mistero della Paternita di Dio nel seno della Trinita; indagare la rivelazione biblica della paternita divina; dialogare con la teologia contemporanea; valorizzare la pieta popolare; promuovere la ricerca teologica e stabilire una rete internazionale di ricerca.",
    detail:
      "Approfondire il mistero della Paternita di Dio nel seno della Trinita;\nIndagare la rivelazione biblica della paternita divina da una prospettiva esegetica e teologica;\nRivisitare l'eredita patristica, medievale e moderna sul tema;\nDialogare con la teologia contemporanea e le attuali sfide culturali;\nEsaminare criticamente la crisi della paternita e le sue ripercussioni antropologiche e sociali;\nValorizzare la pieta popolare come espressione autentica del sensus fidei;\nPromuovere la ricerca teologica mediante la pubblicazione di atti e articoli scientifici;\nStabilire una rete internazionale di ricerca sulla Paternita di Dio."
  },
  {
    ...formationTabs[2],
    title: "Promozione e sostegno istituzionale",
    text:
      "Il 1° Congresso Internazionale di Teologia sulla Paternita di Dio e promosso dalla Basilica Santuario del Divino Padre Eterno, attraverso la sua Commissione Organizzatrice.",
    detail:
      "Il 1° Congresso Internazionale di Teologia sulla Paternita di Dio e promosso dalla Basilica Santuario del Divino Padre Eterno, attraverso la sua Commissione Organizzatrice, ed e realizzato con il patrocinio dell'Arcidiocesi di Goiania, della Congregazione del Santissimo Redentore – Provincia di Brasilia, della Conferenza Nazionale dei Vescovi del Brasile <span>(CNBB), della Pontificia Universita Lateranense, della Pontificia Universita Cattolica di Goias e dell'Istituto di Filosofia e Teologia di Goias (IFITEG)</span>."
  },
  { ...formationTabs[3], title: "Risultati attesi" },
  {
    ...formationTabs[4],
    title: "Prospettiva accademica e metodologica",
    text:
      "Il Congresso articola la tradizione di 186 anni di devozione al Divino Padre Eterno, celebrata a Trindade, con l'attualita della ricerca teologica internazionale, attraversando:",
    detail:
      "Il Congresso articola la tradizione di 186 anni di devozione al Divino Padre Eterno, celebrata a Trindade, con l'attualita della ricerca teologica internazionale, attraversando:\n\ni fondamenti biblici e patristici della rivelazione del Padre;\ngli sviluppi conciliari e magisteriali, da Nicea al Vaticano II;\nle sintesi teologiche classiche e contemporanee;\nle espressioni liturgiche e devozionali, con particolare attenzione alla pieta popolare come sensus fidei.\n\nDestinato a vescovi, presbiteri, diaconi, religiosi e religiose, docenti, ricercatori, studenti di teologia, operatori pastorali e devoti del Divino Padre Eterno, l'evento offre uno spazio privilegiato di formazione permanente e aggiornamento teologico. Cerca di integrare accademia, liturgia, pastorale e pieta popolare, generando frutti duraturi per la vita della Chiesa."
  }
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
      ["Valor da Inscrição", "R$ 200,00"]
    ],
    location: {
      name: "Santuário Basílica do Divino Pai Eterno",
      place: "Trindade, Goiás, Brasil",
      text: "Um lugar de fé, acolhimento e espiritualidade, que nos inspira a contemplar o mistério da Paternidade de Deus"
    },
    papersHeading: "Eixos temáticos sugeridos para comunicações científicas",
    papers: [
      "1. Teologia Trinitária e Ontologia",
      "2. Exegese e Teologia Bíblica da Filiação",
      "3. Cristologia: o Filho revelador do Pai",
      "4. Pneumatologia: o Espírito que clama “Abbá”",
      "5. Antropologia Teológica da Paternidade",
      "6. Teologia Espiritual e Mística",
      "7. Mariologia: Maria e o mistério da Paternidade",
      "8. Liturgia e Expressões Artísticas",
      "9. Piedade Popular e Sensus Fidei",
      "10. Teologia Pastoral e Evangelização",
      "11. Paternidade e Fraternidade Universal",
      "12. Perspectivas Ecumênicas e Inter-religiosas",
      "13. Diálogos interdisciplinares sobre a devoção ao Divino Pai Eterno"
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
      {
        ...ruleCards[0],
        title: "Submission Guidelines",
        summary: "Papers must be submitted exclusively through the event registration form by <span>10/18/2026. (access via QR CODE)</span>",
        detail:
          "<span>IMPORTANT:</span> It is the responsibility of the participant, at the time of registration, to enter the data of the submitted paper (title, author or coauthor data, if any). Otherwise, it will not be possible to issue the certificate for “presented paper”."
      },
      {
        ...ruleCards[1],
        title: "Abstract submission",
        summary: "Title, authors, institution, abstract of up to 150 words, and keywords.",
        detail:
          "• Paper title.\n• Author or coauthors and their institution of origin.\n• The abstract text must follow these rules: maximum of 150 words, Times New Roman 12, 1.5 line spacing.\n• Keywords: 3 to 5 words, separated by semicolons.\n• Abstracts must be submitted in Word or equivalent format.\n• Notes:\n• APPROVED abstracts allow the author (or coauthors) to orally present the proposed topic at the Congress.\n• After the Congress, authors are invited to publish their papers in the event proceedings.\n• Articles submitted for the proceedings must have a minimum of 7 pages and a maximum of 10 pages, including references and appendices. They must also follow this formatting: Times New Roman, size 12, with 1.5 line spacing, respecting the following sequence: Title // Translated title // Abstract // Keywords // Translated abstract // Translated keywords // Introduction // Text with subtitles // Conclusion // References."
      },
      {
        ...ruleCards[2],
        title: "Oral presentation",
        summary: "10-minute presentations; requires a registered author and an approved paper.",
        detail:
          "• Paper presentation time: 10 minutes.\n• Oral presentations may have one author or up to 3 coauthors.\n• The presenting author must necessarily be registered for the event.\n• The presentation must be based on a paper with an approved abstract.\n• Time is planned for discussion and interaction with the authors, through questions from participants, mediated by the coordination of each room.\n• According to the schedule, papers will be presented on 10, 11, and 12/11/2026, from 5:15 PM to 6:15 PM.\n• The detailed order of papers by room will be made available on the website at least one week before the beginning of the event."
      }
    ],
    info: [
      ["Course duration", "40 hours."],
      ["Certificate", "A certificate will be provided to all participants with at least 75% attendance."],
      ["Registration fee", "R$ 200,00"]
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
          "La Basilica Santuario del Divino Padre Eterno ospita il 1° Congresso Internazionale di Teologia sulla Paternità di Dio.",
        detail:
          "La Basilica Santuario del Divino Padre Eterno, a Trindade (Goiás/Brasile), è un'espressione eloquente della pietà popolare brasiliana e un patrimonio spirituale della Chiesa in Brasile. Riconosciuta come centro nazionale di pellegrinaggio, questo luogo sacro accoglie ogni anno milioni di fedeli che qui manifestano la loro fede e sperimentano la tenerezza del Padre che ci chiama figli e figlie amati.\n\nFedele alla sua missione evangelizzatrice e in dialogo con la tradizione teologica della Chiesa, il Santuario promuoverà, dal <span>9 al 13 novembre 2026, il 1° Congresso Internazionale di Teologia sulla Paternità di Dio,</span> riunendo teologi, biblisti, liturgisti, pastoralisti, studiosi della vita religiosa e cristiani laici e laiche per approfondire il mistero del Padre rivelato in Gesù Cristo, celebrato nella liturgia e vissuto nella pietà del popolo di Dio."
      },
      {
        ...mysteryTabs[1],
        title: "Fondamenti teologici ed ecclesiali",
        summary:
          "Il Congresso nasce dall'esperienza di fede vissuta nel Santuario, riconoscendo la pietà popolare come luogo privilegiato di incontro con Dio Padre.",
        detail:
          "<span>1. Il Santuario come locus theologicus dell'esperienza del Padre</span>\n\nIl Congresso nasce dal riconoscimento che il Santuario del Divino Padre Eterno è uno spazio privilegiato in cui la fede del popolo esprime e approfondisce l'esperienza della Paternità divina. Come afferma Evangelii Gaudium, “nella pietà popolare si può cogliere la modalità in cui la fede ricevuta si è incarnata in una cultura e continua a trasmettersi” (EG 123).\n\n<span>2. Rinnovamento cristocentrico e trinitario della fede</span>\n\nL'evento intende ricollocare al centro della riflessione teologica e della prassi pastorale l'esperienza fondante di Dio come Padre (Abbà), fonte dell'identità ecclesiale e orizzonte ultimo dell'esistenza cristiana. Alla luce della Rivelazione, riscopriamo che tutta la vita cristiana è risposta all'amore primordiale del Padre: “la paternità di Dio è amore infinito, tenerezza che si china su di noi, figli fragili, bisognosi di tutto” (Benedetto XVI, Udienza Generale, 30/01/2013).\n\n<span>3. Risposta teologico-pastorale alla crisi contemporanea della paternità</span>\n\nDi fronte alla frammentazione dei legami familiari e sociali, alla crisi delle figure di autorità e al crescente individualismo, riflettere su come la Paternità divina offra alla società un orizzonte di senso, riconciliazione e fraternità universale. Come insegna Papa Francesco, Dio non è un essere distante o anonimo, ma un Padre vicino, pieno di bontà e tenerezza (cf. Misericordiae Vultus).\n\n<span>4. Accoglienza del Magistero Pontificio contemporaneo</span>\n\nIl Congresso fa eco agli appelli di Papa Francesco affinché la Chiesa testimoni concretamente la tenerezza, la vicinanza e la misericordia — caratteristiche che il Santo Padre identifica come “lo stile di Dio”. È inoltre in sintonia con il magistero di Benedetto XVI sull'amore divino e con l'insegnamento di San Giovanni Paolo II sulla responsabilità della paternità.\n\nPapa Leone XIV, nell'Angelus del 27 luglio 2025, insegna che Gesù ci rivela Dio Padre come colui che manifesta la tenerezza dell'“Abbà”: un Padre vicino, amorevole e affidabile, che accoglie i suoi figli con semplicità e fiducia filiale. Attraverso la preghiera, specialmente il Padre Nostro, scopriamo chi Egli è e anche chi siamo noi: figli amati, eredi della sua grazia e sostenuti dalla sua provvidenza.\n\nLe immagini evangeliche ci mostrano un Dio sempre disponibile, che non chiude mai la porta, anche quando arriviamo tardi, segnati da errori, stanchezze o occasioni perdute. Egli dona sempre ciò che è buono e agisce con una sapienza che supera la nostra comprensione. La sua misericordia oltrepassa le nostre colpe e rivela un amore che continuamente accoglie, perdona e rinnova.\n\nChiamando Dio Padre, siamo invitati a lasciare che la sua bontà trasformi il nostro cuore, rendendoci capaci di amare con pazienza, mitezza e sollecitudine, riflettendo il volto del Padre nei nostri atteggiamenti. La vera filiazione divina conduce alla fraternità: chi si riconosce figlio impara a vedere negli altri i propri fratelli, vivendo relazioni di cura, carità e gratuità. La liturgia, così, ci introduce nella dolcezza di questo amore e ci invia a tradurlo in gesti concreti di bontà nella vita quotidiana.\n\n<span>5. Prospettive per la nuova evangelizzazione</span>\n\nIn un contesto di pluralismo religioso e crescente secolarizzazione, il Congresso cerca di illuminare i cammini della missione ecclesiale con categorie rinnovate di comunione, cura e speranza, tutte fondate sulla rivelazione della Paternità divina come principio (arché) e destino ultimo (télos) dell'esistenza umana.\n\n<span>6. Contributo a una società fraterna e solidale</span>\n\nRiscoprire il volto paterno di Dio significa ritrovare la radice comune che ci costituisce fratelli in Cristo. Ciò rafforza l'impegno della Chiesa per la giustizia sociale, la pace e la cura della Casa Comune (cf. Laudato Si').\n\n<span>7. Integrazione tra lex orandi, lex credendi e lex vivendi</span>\n\nPiù che un simposio accademico, il Congresso desidera offrire un'esperienza integrale che unisca rigore scientifico, celebrazione liturgica, espressione devozionale e conversione pastorale. Così si testimonia la fecondità del dialogo tra teologia e vita."
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
        {
          name: "Cardinale Berhaneyesus Demerew Souraphiel",
          role: "Etiopia",
          bio:
            "Arcivescovo metropolita di Addis Abeba, Etiopia. Leader della Chiesa cattolica etiope e Presidente della Conferenza dei Vescovi Cattolici di Etiopia ed Eritrea."
        },
        {
          name: "Dr. Bryan Thatcher",
          role: "Abba Padre Nostro",
          bio:
            "Dottore in Medicina, Presidente dell'organizzazione Abba Our Father e fondatore degli Apostoli Eucaristici della Divina Misericordia."
        },
        {
          name: "Fr. Elilio de Faria Matos Junior",
          role: "Arcidiocesi di Juiz de Fora",
          bio:
            "Sacerdote dell'Arcidiocesi di Juiz de Fora, con formazione in Teologia, Filosofia e Teologia Morale, e dottorando in Filosofia presso la Pontificia Universita Lateranense."
        },
        {
          name: "Fr. Joao Paulo dos Santos, CSsR",
          role: "Missionari Redentoristi",
          bio:
            "Maestro in Esegesi Biblica presso il Pontificio Istituto Biblico di Roma. Superiore Provinciale dei Missionari Redentoristi, Provincia di Goias."
        }
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
      {
        ...ruleCards[0],
        title: "Norme di presentazione",
        summary: "L'invio dei lavori dovra essere effettuato esclusivamente tramite il modulo di iscrizione all'evento: entro il giorno <span>18/10/2026. (accesso tramite QR CODE)</span>",
        detail:
          "<span>IMPORTANTE:</span> E responsabilita del/della partecipante, al momento dell'iscrizione, inserire i dati del lavoro presentato (titolo, dati dell'autore o dei coautori, se presenti). In caso contrario, non sara possibile emettere il certificato di “lavoro presentato”."
      },
      {
        ...ruleCards[1],
        title: "Invio dell'abstract",
        summary: "Titolo, autori, istituzione, abstract di massimo 150 parole e parole chiave.",
        detail:
          "• Titolo del lavoro.\n• Autore o coautori e la loro istituzione di origine.\n• Il testo dell'abstract dovra seguire le seguenti norme: massimo 150 parole, font Times New Roman 12, interlinea 1,5.\n• Parole chiave: da 3 a 5 parole, separate da punto e virgola.\n• Gli abstract dovranno essere inviati in formato Word o equivalente.\n• Osservazioni:\n• Gli abstract APPROVATI permettono all'autore (o ai coautori) di comunicare oralmente il tema proposto nel Congresso.\n• Dopo il Congresso, gli autori sono invitati a pubblicare i loro lavori negli atti dell'evento.\n• Gli articoli inviati per gli atti dovranno avere un minimo di 7 cartelle e un massimo di 10 cartelle, inclusi riferimenti e allegati. Dovranno inoltre avere la seguente impaginazione: font Times New Roman, dimensione 12, con interlinea 1,5, rispettando la seguente sequenza: Titolo // Titolo tradotto // Abstract // Parole chiave // Abstract tradotto // Parole chiave tradotte // Introduzione // Testo con sottotitoli // Conclusione // Riferimenti."
      },
      {
        ...ruleCards[2],
        title: "Comunicazione orale",
        summary: "Presentazioni di 10 minuti, con autore iscritto e lavoro approvato.",
        detail:
          "• Tempo di presentazione dei lavori: 10 minuti.\n• Le comunicazioni orali potranno avere un autore o fino a 3 coautori.\n• L'autore relatore dovra necessariamente essere iscritto all'evento.\n• La comunicazione deve partire dal lavoro con abstract approvato.\n• E previsto un tempo per la discussione e l'interazione con gli autori, attraverso domande dei partecipanti, mediate dal coordinamento di ciascuna sala.\n• Secondo il programma, i lavori saranno presentati il 10, 11 e 12/11/2026, dalle 17:15 alle 18:15.\n• Il dettaglio dell'ordine dei lavori per sala sara reso disponibile sul sito con almeno una settimana di anticipo rispetto all'inizio dell'evento."
      }
    ],
    info: [
      ["Durata del corso", "40 ore."],
      ["Certificato", "A tutti coloro che avranno almeno il 75% di presenze verrà rilasciato un attestato."],
      ["Quota di iscrizione", "R$ 200,00"]
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
