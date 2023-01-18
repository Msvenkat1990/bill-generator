

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
  particulars_span.setAttribute("id", "item-particulars");
  particulars_td.appendChild(particulars_span);

  //hsncode td creation
  let hsncode_td = document.createElement("td");
  row.appendChild(hsncode_td);
  let hsncode_span = document.createElement("span");
  hsncode_span.setAttribute("contenteditable", "true");
  hsncode_span.classList.add("hsn-code");
  hsncode_span.setAttribute("id", "item-hsn-code");
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
  getItemNameAndHSNCode();
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
      wordsOfTotalAmount.textContent =
        "Rupees " + inWords(totalBillAmount.textContent);
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
function generateItemName(){
  const rows = document.querySelectorAll("table.meta tbody tr ");
  rows.forEach((row)=>{
    let particulars = row.children[1].querySelector("#item-particulars");
    let hsn_code = row.children[2].querySelector("#item-hsn-code");
    particulars.addEventListener('input',()=>{
        let particular = particulars.textContent;
    })

  })
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
      quantity = parseFloat(quantitySpan.textContent);
      price = parseFloat(priceSpan.textContent);
      item_amount.textContent = findTotal(quantity, price);
      saleValue.textContent = calculateSaleValue();
      cGST.textContent = calculateGST();
      sGST.textContent = calculateGST();
      totalGST.textContent = calculateGSTTotal();
      totalBillAmount.textContent = calculateTotalBillAmount();
      wordsOfTotalAmount.textContent =
        inWords(totalBillAmount.textContent).toString().concat(" (Rupees only)");
    });

    priceSpan.addEventListener("input", () => {
      price = parseFloat(priceSpan.textContent);
      item_amount.textContent = findTotal(quantity, price).toString();
      saleValue.textContent = calculateSaleValue();
      cGST.textContent = calculateGST();
      sGST.textContent = calculateGST();
      totalGST.textContent = calculateGSTTotal();
      totalBillAmount.textContent = calculateTotalBillAmount(); 
      wordsOfTotalAmount.textContent =
        inWords(totalBillAmount.textContent).toString().concat(" (Rupees only)");
    });
  });
}
function inputToInput(particular,hsn_code){
  
}

function findTotal(quantity, price) {
  if (!quantity) {
    quantity = 0.0;
  }

  if (!price) {
    price = 0.0;
  }
  return (quantity.toFixed(2) * price.toFixed(2)).toFixed(2);
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

var a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
var b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
      : "";
  return (str.charAt(0).toUpperCase() + str.slice(1));
}
//back-end connect function

//buttons get in js

const createBillBtn = document.querySelector(".create-button");
const printBtn = document.querySelector(".print-button");

//input value get in bill form
const custamerAddress = document.querySelector(".custmer_address");
const custamerGstNo = document.querySelector(".custmer_gtsno");
const billingNo = document.querySelector(".billNo");
const billingdate = document.querySelector(".date");
const serialno = document.querySelector("#serialNo");
const product = document.querySelectorAll(".product");
const productAmount = document.querySelector(".row-total");
const productPrice = document.querySelector("#item-price");
const productSaleValue = document.querySelector(".salesValue");
const productGst = document.querySelector(".totalGst");
const productTotalAmount = document.querySelector(".amounts-of-total");
billingdate.textContent = getCurrentDate();


createBillBtn.addEventListener("click", async () => {
  let particulars = product[1].textContent;
  let quantity = product[2].textContent;
  billingNo.textContent = gererateBillNumber();

  let address = custamerAddress.textContent;
  let gstNo = custamerGstNo.textContent;
  let billNo = billingNo.textContent;
  let date = billingdate.textContent;
  let salesValue = productSaleValue.textContent;
  let totalGst = productGst.textContent;
  let totalAmount = productTotalAmount.textContent;

  if (!address || !gstNo || !particulars || !quantity) {
    alert("Fill the required filed");
    return;
  }
  let products = [];
  const productRows = document.querySelectorAll(".items-row");
  for (let i = 0; i < productRows.length; i++) {
    const row = productRows[i];
    const product = {
      particulars: row.children[1].children[0].textContent,
      hsnCode: row.children[2].children[0].textContent,
      quantity: row.children[3].children[0].textContent,
      rate: row.children[4].children[0].textContent,
      per: row.children[5].children[0].textContent,
      amount: row.children[6].textContent,
    };
    products.push(product);
  }

  let body = {
    address: address,
    gstNo: gstNo,
    billNo: billNo,
    billDate: date,
    products: products,
    salesAmount: salesValue,
    totalGST: totalGst,
    totalBillAmount: totalAmount,
  };

  console.log(date);
  url = "http://localhost:2500/api/create";
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(() => {
      alert("Bill saved on database");
    })
    .catch((err) => {
      alert("Error generating bill!");
    });
});

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
}

function gererateBillNumber() {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const date = today.getDate().toString();
  const hour = today.getHours().toString();
  const minutes = today.getMinutes().toString();
  const seconds = today.getSeconds().toString();
  const billNumber =
    year.substring(2) + month + date + hour + minutes + seconds;
  return billNumber;
}

function getItemNameAndHSNCode(){
  let rows = document.querySelectorAll("table.meta tbody tr ");

  rows.forEach(async (row)=>{
    let particulars = row.children[1].querySelector("#item-particulars");
    let hsn_code = row.children[2].querySelector("#item-hsn-code");
    let rate = row.children[4].querySelector("#item-price");

    particulars.addEventListener('keydown', async (e)=>{
      
      let particular = particulars.textContent;
      
      if(e.key === "Tab" && particular){
        const type = "particulars";
        const value = particular;
        const result = await getHSNCodeData(type, value);
        console.log(result);
        particulars.textContent = result.particulars;
        hsn_code.textContent = result.hsnCode;
        rate.textContent = result.rate;
      }
      
    })

    hsn_code.addEventListener('keydown', async (e)=>{
      let hsncodeValue = hsn_code.textContent;

      if(e.key === "Tab" && hsncodeValue){
        const type = "hsnCode";
        const value = hsncodeValue;
        const result = await getHSNCodeData(type, value)
      
        particulars.textContent = result.particulars;
        hsn_code.textContent = result.hsnCode;
        rate.textContent = result.rate;
      }        
    })

  })
}
getItemNameAndHSNCode();

async function getHSNCodeData(type, value) {
      const result = await fetch(`http://localhost:2500/api/product/${type}/${value}`)
      .then((data) => data.json())
      return result;
}

