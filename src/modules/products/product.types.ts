export type ProductSearchQueryInput = {
  search?: string;
  category?: string;
  page?: string;
  limit?: string;
  minPrice?: string;
  maxPrice?: string;
};

export type VariantOption = {
  value: string;
  price?: number;
  stock?: number;
};

export type ProductVariant = {
  name: string;
  options: VariantOption[];
};

export type AddProductInput = {
  name: string;
  description?: string;

  price: number;
  discountPrice?: number;

  categoryId: string;
  subCategoryId?: string;

  brand?: string;

  sku?: string; // stock keeping unit
  stock: number;

  images: string[];

  isActive?: boolean;
  isFeatured?: boolean;

  tags?: string[];

  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };

  variants?: ProductVariant[];

  createdBy: string; // sellerId or adminId
};

export type UpdateProductInput = Partial<{
  id: string;

  name: string;
  description: string;

  price: number;
  discountPrice: number;

  categoryId: string;
  subCategoryId: string;

  brand: string;

  sku: string;
  stock: number;

  images: string[];

  isActive: boolean;
  isFeatured: boolean;

  tags: string[];

  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };

  variants: ProductVariant[];
}>;
