export interface ContentItem {
  id?:        string;
  changedOn?: Date;
  createdOn?: Date;
  createdBy?: string;
  name?:      string;
  path?:      string;
  kind?:      string;
  mediaType?: string;
  documentKind?: string;
}

export enum ContentItemKind {
  Folder = 'folder',
  Document = 'document'
}
