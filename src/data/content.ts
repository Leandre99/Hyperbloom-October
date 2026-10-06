/** Demo content — bilingual. In a real product this would come from the school LMS. */

export type L10n = { en: string; fr: string };

export interface MicroStep {
  id: string;
  label: L10n;
  minutes: number;
}

export interface Task {
  id: string;
  title: L10n;
  course: L10n;
  color: string; // course colour tag (also paired with an icon, never colour alone)
  icon: string;
  due: string; // ISO date
  lessonId?: string;
  steps: MicroStep[];
}

export interface Lesson {
  id: string;
  title: L10n;
  course: L10n;
  icon: string;
  minutes: number;
  keyIdeas: L10n[];
  paragraphs: L10n[];
}

export const lessons: Lesson[] = [
  {
    id: 'photosynthesis',
    icon: '🌿',
    minutes: 4,
    title: { en: 'How plants make their food', fr: 'Comment les plantes fabriquent leur nourriture' },
    course: { en: 'Biology', fr: 'Biologie' },
    keyIdeas: [
      { en: 'Plants use sunlight as energy.', fr: "Les plantes utilisent la lumière du soleil comme énergie." },
      { en: 'They turn water and CO₂ into sugar.', fr: "Elles transforment l'eau et le CO₂ en sucre." },
      { en: 'Oxygen is released as a by-product.', fr: "L'oxygène est rejeté comme sous-produit." },
    ],
    paragraphs: [
      {
        en: 'Plants cannot walk to the fridge when they are hungry. Instead, they make their own food. This process is called photosynthesis.',
        fr: "Les plantes ne peuvent pas aller au frigo quand elles ont faim. À la place, elles fabriquent leur propre nourriture. Ce processus s'appelle la photosynthèse.",
      },
      {
        en: 'It happens mostly in the leaves. Leaves contain a green substance called chlorophyll. Chlorophyll captures the energy of sunlight.',
        fr: "Elle a lieu surtout dans les feuilles. Les feuilles contiennent une substance verte appelée chlorophylle. La chlorophylle capte l'énergie de la lumière du soleil.",
      },
      {
        en: 'The plant takes in water through its roots and carbon dioxide from the air. Using the light energy, it combines them to make glucose, a type of sugar.',
        fr: "La plante absorbe l'eau par ses racines et le dioxyde de carbone de l'air. Grâce à l'énergie de la lumière, elle les combine pour fabriquer du glucose, un type de sucre.",
      },
      {
        en: 'Glucose gives the plant energy to grow. As a bonus, the plant releases oxygen into the air — the oxygen we breathe.',
        fr: "Le glucose donne à la plante l'énergie pour pousser. En bonus, la plante rejette de l'oxygène dans l'air — l'oxygène que nous respirons.",
      },
    ],
  },
  {
    id: 'essay',
    icon: '✍️',
    minutes: 3,
    title: { en: 'Writing a short essay, step by step', fr: 'Écrire une courte dissertation, étape par étape' },
    course: { en: 'Writing skills', fr: 'Expression écrite' },
    keyIdeas: [
      { en: 'Start with one clear idea.', fr: 'Commence par une idée claire.' },
      { en: 'One paragraph = one point.', fr: 'Un paragraphe = un argument.' },
      { en: 'Write first, fix later.', fr: "Écris d'abord, corrige ensuite." },
    ],
    paragraphs: [
      {
        en: 'A blank page can feel scary. The trick is to never face it all at once. Break the essay into tiny, friendly pieces.',
        fr: "Une page blanche peut faire peur. L'astuce est de ne jamais l'affronter d'un coup. Découpe la dissertation en petits morceaux faciles.",
      },
      {
        en: 'First, write your main idea in a single sentence. This is your thesis. Everything else will support it.',
        fr: "D'abord, écris ton idée principale en une seule phrase. C'est ta thèse. Tout le reste viendra la soutenir.",
      },
      {
        en: 'Next, list three reasons or examples. Each one becomes a paragraph. Do not worry about perfect words yet.',
        fr: "Ensuite, liste trois raisons ou exemples. Chacun devient un paragraphe. Ne t'inquiète pas encore des mots parfaits.",
      },
      {
        en: 'Finally, read it out loud — or let Calmly read it to you. Your ears will catch mistakes your eyes miss.',
        fr: "Enfin, relis-la à voix haute — ou laisse Calmly te la lire. Tes oreilles repèrent des erreurs que tes yeux ratent.",
      },
    ],
  },
  {
    id: 'fractions',
    icon: '🍕',
    minutes: 3,
    title: { en: 'Fractions with pizza', fr: 'Les fractions avec une pizza' },
    course: { en: 'Maths', fr: 'Maths' },
    keyIdeas: [
      { en: 'The bottom number = how many slices in total.', fr: 'Le nombre du bas = le nombre total de parts.' },
      { en: 'The top number = how many slices you take.', fr: 'Le nombre du haut = le nombre de parts que tu prends.' },
    ],
    paragraphs: [
      {
        en: 'Imagine a pizza cut into 8 equal slices. Each slice is one eighth of the pizza, written 1/8.',
        fr: 'Imagine une pizza coupée en 8 parts égales. Chaque part est un huitième de la pizza, qui s’écrit 1/8.',
      },
      {
        en: 'If you eat 3 slices, you ate 3/8 of the pizza. The bottom number tells you the total slices. The top number tells you how many you took.',
        fr: 'Si tu manges 3 parts, tu as mangé 3/8 de la pizza. Le nombre du bas indique le total de parts. Le nombre du haut indique combien tu en as pris.',
      },
      {
        en: 'Two slices out of eight, 2/8, is the same amount as one quarter, 1/4. Different numbers, same amount of pizza.',
        fr: 'Deux parts sur huit, 2/8, c’est la même quantité qu’un quart, 1/4. Des nombres différents, la même quantité de pizza.',
      },
    ],
  },
];

export const tasks: Task[] = [
  {
    id: 'bio-report',
    icon: '🌿',
    color: '#4f9d69',
    title: { en: 'Biology: photosynthesis summary', fr: 'Biologie : résumé sur la photosynthèse' },
    course: { en: 'Biology', fr: 'Biologie' },
    due: '2026-10-08',
    lessonId: 'photosynthesis',
    steps: [
      { id: 'b1', minutes: 4, label: { en: 'Read the lesson (or listen to it)', fr: 'Lire la leçon (ou l’écouter)' } },
      { id: 'b2', minutes: 3, label: { en: 'Write down the 3 key ideas', fr: 'Noter les 3 idées clés' } },
      { id: 'b3', minutes: 5, label: { en: 'Draw a simple diagram of a leaf', fr: 'Dessiner un schéma simple d’une feuille' } },
      { id: 'b4', minutes: 10, label: { en: 'Write 5 sentences explaining it', fr: 'Écrire 5 phrases pour l’expliquer' } },
      { id: 'b5', minutes: 2, label: { en: 'Upload your summary', fr: 'Déposer ton résumé' } },
    ],
  },
  {
    id: 'essay-draft',
    icon: '✍️',
    color: '#c27c3a',
    title: { en: 'Essay draft: “Why sleep matters”', fr: 'Brouillon : « Pourquoi le sommeil compte »' },
    course: { en: 'Writing skills', fr: 'Expression écrite' },
    due: '2026-10-10',
    lessonId: 'essay',
    steps: [
      { id: 'e1', minutes: 3, label: { en: 'Write your main idea in one sentence', fr: 'Écrire ton idée principale en une phrase' } },
      { id: 'e2', minutes: 5, label: { en: 'List 3 reasons', fr: 'Lister 3 raisons' } },
      { id: 'e3', minutes: 15, label: { en: 'Write paragraph 1', fr: 'Écrire le paragraphe 1' } },
      { id: 'e4', minutes: 15, label: { en: 'Write paragraphs 2 and 3', fr: 'Écrire les paragraphes 2 et 3' } },
    ],
  },
  {
    id: 'maths-sheet',
    icon: '🍕',
    color: '#5b7fc7',
    title: { en: 'Maths: fractions worksheet', fr: 'Maths : fiche sur les fractions' },
    course: { en: 'Maths', fr: 'Maths' },
    due: '2026-10-12',
    lessonId: 'fractions',
    steps: [
      { id: 'm1', minutes: 3, label: { en: 'Read the pizza lesson', fr: 'Lire la leçon de la pizza' } },
      { id: 'm2', minutes: 10, label: { en: 'Do exercises 1 to 4', fr: 'Faire les exercices 1 à 4' } },
      { id: 'm3', minutes: 10, label: { en: 'Do exercises 5 to 8', fr: 'Faire les exercices 5 à 8' } },
    ],
  },
];
