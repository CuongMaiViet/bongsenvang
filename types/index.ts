// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== PRODUCT PARAMS
export type CreateProductParams = {
  userId: string;
  product: {
    title: string;
    registrationNumber: string;
    imageUrl: string;
    price: string;
    ingredients: { ingredient: string; amount: string }[];
    category: string;
    formulation: string;
    characteristic: string[];
    benefit: string[];
    manual: {
      intro: string;
      useHow: string;
      useWhen: string;
      useAmount: { crop: string; pest: string; amount: string }[];
      note: string;
      quarantine: string;
      safetyInstruction: string;
      afterUse: string;
      firstAid: string;
    };
    mfg: string;
    exp: string;
    manufacturer: string;
    register: string;
    packager: string;
    distributer: string;
    distributedAtCountry: string[];
  };
  path: string;
};

export type UpdateProductParams = {
  userId: string;
  product: {
    _id: string;
    title: string;
    registrationNumber: string;
    imageUrl: string;
    price: string;
    ingredients: { ingredient: string; amount: string }[];
    category: string;
    formulation: string;
    characteristic: string[];
    benefit: string[];
    manual: {
      intro: string;
      useHow: string;
      useWhen: string;
      useAmount: { crop: string; pest: string; amount: string }[];
      note: string;
      quarantine: string;
      safetyInstruction: string;
      afterUse: string;
      firstAid: string;
    };
    mfg: string;
    exp: string;
    manufacturer: string;
    register: string;
    packager: string;
    distributer: string;
    distributedAtCountry: string[];
  };
  path: string;
};

export type DeleteProductParams = {
  productId: string;
  path: string;
};

export type GetAllProductsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetProductsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedProductsByCategoryParams = {
  categoryId: string;
  productId: string;
  limit?: number;
  page: number | string;
};

export type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

export type IDropdownShowData = {
  _id: string;
  title: string;
  abbreviation?: string;
};

export type INewData = {
  title: string;
  shortTitle?: string;
  abbreviation?: string;
  desc?: string;
  contacts?: {
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryTitle: string;
};

// ====== INGREDIENT PARAMS
export type CreateIngredientParams = {
  ingredientTitle: string;
  ingredientDesc: string;
};

// ====== CROP PARAMS
export type CreateCropParams = {
  cropTitle: string;
};

// ====== PEST PARAMS
export type CreatePestParams = {
  pestTitle: string;
};

// ====== FORMULATION PARAMS
export type CreateFormulationParams = {
  formulationTitle: string;
  formulationAbbre: string;
};

// ====== ORGANIZATION PARAMS
export type CreateOrganizationParams = {
  organizationTitle: string;
  organizationShortTitle: string;
  organizationContacts: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
};

export interface IOrganization extends Document {
  _id: string;
  title: string;
  contacts?: {
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string;
  productId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  productId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByEventParams = {
  productId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
