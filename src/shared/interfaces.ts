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

export interface AnswerOptionsArray {
  [key: number]: Option;
}

export interface CategoryOptionsByLanguage {
  [key: number]: string[] | AnswerOptionsArray[];
}
