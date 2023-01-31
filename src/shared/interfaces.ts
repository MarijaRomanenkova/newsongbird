export interface Option {
  id: number;
  name: string;
  species: string;
  description: string;
  image: string;
  audio: string;
}

export interface OptionWithAdditionalProps extends Option {
  uniqueID?: string;
  isTouched: boolean;
  isCorrectAnswer: boolean;
}

export interface AnswerOptionsArray {
  [key: number]: Option;
}

export interface CurrentAnswerOptionsArray {
  [key: number]: OptionWithAdditionalProps[];
}

export interface BirdsDataByLanguage {
  [key: number]: string[] | AnswerOptionsArray[];
}
export interface BirdsData {
  [propertyName: string]: BirdsDataByLanguage[];
}
