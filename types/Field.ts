export interface Field {
  key: string;
  label: string;
  children?: Field[];
  type?: string;
  readonly?: boolean;
  defaultValue?: any;
  placeholder?: string;
  isDict?: boolean;
  isDate?: boolean;
  isTime?: boolean;
}
