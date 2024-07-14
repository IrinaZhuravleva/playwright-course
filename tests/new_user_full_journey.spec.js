import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from "../page-objects/LoginPage.js";
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage.js";
import { deliveryDetails as userAddress} from "./../data/deliveryDetail.js"
import { PaymentPage } from "../page-objects/PaymentPage.js"

import { v4 as uuidv4 } from "uuid";

test.only("New user full end-to-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const login = new LoginPage(page);

  await productsPage.visit();
  await productsPage.sortedByCheapest();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new Checkout(page); // create a new page called Checkout
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();
  await login.moveToSignUp();

  const emailId = uuidv4() + "@gmail.com";
  const passwordId = uuidv4();
  const registerPage = new RegisterPage(page);
  await registerPage.signUpAsNewUser(emailId, passwordId);

  const deliveryDetails = new DeliveryDetailsPage(page);
   await deliveryDetails.fillDetails(userAddress);
   await deliveryDetails.saveDetails()
   await deliveryDetails.continueToGetPayment()

   const paymentPage = new PaymentPage(page)
   await paymentPage.activateDiscount()
});
