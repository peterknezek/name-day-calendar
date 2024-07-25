import { TStringDate } from './calendar';

export interface DefaultExport<Content> {
  default: Content;
}

export type TFileContent = Record<TStringDate, string[]>;
