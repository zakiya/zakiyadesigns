import { orders, skusOnly } from "./shared.js";
import { idsToOmit } from "./idsToOmit.js";

// REFUNDS As of 6/3/2023 there have been 3 refunds.
const ordersRefunded = orders.filter(
  (order) => order.FinancialStatus === "refunded"
);
let refunds = "---CHECK REFUNDS--";
ordersRefunded.forEach((order) => {
  refunds += "\n " + order.OrderID;
  refunds += "\n ";
});
const refundOutput = ordersRefunded.length > 3 ? refunds : "";

// ADD TO NEEDS REVIEW
const ordersNeedingReview = orders
  .filter((order) => !idsToOmit.includes(order.OrderID))
  .filter((order) => !skusOnly.includes(order.Lineitemsku));

let needsReview = "\n ---NEEDS REVIEW----";
ordersNeedingReview.forEach((order) => {
  needsReview += "\n " + order.OrderID;
  needsReview += "\n " + order.Lineitemname;
  needsReview += "\n " + order.Lineitemsku + "\n ";
});
const needsReviewOutput = ordersNeedingReview.length > 1 ? needsReview : "";

const misc = refundOutput + needsReviewOutput;

export { misc };
