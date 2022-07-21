import { Shopify, ApiVersion } from "@shopify/shopify-api";
import { Customer, DraftOrder } from "@shopify/shopify-api/dist/rest-resources/2022-04/index.js";



/*
  This module exists to create a dummy customer.
  The customer detail created is then used to draft orders.
  From these draft orders, a payment url is generated.
  My theory is that I can use the payment URL to checkout on Flow
*/

// These credentials can be obtained by creating a custom app
const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_ACCESS_TOKEN,
  SCOPES,
  SHOP,
  HOST
} = process.env
console.log("What is the shop???", SHOP)
// Initialize the Shopify context
Shopify.Context.initialize({
  API_KEY: SHOPIFY_API_KEY,
  API_SECRET_KEY: SHOPIFY_API_SECRET,
  SCOPES: SCOPES,
  API_VERSION: ApiVersion.April22,
  HOST_NAME: HOST,
  IS_EMBEDDED_APP: true
})

function returnShopifySession() {
  return {
    shop: SHOP,
    accessToken: SHOPIFY_ACCESS_TOKEN
  }
}


export async function createContact() {
  const session = returnShopifySession();
  const customer = new Customer({ session });
  customer.first_name = "Sam";
  customer.last_name = "Passy";
  customer.email = "passy2Orders@freenovationenergyscience.com";
  customer.phone = "+33769009832";
  customer.verified_email = true;
  customer.addresses = [
    {
      "address1": "5 Rue Menars",
      "city": "Paris",
      "province": "IDF",
      "phone": "76900-9832",
      "zip": "75002",
      "last_name": "Passy",
      "first_name": "Sam",
      "country": "FR"
    }
  ];
  const customerSaveResult = await customer.save({});
  console.log("The saved customer information is:", customerSaveResult)
  return customerSaveResult;
}
export async function createDraftOrder() {
  const session = returnShopifySession();
  const draft_order = new DraftOrder({ session });
  // Variant id : 42859920851181
  // Title : Future Cyborg

  draft_order.line_items = [
    {
      "variant_id": 42859920851181,
      "quantity": 1,
    }
  ];
  draft_order.applied_discount = {
    "description": "Custom discount",
    "value_type": "percentage",
    "value": "100.0",
    "amount": "35.0",
    "title": "Custom"
  }
  draft_order.customer = {
    "id": 6223428321517
  };
  const draftOrderRes = await draft_order.save({});

  console.log("The draft order is :", draftOrderRes)
  return draftOrderRes;
}

export async function getAllCustomers() {
  const session = returnShopifySession();
  const allCustomers = await Customer.all({
    session: session,
  });
  console.log("The customer list is :", allCustomers)
  return allCustomers;
}
export async function getAllDraftOrders() {
  /*
    Invoice url
    https://web-nft-demo.myshopify.com/64672923885/invoices/5b80acd3ff7d233aa42b6f1b011d820f
  */
  const session = returnShopifySession();
  const allDraftOrders = await DraftOrder.all({
    session: session
  });
  console.log("The customer list is :", allDraftOrders)
  return allDraftOrders;
}



