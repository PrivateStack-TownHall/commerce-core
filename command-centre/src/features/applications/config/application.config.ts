import { APPLICATIONS } from "@/lib/constants";

const getApp = (id: string) => APPLICATIONS.find((app) => app.id === id)!;

export const APPLICATION_CONFIG = {
  "kings-brew": {
    app: getApp("kings-brew"),

    entityName: "Coffee",
    entityPluralName: "Coffees",

    endpoints: {
      entities: "/coffees",
      categories: "/coffee-categories",
      images: "/coffee-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },

  "castle-kitchen": {
    app: getApp("castle-kitchen"),

    entityName: "Steak",
    entityPluralName: "Steaks",

    endpoints: {
      entities: "/menu",
      categories: "/menu-categories",
      images: "/menu-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },

  "byte-burger": {
    app: getApp("byte-burger"),

    entityName: "Burger",
    entityPluralName: "Burgers",

    endpoints: {
      entities: "/burgers",
      categories: "/burger-categories",
      images: "/burger-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },

  "quantum-mart": {
    app: getApp("quantum-mart"),

    entityName: "Product",
    entityPluralName: "Products",

    endpoints: {
      entities: "/inventory",
      categories: "/inventory-categories",
      images: "/inventory-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },

  "trade-hub": {
    app: getApp("trade-hub"),

    entityName: "Product",
    entityPluralName: "Products",

    endpoints: {
      entities: "/catalog",
      categories: "/catalog-categories",
      images: "/catalog-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },

  "pineapple-stack": {
    app: getApp("pineapple-stack"),

    entityName: "Thread",
    entityPluralName: "Threads",

    endpoints: {
      entities: "/threads",
      categories: "/thread-categories",
      images: "/thread-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },

  "m-ployee": {
    app: getApp("m-ployee"),

    entityName: "Employee",
    entityPluralName: "Employees",

    endpoints: {
      entities: "/employees",
      categories: "/employee-categories",
      images: "/employee-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },

  codigram: {
    app: getApp("codigram"),

    entityName: "Post",
    entityPluralName: "Posts",

    endpoints: {
      entities: "/posts",
      categories: "/post-categories",
      images: "/post-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },

  "medieval-airbnb": {
    app: getApp("medieval-airbnb"),

    entityName: "Property",
    entityPluralName: "Properties",

    endpoints: {
      entities: "/properties",
      categories: "/property-categories",
      images: "/property-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },

  "leather-shelf": {
    app: getApp("leather-shelf"),

    entityName: "Book",
    entityPluralName: "Books",

    endpoints: {
      entities: "/books",
      categories: "/book-categories",
      images: "/book-images",
      reviews: "/reviews",
      orders: "/orders",
    },
  },
} as const;

export type ApplicationId = keyof typeof APPLICATION_CONFIG;

export type ApplicationConfig = (typeof APPLICATION_CONFIG)[ApplicationId];
