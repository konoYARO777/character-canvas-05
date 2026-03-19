export interface StorySection {
  title: string;
  content: string;
}

export interface CharacterColors {
  hair: string;
  eye1: string;
  eye2: string;
  skin: string;
  other: string;
}

export interface CharacterData {
  personality: string;
  name: string;
  age: string;
  species: string;
  gender: string;
  occupation: string;
  keywords: string;
  faceImage: string | null;
  bodyImage: string | null;
  galleryImages: string[];
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  dividerColor: string;
  characterColors: CharacterColors;
  stories: StorySection[];
  credit: string;
}

export const DEFAULT_CHARACTER: CharacterData = {
  personality: '',
  name: '',
  age: '',
  species: '',
  gender: '',
  occupation: '',
  keywords: '',
  faceImage: null,
  bodyImage: null,
  galleryImages: [],
  primaryColor: '#000000',
  secondaryColor: '#71717a',
  tertiaryColor: '#3f3f46',
  characterColors: {
    hair: '#2d2d2d',
    eye1: '#4a90d9',
    eye2: '#4a90d9',
    skin: '#f5d6c3',
    other: '#888888',
  },
  stories: [
    { title: '스토리 1', content: '' },
    { title: '스토리 2', content: '' },
    { title: '스토리 3', content: '' },
  ],
  credit: '',
};

export const OCCUPATIONS = [
  '학생', '전사', '마법사', '기술자', '무법자',
  '치유사', '학자', '상인', '암살자', '기사',
  '모험가', '사제', '연금술사', '궁수', '음유시인',
];
