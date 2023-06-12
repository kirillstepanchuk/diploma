import { all } from "redux-saga/effects";
import adminWatcher from "./admin.worker";

import authorizationWatcher from "./auth.worker";
import productWatcher from "./product.worker";
import productsWatcher from "./products.worker";

export default function* sagaWatcher() {
  yield all([
    authorizationWatcher(),
    productWatcher(),
    productsWatcher(),
    adminWatcher(),
  ]);
}
