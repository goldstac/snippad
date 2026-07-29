export type BreadcrumbState = {
  base: string;
  path: string[];
  setBase: (to: string) => void;
  setPath: (path: string[]) => void;
};
