import { skusOnly } from "./shared.js";
import { idsToOmit } from "./idsToOmit.js";
import { orders } from "../generateJson.js";

// REFUNDS
// Refunded orders are stripped in generateReport.js > ordersToCount()
// ordersRefunded() checks if there have been any new refunds the script isn't aware of.
// As of 01/20/2024 there have been 4 refunds.
const ordersRefunded = orders.filter(
  (order) => order.FinancialStatus === "refunded"
);
let refunds = "---CHECK REFUNDS--";
ordersRefunded.forEach((order) => {
  refunds += "\n " + order.OrderID;
  refunds += "\n ";
});
const refundOutput = ordersRefunded.length > 4 ? refunds : "";

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
