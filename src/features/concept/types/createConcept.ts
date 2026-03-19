import type { PackageType } from '@shared/constants/packageType';

export interface PackageLocation {
  province: string;
  ward: string;
}

export interface ConceptPackage {
  tier: PackageType;
  price: number;
  estimatedDuration: number;
  benefit: string[];
  locations: PackageLocation[];
}

export interface CreateConceptPayload {
  name: string;
  categoryId: number;
  description: string;
  thumbnailUrl: string;
  photoUrls: string[];
  packages: ConceptPackage[];
}
