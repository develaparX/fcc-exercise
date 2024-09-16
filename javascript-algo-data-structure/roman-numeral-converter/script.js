const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
const animationContainer = document.getElementById("animation-container");

 const romawiData = [
                { value: 1000, symbol: 'M' },
                { value: 900, symbol: 'CM' },
                { value: 500, symbol: 'D' },
                { value: 400, symbol: 'CD' },
                { value: 100, symbol: 'C' },
                { value: 90, symbol: 'XC' },
                { value: 50, symbol: 'L' },
                { value: 40, symbol: 'XL' },
                { value: 10, symbol: 'X' },
                { value: 9, symbol: 'IX' },
                { value: 5, symbol: 'V' },
                { value: 4, symbol: 'IV' },
                { value: 1, symbol: 'I' }
            ];

const decimalToRomawi = (num) =>{
  let result = '';
  let remaining = num;

  for(let i = 0; i < romawiData.length; i++){
    while(remaining >= romawiData[i].value){
        result += romawiData[i].symbol;
        remaining -= romawiData[i].value
    }
  }
  return result
};


const checkUserInput = () =>{
  const num = parseInt(numberInput.value);

 if (!numberInput.value || isNaN(num) || num < 0) {
    output.textContent="Please provide a decimal number greater than or equal to 0"
    return;
  } else if (num >= 3999){
  output.textContent = "sing bener bae, maksimal 3999 bro";
  return
  }

  output.textContent = decimalToRomawi(num);
  numberInput.value = "";
}


convertBtn.addEventListener("click", checkUserInput)


numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});