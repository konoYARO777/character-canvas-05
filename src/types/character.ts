export interface CharacterData {
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
}

export const DEFAULT_CHARACTER: CharacterData = {
  name: '',
  age: '',
  species: '',
  gender: '',
  occupation: 'Student',
  keywords: '',
  faceImage: null,
  bodyImage: null,
  galleryImages: [],
  primaryColor: '#000000',
  secondaryColor: '#71717a',
};

export const OCCUPATIONS = [
  'Student', 'Warrior', 'Mage', 'Engineer', 'Outlaw',
  'Healer', 'Scholar', 'Merchant', 'Assassin', 'Knight',
];
