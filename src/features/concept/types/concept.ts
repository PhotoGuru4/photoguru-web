export interface ConceptItem {
  id: number;
  name: string;
  categoryName: string;
  createdAt: string;
  thumbnailUrl: string;
  photos: string[];
  packagesCount: number;
}

export interface ConceptStats {
  totalConcepts: number;
  thisMonth: number;
  categories: number;
}

export interface ConceptResponse {
    stats: ConceptStats;
    items: ConceptItem[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
}
