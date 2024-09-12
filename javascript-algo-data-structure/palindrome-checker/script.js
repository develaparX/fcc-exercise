const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');


document.addEventListener('DOMContentLoaded', function() {
    checkBtn.addEventListener('click', checkPalindrome);

    function checkPalindrome() {
        const text = textInput.value.trim();
        
        if (text === '') {
            alert('Please input a value');
            return;
        }

        const isPalindrome = checkIfPalindrome(text);
        displayResult(text, isPalindrome);
    }

    function checkIfPalindrome(str) {
        const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleanStr === cleanStr.split('').reverse().join('');
    }

    function displayResult(text, isPalindrome) {
        result.textContent = `${text} is ${isPalindrome ? '' : 'not '}a palindrome`;
    }
});