const internetErrorMessages = [
  "Error 404: Internet not found. Please check your brain-to-internet interface.",
  "Lost connection. Searching for the meaning of life in the digital void...",
  "Wi-Fi signal lost in the Bermuda Triangle. Please wear a tin foil hat for better reception.",
  "Internet service not responding. Did you try turning it off and on again?",
  "Error: No internet. Go outside and talk to real people.",
  "Error: The internet is on strike. The packets are picketing.",
  "No internet. Your cat probably chewed through the network cable.",
  "Aliens abducted your internet. They asked for cat videos as ransom.",
  "Unable to connect. Did you pay your internet bill with Monopoly money?",
  "Error 503: Internet service on vacation. It's sipping piña coladas on a tropical server.",
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Randomly select and display a funny error message
const randomErrorMessage = () => {
  const randomIndex = Math.floor(Math.random() * internetErrorMessages.length);
  return internetErrorMessages[randomIndex];
};

// Fetch a random activity from the Bored API
boredList = [];

let isClicked = false;
async function clicked() {
  if (isClicked) return;
  document.getElementById("random").innerHTML = "";
  await fetch("https://www.boredapi.com/api/activity/")
    .then((res) => res.json())
    .then((data) => {
      boredList.push(data.activity);
      typeWriter(data.activity);
    })
    .catch((err) => {
      typeWriter(randomErrorMessage())
    });
}

// Get back to the previous activity
function getBack() {
  if (boredList.length > 1) {
    boredList.pop();
    document.getElementById("random").innerHTML = "";
    typeWriter(boredList[boredList.length - 1]);
  }
}

// Copy the activity to clipboard
function copyToClipboard() {
  navigator.clipboard.writeText(boredList[boredList.length - 1]);
}

// Type out the text
async function typeWriter(text) {
  isClicked = true;
  for (i = 0; i < text.length; i++) {
    document.getElementById("random").innerHTML += text.charAt(i);
    await sleep(30);
  }
  isClicked = false;
}

// Track if user typed "awesome" anywhere
let awesome = "";
let isAwesome = false;

document.addEventListener("keypress", (event) => {
  const keyName = event.key;
  awesome += keyName;
  if (awesome.includes("awesome")) {
    isAwesome = !isAwesome;
    randomColor();
    awesome = "";
  }
});

// Easter eggggggg AweSoMe 🥚
async function randomColor() {
  const colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];
  let i = 0;
  while (isAwesome) {
    document.documentElement.style.setProperty('--primary-color', colors[i]);
    i = (i + 1) % colors.length;
    await sleep(3000);
  }
  document.documentElement.style.setProperty('--primary-color', '#1b263b');
}

// Starting function on page load
clicked();

// Listen to space key
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    clicked();
  }
}
);

// when i wrote this code, only god and i knew what it did
// now only god knows