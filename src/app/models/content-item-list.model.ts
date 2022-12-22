import { ContentItem } from './content-item.model';

export interface ContentList {
  totalCount?: number;
  pageSize?:   number;
  page?:       number;
  totalPages?: number;
  sortOrder?:  string;
  sortBy?:     string;
  items?:      ContentItem[];
}
