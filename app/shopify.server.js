import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import {MongoDBSessionStorage} from '@shopify/shopify-app-session-storage-mongodb';
import { BillingInterval } from "@shopify/shopify-api";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  billing: {
    ["business"]: {
      amount: 2.99,
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
    },
    ["business+"]: {
      amount: 9.99,
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
    },
  },
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new MongoDBSessionStorage('mongodb+srv://emailCheckr:12345@cluster0.z1pwf.mongodb.net/','sample_mflix'),
  distribution: AppDistribution.AppStore,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

console.log("SHOPIFY_API_KEY:", process.env.SHOPIFY_API_KEY);
console.log("SHOPIFY_API_SECRET:", process.env.SHOPIFY_API_SECRET);
console.log("SCOPES:", process.env.SCOPES);
console.log("SHOPIFY_APP_URL:", process.env.SHOPIFY_APP_URL);


export default shopify;
export const apiVersion = ApiVersion.October24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
