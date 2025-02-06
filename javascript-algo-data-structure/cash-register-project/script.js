let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// Tabel nilai tiap jenis mata uang (dalam dollar)
const DENOMINATIONS = [
  { name: "ONE HUNDRED", value: 100.00 },
  { name: "TWENTY", value: 20.00 },
  { name: "TEN", value: 10.00 },
  { name: "FIVE", value: 5.00 },
  { name: "ONE", value: 1.00 },
  { name: "QUARTER", value: 0.25 },
  { name: "DIME", value: 0.10 },
  { name: "NICKEL", value: 0.05 },
  { name: "PENNY", value: 0.01 }
];

// Referensi elemen DOM
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDisplay = document.getElementById("change-due");

// Fungsi untuk menghitung total uang di dalam laci (cid)
function getTotalCID(cidArray) {
  return cidArray.reduce((sum, curr) => sum + curr[1], 0);
}

// Fungsi utama untuk menghitung kembalian
function calculateChange() {
  // Parsing nilai input cash
  const cash = parseFloat(cashInput.value);
  
  // Validasi: Jika cash kurang dari harga, tampilkan alert
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    changeDueDisplay.textContent = "";
    return;
  }
  
  // Jika cash tepat sama dengan harga
  if (cash === price) {
    changeDueDisplay.textContent = "No change due - customer paid with exact cash";
    return;
  }
  
  // Hitung kembalian yang harus dikembalikan
  let changeDue = cash - price;
  // Menghindari masalah floating point dengan pembulatan ke 2 desimal
  changeDue = Math.round(changeDue * 100) / 100;
  
  // Hitung total uang di dalam laci
  const totalCID = Math.round(getTotalCID(cid) * 100) / 100;
  
  // Jika total di dalam laci persis sama dengan kembalian
  if (totalCID === changeDue) {
    // Status CLOSED: tampilkan semua uang yang ada di dalam laci
    // Untuk tampilan, hanya tampilkan yang nilainya > 0
    let closedOutput = "Status: CLOSED";
    cid.forEach(denom => {
      if (denom[1] > 0) {
        closedOutput += ` ${denom[0]}: $${denom[1]}`;
      }
    });
    changeDueDisplay.textContent = closedOutput;
    return;
  }
  
  // Jika total di dalam laci kurang dari kembalian
  if (totalCID < changeDue) {
    changeDueDisplay.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  
  // Jika total di dalam laci lebih besar dari kembalian, coba berikan kembalian dengan uang yang tersedia.
  let changeArray = [];
  let remainingChange = changeDue;
  
  // Membuat objek dari cid untuk pencarian yang mudah
  let cidObj = {};
  cid.forEach(item => {
    cidObj[item[0]] = item[1];
  });
  
  // Loop melalui setiap denomination dari yang tertinggi ke terendah
  for (let denom of DENOMINATIONS) {
    let amountFromDenom = 0;
    let denomValue = denom.value;
    let available = cidObj[denom.name];
    
    // Selama masih ada kembalian yang harus diberikan dan masih ada uang di denomination tersebut
    while (remainingChange >= denomValue - 0.0001 && available > 0) {
      remainingChange -= denomValue;
      remainingChange = Math.round(remainingChange * 100) / 100; // pembulatan untuk menghindari error float
      available -= denomValue;
      amountFromDenom += denomValue;
    }
    
    // Jika ada uang yang diambil dari denomination tersebut, tambahkan ke array hasil
    if (amountFromDenom > 0) {
      changeArray.push({ denomination: denom.name, amount: amountFromDenom });
    }
  }
  
  // Jika tidak dapat mengembalikan kembalian secara tepat, tampilkan INSUFFICIENT_FUNDS
  if (remainingChange > 0) {
    changeDueDisplay.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  
  // Format output string: "Status: OPEN DENOM1: $amount1 DENOM2: $amount2 ..." 
  let output = "Status: OPEN";
  changeArray.forEach(item => {
    // Menghilangkan trailing zero dengan toFixed(2) lalu mengkonversi ke number jika perlu.
    output += ` ${item.denomination}: $${item.amount}`;
  });
  changeDueDisplay.textContent = output;
}

// Event listener untuk tombol purchase
purchaseBtn.addEventListener("click", calculateChange);
