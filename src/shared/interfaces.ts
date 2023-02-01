export interface Option {
  id: number;
  name: string;
  species: string;
  description: string;
  image: string;
  audio: string;
  uniqueID?: string;
  isTouched?: boolean;
  isCorrectAnswer?: boolean;
}
