// ============================================================
// VERBOS - Basado en "Vocabulario y Guía de Inglés.docx"
// 10 verbos irregulares + 5 regulares (expandido de los 30 esenciales)
// ============================================================

export const IRREGULAR_VERBS = {
  be: {
    v1: 'am/is/are',
    v2: 'was/were',
    v3: 'been',
    es: 'ser/estar',
    examples: ['I am happy', 'She was tired', 'They have been busy']
  },
  have: {
    v1: 'have/has',
    v2: 'had',
    v3: 'had',
    es: 'tener',
    examples: ['I have a car', 'He had time', 'We have finished']
  },
  do: {
    v1: 'do/does',
    v2: 'did',
    v3: 'done',
    es: 'hacer',
    examples: ['I do my work', 'She did well', 'They have done it']
  },
  go: {
    v1: 'go/goes',
    v2: 'went',
    v3: 'gone',
    es: 'ir',
    examples: ['I go home', 'He went there', 'We have gone']
  },
  get: {
    v1: 'get/gets',
    v2: 'got',
    v3: 'got',
    es: 'obtener/llegar',
    examples: ['I get up early', 'She got the job', 'They have got it']
  },
  make: {
    v1: 'make/makes',
    v2: 'made',
    v3: 'made',
    es: 'hacer/crear',
    examples: ['I make coffee', 'He made a decision', 'We have made progress']
  },
  know: {
    v1: 'know/knows',
    v2: 'knew',
    v3: 'known',
    es: 'saber/conocer',
    examples: ['I know the answer', 'She knew him', 'They have known each other']
  },
  think: {
    v1: 'think/thinks',
    v2: 'thought',
    v3: 'thought',
    es: 'pensar',
    examples: ['I think so', 'He thought about it', 'We have thought carefully']
  },
  take: {
    v1: 'take/takes',
    v2: 'took',
    v3: 'taken',
    es: 'tomar/llevar',
    examples: ['I take the bus', 'She took her time', 'They have taken the opportunity']
  },
  speak: {
    v1: 'speak/speaks',
    v2: 'spoke',
    v3: 'spoken',
    es: 'hablar',
    examples: ['I speak English', 'He spoke clearly', 'We have spoken before']
  }
};

export const REGULAR_VERBS = {
  work: {
    v1: 'work/works',
    v2: 'worked',
    v3: 'worked',
    es: 'trabajar',
    examples: ['I work hard', 'She worked late', 'They have worked together']
  },
  want: {
    v1: 'want/wants',
    v2: 'wanted',
    v3: 'wanted',
    es: 'querer',
    examples: ['I want to learn', 'He wanted help', 'We have wanted this']
  },
  like: {
    v1: 'like/likes',
    v2: 'liked',
    v3: 'liked',
    es: 'gustar',
    examples: ['I like coffee', 'She liked the movie', 'They have liked it']
  },
  need: {
    v1: 'need/needs',
    v2: 'needed',
    v3: 'needed',
    es: 'necesitar',
    examples: ['I need time', 'He needed help', 'We have needed this']
  },
  live: {
    v1: 'live/lives',
    v2: 'lived',
    v3: 'lived',
    es: 'vivir',
    examples: ['I live here', 'She lived abroad', 'They have lived here for years']
  }
};

export const ALL_VERBS = { ...IRREGULAR_VERBS, ...REGULAR_VERBS };

export const VERB_KEYS_IRREGULAR = Object.keys(IRREGULAR_VERBS);
export const VERB_KEYS_REGULAR = Object.keys(REGULAR_VERBS);
export const VERB_KEYS_ALL = Object.keys(ALL_VERBS);