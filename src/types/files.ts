import { TStringDate } from './calendar';

export type DefaultExport<Content> = { default: Content };

export type TFileContent = Record<TStringDate, string[]>;
