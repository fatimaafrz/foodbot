// عناصر صفحه

const botAnswers = {

    "سلام":"سلام 😊\nبه FoodBot خوش اومدی.\nاگر قصد سفارش داری روی «شروع سفارش» کلیک کن.",

    "سلام خوبی":"سلام 😊\nمرسی، خوبم.\nامیدوارم تو هم حالت عالی باشه 🌹",

    "خوبی":"مرسی از اینکه پرسیدی 😊",

    "صبح بخیر":"صبح شما هم بخیر ☀️",

    "شب بخیر":"شب خوش 🌙",

    "خداحافظ":"خدانگهدار ❤️\nمنتظر سفارشت هستیم.",

    "بای":"فعلاً 👋",

    "ممنون":"خواهش می‌کنم 🌹",

    "مرسی":"قابلی نداشت 😊",

    "تشکر":"خواهش می‌کنم ❤️"

};
const restaurantInfo = {

    "آدرس":"📍 آدرس رستوران:\nتهران، خیابان آزادی، پلاک ۱۲۳",

    "شماره":"📞 شماره تماس:\n02112345678",

    "تلفن":"📞 شماره تماس:\n02112345678",

    "ساعت":"🕒 ساعت کاری:\nهمه روزه از 11 صبح تا 11 شب",

    "ارسال":"🚚 هزینه ارسال:\nبرای سفارش‌های بالای 500 هزار تومان رایگان است.",

    "پرداخت":"💳 پرداخت آنلاین و پرداخت هنگام تحویل امکان‌پذیر است.",

    "اینستاگرام":"instagram.com/FoodBot",

    "مشکل":"لطفاً مشکل خود را بنویس تا راهنماییت کنم 😊",

    "لغو سفارش":"اگر سفارش هنوز آماده نشده باشد، امکان لغو وجود دارد."

};
const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const themeBtn = document.getElementById("themeBtn");
const clearBtn = document.getElementById("clearBtn");

// لیست غذاها
const foods = {
    pizza: {
        name: "🍕 پیتزا",
        price: 280000
    },
    burger: {
        name: "🍔 برگر",
        price: 220000
    },
    chicken: {
        name: "🍗 سوخاری",
        price: 320000
    },
    pasta: {
        name: "🍝 پاستا",
        price: 260000
    }
};

const drinks = {
    cola: {
        name: "🥤 کوکا",
        price: 50000
    },
    fanta: {
        name: "🧃 فانتا",
        price: 50000
    },
    water: {
        name: "💧 آب معدنی",
        price: 15000
    }
};

// سبد خرید
let cart = [];

let step = 0;

let selectedFood = null;

let selectedDrink = null;

// ارسال پیام
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){
        sendMessage();
    }

});

function sendMessage(){

    let text = userInput.value.trim();

    if(text === "") return;

    // نمایش پیام کاربر
    addMessage(text, "user");

    userInput.value = "";

    // 1️⃣ اول بررسی سوالات رستوران (FAQ / intents)
    let response = chatWithBot(text);

    if(response){

        addMessage(response, "bot");

    }

    // 2️⃣ اگر سوال نبود → بررسی سفارش غذا
    else{

        botReply(text);

    }
}
function addMessage(text,type){

    const div=document.createElement("div");

    div.className= type==="user"
    ? "user-message"
    : "bot-message";

    div.innerHTML=text;

    messages.appendChild(div);

    messages.scrollTop=messages.scrollHeight;

}
function botReply(text){

    let found=false;

    for(let food in foods){

        if(text.includes(food)){

            addToCart(food);

            addMessage(
                `✅ ${food} به سبد خرید اضافه شد.`,
                "bot"
            );

            found=true;

            break;

        }

    }

    if(!found){

        addMessage(

        "متوجه نشدم 😅 لطفاً نام غذا را وارد کنید.\n\nمثلاً:\nپیتزا\nبرگر\nسوخاری\nکوکا",

        "bot"

        );

    }

}
function addToCart(food){

    cart.push(food);

    updateCart();

}
function updateCart(){

    cartItems.innerHTML="";

    let total=0;

    cart.forEach(item=>{

        total += item.price;

        const div=document.createElement("div");

        div.className="cart-item";

        div.innerHTML=`

        <span>${item.name}</span>

        <span>${item.price.toLocaleString()} تومان</span>

        `;

        cartItems.appendChild(div);

    });

    totalPrice.innerHTML=total.toLocaleString();

}

    cart.forEach(food=>{

        total+=foods[food].price;

        const div=document.createElement("div");

        div.className="cart-item";

        div.innerHTML=`

        <span>${food}</span>

        <span>${foods[food].price.toLocaleString()} تومان</span>

        `;

        cartItems.appendChild(div);

    });

    totalPrice.innerHTML=total.toLocaleString();


clearBtn.addEventListener("click",()=>{

    cart=[];

    updateCart();

    addMessage("🗑 سبد خرید پاک شد.","bot");

});
themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML="☀️";

    }else{

        themeBtn.innerHTML="🌙";

    }

});

function startOrder(){

    step = 1;

    addMessage("شروع سفارش 🍽️","user");

    addMessage(

`لطفاً غذای مورد نظر خود را انتخاب کنید.

<div class="options">

<button class="option-btn" onclick="selectFood('🍕 پیتزا',280000)">🍕 پیتزا</button>

<button class="option-btn" onclick="selectFood('🍔 برگر',220000)">🍔 برگر</button>

<button class="option-btn" onclick="selectFood('🍗 سوخاری',320000)">🍗 سوخاری</button>

<button class="option-btn" onclick="selectFood('🍝 پاستا',260000)">🍝 پاستا</button>

</div>

`

,"bot");

}

function selectFood(name, price){

    selectedFood = {
        name,
        price
    };

    cart = [selectedFood];

    updateCart();

    addMessage(name,"user");

    addMessage(

`عالی 😍

حالا نوشیدنی مورد نظرت را انتخاب کن.

<div class="options">

<button class="option-btn"
onclick="selectDrink('🥤 کوکا',50000)">
🥤 کوکا
</button>

<button class="option-btn"
onclick="selectDrink('🧃 فانتا',50000)">
🧃 فانتا
</button>

<button class="option-btn"
onclick="selectDrink('💧 آب معدنی',15000)">
💧 آب معدنی
</button>

</div>

`

,"bot");

}
function selectDrink(name, price){

    selectedDrink = {
        name,
        price
    };

    cart.push(selectedDrink);

    updateCart();

    addMessage(name, "user");

    let total = cart.reduce((sum, item) => sum + item.price, 0);

    addMessage(`
<p>✅ سفارش شما تا اینجا:</p>

<p>${selectedFood.name}</p>
<p>${selectedDrink.name}</p>

<p><strong>جمع کل: ${total.toLocaleString()} تومان</strong></p>

<div class="options">

<button class="option-btn"
onclick="confirmOrder()">
✅ ثبت سفارش
</button>

<button class="option-btn"
onclick="cancelOrder()">
❌ لغو سفارش
</button>

</div>

`, "bot");

}
function confirmOrder(){

    addMessage("✅ ثبت سفارش", "user");

    const orderNumber = Math.floor(Math.random() * 9000) + 1000;

    addMessage(`
🎉 سفارش شما با موفقیت ثبت شد.

شماره سفارش:
<b>#${orderNumber}</b>

⏳ زمان آماده سازی:
20 دقیقه

از خرید شما متشکریم ❤️
`, "bot");

}
function cancelOrder(){

    addMessage("❌ لغو سفارش", "user");

    cart = [];

    selectedFood = null;
    selectedDrink = null;

    updateCart();

    addMessage(`
سفارش شما لغو شد.

اگر دوباره قصد سفارش دارید روی دکمه زیر کلیک کنید.

<div class="options">

<button class="option-btn"
onclick="startOrder()">

🍔 شروع سفارش

</button>

</div>

`, "bot");

}
function chatWithBot(message){

    message = message.trim();

    for(let key in botAnswers){

        if(message.includes(key)){

            addMessage(botAnswers[key],"bot");

            return true;

        }

    }

    for(let key in restaurantInfo){

        if(message.includes(key)){

            addMessage(restaurantInfo[key],"bot");

            return true;

        }

    }

    return false;

}
