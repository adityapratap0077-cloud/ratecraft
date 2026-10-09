(function () {
  "use strict";

  var ids = ["currency", "goal", "hours", "weeksOff", "expenses", "tax", "fee"];
  var el = {};
  ids.forEach(function (id) { el[id] = document.getElementById(id); });

  var out = {
    hourly: document.getElementById("hourly"),
    dayRate: document.getElementById("dayRate"),
    monthly: document.getElementById("monthly"),
    billable: document.getElementById("billable"),
    revenue: document.getElementById("revenue"),
    hoursOut: document.getElementById("hoursOut"),
    weeksOffOut: document.getElementById("weeksOffOut"),
    taxOut: document.getElementById("taxOut"),
    feeOut: document.getElementById("feeOut")
  };

  function num(value, fallback) {
    var n = parseFloat(value);
    if (!isFinite(n) || n < 0) return fallback;
    return n;
  }

  function money(n, symbol) {
    var locale = symbol === "\u20B9" ? "en-IN" : "en-US";
    return symbol + Math.round(n).toLocaleString(locale);
  }

  function calc() {
    var symbol = el.currency.value;
    var goal = num(el.goal.value, 0);
    var hoursPerWeek = num(el.hours.value, 30);
    var weeksOff = num(el.weeksOff.value, 0);
    var expenses = num(el.expenses.value, 0);
    var taxRate = num(el.tax.value, 0) / 100;
    var feeRate = num(el.fee.value, 0) / 100;

    if (taxRate >= 1) taxRate = 0.99;
    if (feeRate >= 1) feeRate = 0.99;

    var billableHours = Math.max(hoursPerWeek * (52 - Math.min(weeksOff, 52)), 1);
    var grossNeeded = (goal + expenses) / (1 - taxRate);
    var hourlyBase = grossNeeded / billableHours;
    var hourly = hourlyBase / (1 - feeRate);

    out.hoursOut.textContent = hoursPerWeek;
    out.weeksOffOut.textContent = weeksOff;
    out.taxOut.textContent = Math.round(taxRate * 100) + "%";
    out.feeOut.textContent = Math.round(feeRate * 100) + "%";

    out.hourly.textContent = money(hourly, symbol);
    out.dayRate.textContent = money(hourly * 8, symbol);
    out.monthly.textContent = money(hourly * billableHours / 12, symbol);
    out.billable.textContent = Math.round(billableHours).toLocaleString("en-US") + " hrs";
    out.revenue.textContent = money(grossNeeded / (1 - feeRate), symbol);
  }

  ids.forEach(function (id) {
    el[id].addEventListener("input", calc);
    el[id].addEventListener("change", calc);
  });

  calc();
})();
