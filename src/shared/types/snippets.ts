export type SnippetFile = {
  name: string;
  content: string;
};

export type Metadata = {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  starred?: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Snip = {
  metadata: Metadata;
  files: SnippetFile[];
};

//////

export type CreateSnipInput = {
  title?: string;
  description?: string;
  tags?: string[];
  starred?: boolean;
  files: SnippetFile[];
};

export type UpdateSnipInput = Partial<{
  title: string;
  description: string;
  tags: string[];
  starred: boolean;
  files: SnippetFile[];
  updatedAt: Date | string;
}>;
