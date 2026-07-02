export type CreateCategoryInput = {
  name: string;
};

export type UpdateCategoryInput = CreateCategoryInput & {
  id: number;
};
