// data.js
// Card data for "¿Dónde Está la Pupusa?" memory game

const BASE_CARDS = [
  {
    type: 'torogoz',
    label: 'Torogoz',
    imgSrc: './images/torogoz.png',
  },
  {
    type: 'maquilishuat',
    label: 'Maquilishuat',
    imgSrc: './images/maquilishuat.png',
  },
  {
    type: 'el-salvador',
    label: 'El Salvador',
    imgSrc: './images/el-salvador.png',
  },
  {
    type: 'tamales-de-elote',
    label: 'Tamales de Elote',
    imgSrc: './images/tamales-de-elote.png',
  },
  {
    type: 'garrobo',
    label: 'Garrobo',
    imgSrc: './images/garrobo.png',
  },
  {
    type: 'flor-de-izote',
    label: 'Flor de Izote',
    imgSrc: './images/flor-de-izote.png',
  },
  {
    type: 'barro-negro',
    label: 'Barro Negro',
    imgSrc: './images/barro-negro.png',
  },
  {
    type: 'tamales-de-gallina',
    label: 'Tamales de Gallina',
    imgSrc: './images/tamales-de-gallina.png',
  },
  {
    type: 'atol-shuco',
    label: 'Atol Shuco',
    imgSrc: './images/atol-shuco.png',
  },
  {
    type: 'mango-verde',
    label: 'Mango Verde',
    imgSrc: './images/mango-verde.png',
  },
  {
    type: 'casa-de-adobo',
    label: 'Casa de Adobo',
    imgSrc: './images/casa-de-adobo.png',
  },
  {
    type: 'pupusas',
    label: 'Pupusas',
    imgSrc: './images/pupusas.png',
  },
];

// Funny phrases when the player finds a match
const MATCH_MESSAGES = [
  'Eso cipote/cipota, good job.',
  'Yay, encontraste un par.',
  'Púchica, Lucky you!.',
  'YUP, Ahí va agarrando ritmo la cosa.',
];

// Funny phrases when the player misses
const MISMATCH_MESSAGES = [
  'Casi, casi… try again.',
  'Oh well, así es la vida.',
  'Te faltó un poquito, cipote/cipota.',
  'Esa no era. Probá otra vez.',
];

// Win message
const WIN_MESSAGE =
  'Ganaste!!! YOU WON!!';
