export interface Option {
  id: number | string;
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

export interface AnswerOptionsArray extends Array<Option> {}

export interface CurrentAnswerOptionsArray
  extends Array<OptionWithAdditionalProps> {}

export interface CategoriesNames extends Array<string> {}

export interface BirdsDataByLanguage {
  [key: number]: string[] | AnswerOptionsArray[];
}
export interface BirdsData {
  [propertyName: string]: BirdsDataByLanguage[];
}
