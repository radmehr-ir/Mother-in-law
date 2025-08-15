// جستجوی صوتی
function startVoice(){
  if (!('webkitSpeechRecognition' in window)) {
    alert("مرورگر شما از فرمان صوتی پشتیبانی نمی‌کند");
    return;
  }
  let recognition = new webkitSpeechRecognition();
  recognition.lang = "fa-IR";
  recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    document.getElementById("searchInput").value = text;
    searchGoogle();
  };
  recognition.start();
}

// اجرای جستجو گوگل
function searchGoogle(){
  let query = document.getElementById("searchInput").value;
  if(!query) return alert("عبارت جستجو را وارد کنید");
  window.location.href = `https://cse.google.com/cse?cx=96bdd0cd9080f4517&q=${encodeURIComponent(query)}`;
}

// لیست خرید
let shoppingList = JSON.parse(localStorage.getItem("shoppingList") || "[]");
function renderList(){
  document.getElementById("shoppingList").innerHTML = shoppingList.map((item,i)=>`<li>${item} <button onclick="delItem(${i})">❌</button></li>`).join("");
}
function addItem(){
  let val = document.getElementById("itemInput").value;
  if(val){
    shoppingList.push(val);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    document.getElementById("itemInput").value = "";
    renderList();
  }
}
function delItem(i){
  shoppingList.splice(i,1);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  renderList();
}
if(document.getElementById("shoppingList")) renderList();

// یادآور
let reminders = JSON.parse(localStorage.getItem("reminders") || "[]");
function renderReminders(){
  if(document.getElementById("reminderList")){
    document.getElementById("reminderList").innerHTML = reminders.map(r=>`<li>${r.text} - ${new Date(r.time).toLocaleString('fa-IR')} (${r.repeat})</li>`).join("");
  }
}
function setReminder(){
  let time = new Date(document.getElementById("reminderTime").value).getTime();
  let text = document.getElementById("reminderText").value;
  let repeat = document.getElementById("repeatType").value;
  if(!time || !text) return alert("زمان و متن را وارد کنید");
  reminders.push({time, text, repeat});
  localStorage.setItem("reminders", JSON.stringify(reminders));
  renderReminders();
}
function checkReminders(){
  let now = Date.now();
  reminders.forEach((r,i)=>{
    if(Math.abs(now - r.time) < 1000*60){ // 1 دقیقه اختلاف
      document.getElementById("alarmSound").play();
      alert("⏰ " + r.text);
      if(r.repeat === "daily") r.time += 24*60*60*1000;
      if(r.repeat === "monthly") r.time = new Date(r.time).setMonth(new Date(r.time).getMonth()+1);
      if(r.repeat === "yearly") r.time = new Date(r.time).setFullYear(new Date(r.time).getFullYear()+1);
      localStorage.setItem("reminders", JSON.stringify(reminders));
    }
  });
}
setInterval(checkReminders, 60000);
if(document.getElementById("reminderList")) renderReminders();
