export interface SearchIndexItem {
  url: string;
  title: string;
}

export interface SearchIndexFlexItem {
  index: number;
  title: string;
  slugTail: string;
}

export interface SearchIndex {
  flex: SearchIndexFlexItem[];
  items: Item[];
}

export type SearchResultItem = {
  title: string;
  url: string;
  positions: Set<number>;
};
