document.addEventListener("DOMContentLoaded", () => {
  const ruToEnMap = {
    й: "q",
    ц: "w",
    у: "e",
    к: "r",
    е: "t",
    н: "y",
    г: "u",
    ш: "i",
    щ: "o",
    з: "p",
    х: "[",
    ъ: "]",
    ф: "a",
    ы: "s",
    в: "d",
    а: "f",
    п: "g",
    р: "h",
    о: "j",
    л: "k",
    д: "l",
    ж: ";",
    э: "'",
    я: "z",
    ч: "x",
    с: "c",
    м: "v",
    и: "b",
    т: "n",
    ь: "m",
    б: ",",
    ю: ".",
    ё: "`",
  };

  const enToRuMap = Object.fromEntries(
    Object.entries(ruToEnMap).map(([key, value]) => [value, key])
  );

  const inputField = document.getElementById("text-input");
  const translatedText = document.getElementById("translated-text");
  const copyButton = document.getElementById("copy-button");
  const toastNotification = document.getElementById("toast-notification");

  // get last session input from localStorage
  const savedText = localStorage.getItem("savedText");
  if (savedText) {
    inputField.value = savedText;
    translateAndDisplay(inputField.value);
  }

  function translateText(text, map) {
    return text
      .split("")
      .map((char) => char || map[char.toLowerCase()])
      .join("");
  }

  function detectLanguage(text) {
    const ruRegex = /[а-яё]/i;
    const enRegex = /[a-z]/i;

    if (ruRegex.test(text)) {
      return "ru";
    } else if (enRegex.test(text)) {
      return "en";
    }
    return null;
  }

  function translateAndDisplay(text) {
    const detectedLang = detectLanguage(text);

    if (detectedLang === "ru") {
      translatedText.textContent = translateText(text, ruToEnMap);
    } else if (detectedLang === "en") {
      translatedText.textContent = translateText(text, enToRuMap);
    } else {
      translatedText.textContent = "Unknown language";
    }

    // text reveal anim
    translatedText.style.opacity = 0;
    translatedText.style.transform = "translateY(10px)";
    setTimeout(() => {
      translatedText.style.opacity = 1;
      translatedText.style.transform = "translateY(0)";
    }, 50); // anim delay
  }

  inputField.addEventListener("input", () => {
    const text = inputField.value;
    localStorage.setItem("savedText", text); // saves text to localStorage
    translateAndDisplay(text);
  });

  copyButton.addEventListener("click", async () => {
    const text = translatedText.textContent;
    try {
      await navigator.clipboard.writeText(text);
      showToast();
    } catch (err) {
      console.error("Error while copying:", err);
    }
  });

  // this fn shows toast notification
  function showToast() {
    toastNotification.classList.add("show");
    setTimeout(() => {
      toastNotification.classList.remove("show");
    }, 3000); // removes toast after 3000ms (3s)
  }
});
