import { useState } from 'react';
import './App.css';

function App() {

  const [form, setForm] = useState(4)

	const resultEl = document.getElementById("result");
  const uppercaseEl = document.getElementById("uppercase");
  const lowercaseEl = document.getElementById("lowercase");
  const numbersEl = document.getElementById("numbers");
  const symbolsEl = document.getElementById("symbols");

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };



  function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    // Doesn't have a selected type
    if (typesCount === 0) {
      return "";
    }

    // create a loop
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
  }

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }


  return (
    <div>
      {/* <!-- INSERT HTML HERE --> */}
      <div class="container">
        <h2>Password Generator</h2>
        <div class="result-container">
          <span id="result"></span>
          <button
            class="btn"
            onClick={() => {
              const textarea = document.createElement("textarea");
              const password = resultEl.innerText;

              if (!password) {
                return;
              }

              textarea.value = password;
              document.body.appendChild(textarea);
              textarea.select();
              document.execCommand("copy");
              textarea.remove();
              alert("Password copied to clipboard");
            }}
          >
            <i class="far fa-clipboard"></i>
          </button>
        </div>
        <div class="settings">
          <div class="setting">
            <label>Password length</label>
            <input type="number" id="length" min="4" max="20" value={form} onChange={(e) => {
              setForm(e.target.value);
              console.log(e.target.value);
              }} />
          </div>
          <div class="setting">
            <label>Include uppercase letters</label>
            <input type="checkbox" id="uppercase" />
          </div>
          <div class="setting">
            <label>Include lowercase letters</label>
            <input type="checkbox" id="lowercase"  />
          </div>
          <div class="setting">
            <label>Include numbers</label>
            <input type="checkbox" id="numbers"  />
          </div>
          <div class="setting">
            <label>Include symbols</label>
            <input type="checkbox" id="symbols"  />
          </div>
        </div>
        <button
          class="btn btn-large"
          onClick={() => {
            const length = form;
            const hasLower = lowercaseEl.checked;
            const hasUpper = uppercaseEl.checked;
            const hasNumber = numbersEl.checked;
            const hasSymbol = symbolsEl.checked;

            resultEl.innerText = generatePassword(
              hasLower,
              hasUpper,
              hasNumber,
              hasSymbol,
              length
            );
          }}
        >
          Generate password
        </button>
      </div>
    </div>
  );
}

export default App;
