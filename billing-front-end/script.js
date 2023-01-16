const addRow = document.querySelector("#plus");
const removerRow = document.querySelector("#minus");
const tableBody = document.querySelector(".meta tbody");

//add rowfunction
function createRow() {
  let row = document.createElement("tr");
  row.classList.add("items-row");
  tableBody.appendChild(row);
  //no td creation
  let no_td = document.createElement("td");
  row.appendChild(no_td);
  let no_span = document.createElement("span");
  no_span.setAttribute("contenteditable", "true");
  no_span.classList.add("no");
  no_td.appendChild(no_span);

  // particulars td creation
  let particulars_td = document.createElement("td");
  row.appendChild(particulars_td);
  let particulars_span = document.createElement("span");
  particulars_span.setAttribute("contenteditable", "true");
  particulars_span.classList.add("particulars");
  particulars_td.appendChild(particulars_span);

  //hsncode td creation
  let hsncode_td = document.createElement("td");
  row.appendChild(hsncode_td);
  let hsncode_span = document.createElement("span");
  hsncode_span.setAttribute("contenteditable", "true");
  hsncode_span.classList.add("hsn-code");
  hsncode_td.appendChild(hsncode_span);

  //quantity td creation
  let quantity_td = document.createElement("td");
  row.appendChild(quantity_td);
  let quantity_span = document.createElement("span");
  quantity_span.setAttribute("contenteditable", "true");
  quantity_span.setAttribute("id", "item-quantity");
  quantity_span.classList.add("quantity");
  quantity_td.appendChild(quantity_span);

  //rate td creation
  let rate_td = document.createElement("td");
  row.appendChild(rate_td);
  let rate_span = document.createElement("span");
  rate_span.setAttribute("contenteditable", "true");
  rate_span.setAttribute("id", "item-price");
  rate_span.classList.add("rate");
  rate_td.appendChild(rate_span);

  //per td creation
  let per_td = document.createElement("td");
  row.appendChild(per_td);
  let per_span = document.createElement("span");
  per_span.setAttribute("contenteditable", "true");
  per_span.classList.add("per");
  per_td.appendChild(per_span);

  //amount td creation
  let amount_td = document.createElement("td");
  row.appendChild(amount_td);
  let amount_span = document.createElement("span");
  amount_span.setAttribute("contenteditable", "true");
  amount_span.setAttribute("id", "item-amount");
  amount_span.classList.add("amount");
  amount_td.appendChild(amount_span);

  //amount delete td creation
  let remove_td = document.createElement("td");
  row.appendChild(remove_td);
  let remove_i = document.createElement("i");
  remove_i.classList.add("fa-solid");
  remove_i.classList.add("fa-square-minus");
  remove_i.setAttribute("id", "minus");
  remove_td.appendChild(remove_i);
}
let value = 0;
function serialNoAutoCreation() {
  var a = document.querySelectorAll("table.meta tbody tr ");
  a.children[0].textContent = value;
  for (let i = 0; a[i]; i++) {
    e.a[i].textContent = value;
  }
}

//add the row on table
addRow.addEventListener("click", (e) => {
  createRow();
  removeItemRow();
  generateSerialNumber();
  generateTotal();
});

//remove the row on table
function removeItemRow() {
  const removeRowBtns = document.querySelectorAll("#minus");
  let saleValue = document.querySelector(".div1").children[0];
  let cGST = document.querySelector(".div2").children[0];
  let sGST = document.querySelector(".div2").children[1];
  let totalGST = document.querySelector(".gstDetails").children[5].children[1];
  let totalBillAmount = document.querySelector(".amounts-of-total");
  let wordsOfTotalAmount = document.querySelector(".amounts-of-words");

  for (let i = 0; i < removeRowBtns.length; i++) {
    let removerRowBtn = removeRowBtns[i];

    removerRowBtn.addEventListener("click", (e) => {
      const parentRow = e.target.parentElement.parentElement;
      parentRow.remove();
      generateSerialNumber();
      saleValue.textContent = calculateSaleValue();
      cGST.textContent = calculateGST();
      sGST.textContent = calculateGST();
      totalGST.textContent = calculateGSTTotal();
      totalBillAmount.textContent = calculateTotalBillAmount();
      wordsOfTotalAmount.textContent = 'Rupees ' + inWords(totalBillAmount.textContent);
    });
  }
}
removeItemRow();

//calculate total amount function

function generateSerialNumber() {
  const rows = document.querySelectorAll("table.meta tbody tr ");
  for (let i = 0; i < rows.length; i++) {
    let td = rows[i].children[0];
    td.textContent = i + 1;
  }
}

generateSerialNumber();

function generateTotal() {
  const rows = document.querySelectorAll("table.meta tbody tr ");
  rows.forEach((row) => {
    let quantity, price;
    let quantitySpan = row.children[3].querySelector("#item-quantity");
    let priceSpan = row.children[4].querySelector("#item-price");
    let item_amount = row.children[6];
    let saleValue = document.querySelector(".div1").children[0];
    let cGST = document.querySelector(".div2").children[0];
    let sGST = document.querySelector(".div2").children[1];
    let totalGST =
      document.querySelector(".gstDetails").children[5].children[1];
    let totalBillAmount = document.querySelector(".amounts-of-total");
    let wordsOfTotalAmount = document.querySelector(".amounts-of-words");

    quantitySpan.addEventListener("input", () => {
      quantity = parseInt(quantitySpan.textContent);
      item_amount.textContent = findTotal(quantity, price);
      saleValue.textContent = calculateSaleValue();
      cGST.textContent = calculateGST();
      sGST.textContent = calculateGST();
      totalGST.textContent = calculateGSTTotal();
      totalBillAmount.textContent = calculateTotalBillAmount();
      wordsOfTotalAmount.textContent = inWords(totalBillAmount.textContent);
    });

    priceSpan.addEventListener("input", () => {
      price = parseFloat(priceSpan.textContent);
      item_amount.textContent = findTotal(quantity, price).toString();
      saleValue.textContent = calculateSaleValue();
      cGST.textContent = calculateGST();
      sGST.textContent = calculateGST();
      totalGST.textContent = calculateGSTTotal();
      totalBillAmount.textContent = calculateTotalBillAmount();
      wordsOfTotalAmount.textContent = 'Rupees ' + inWords(totalBillAmount.textContent);
    });
  });
}

function findTotal(quantity, price) {
  if (!quantity) {
    quantity = 0;
  }

  if (!price) {
    price = 0.0;
  }

  return (quantity.toFixed(2) * price).toFixed(2);
}
generateTotal();

function calculateSaleValue() {
  const rows = document.querySelectorAll("table.meta tbody tr ");
  let sum = 0.0;
  rows.forEach((row) => {
    sum = sum + parseFloat(row.children[6].textContent);
  });
  return sum.toFixed(2).toString();
}

function calculateGST() {
  const saleValue = document.querySelector(".div1").children[0].textContent;
  const gst = parseFloat(saleValue) * 0.09;
  return gst.toFixed(2).toString();
}

function calculateGSTTotal() {
  let cGST = document.querySelector(".div2").children[0].textContent;
  let sGST = document.querySelector(".div2").children[1].textContent;
  return (parseFloat(cGST) + parseFloat(sGST)).toFixed(2).toString();
}

function calculateTotalBillAmount() {
  let saleValue = document.querySelector(".div1").children[0].textContent;
  let totalGST =
    document.querySelector(".gstDetails").children[5].children[1].textContent;
  const total = parseFloat(saleValue) + parseFloat(totalGST);
  return Math.round(total).toString();
}


var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}
