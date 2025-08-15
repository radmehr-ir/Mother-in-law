// جستجوی صوتی
function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("مرورگر شما از فرمان صوتی پشتیبانی نمی‌کند");
    return;
  }
  let recognition = new webkitSpeechRecognition();
  recognition.lang = "fa-IR";
  recognition.onresult = function (event) {
    let text = event.results[0][0].transcript;
    document.getElementById("searchInput").value = text;
    searchGoogle();
  };
  recognition.start();
}

// اجرای جستجو گوگل
function searchGoogle() {
  let query = document.getElementById("searchInput").value;
  if (!query) return alert("عبارت جستجو را وارد کنید");
  window.location.href = `https://cse.google.com/cse?cx=96bdd0cd9080f4517&q=${encodeURIComponent(query)}`;
}

// 📦 ذخیره و نمایش لیست خرید
let shoppingList = JSON.parse(localStorage.getItem("shoppingList") || "[]");

function renderList() {
  let listElement = document.getElementById("shoppingList");
  if (!listElement) return;
  listElement.innerHTML = shoppingList.map((item, i) =>
    `<li>${item} <button onclick="delItem(${i})">❌</button></li>`
  ).join("");
}

function addItem() {
  let val = document.getElementById("itemInput").value;
  if (val) {
    shoppingList.push(val);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    document.getElementById("itemInput").value = "";
    renderList();
  }
}

function delItem(i) {
  shoppingList.splice(i, 1);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  renderList();
}

// ⏰ یادآور با تکرار
function setReminder() {
  let time = new Date(document.getElementById("reminderTime").value).getTime();
  let text = document.getElementById("reminderText").value;
  let repeat = document.getElementById("repeatType").value;
  if (!time || !text) return alert("زمان و متن را وارد کنید");

  function scheduleNextReminder() {
    document.getElementById("alarmSound").play();
    alert("⏰ " + text);

    if (repeat === "daily") time += 24 * 60 * 60 * 1000;
    else if (repeat === "monthly") time += 30 * 24 * 60 * 60 * 1000;
    else if (repeat === "yearly") time += 365 * 24 * 60 * 60 * 1000;
  }

  setInterval(() => {
    if (Date.now() >= time) {
      scheduleNextReminder();
    }
  }, 1000);
}
