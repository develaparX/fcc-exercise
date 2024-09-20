document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const checkBtn = document.getElementById('check-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsDiv = document.getElementById('results-div');

    checkBtn.addEventListener('click', validatePhoneNumber);
    clearBtn.addEventListener('click', clearInput);

    function validatePhoneNumber() {
        const phoneNumber = userInput.value.replace(/\D/g, '');
        const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;

        if (phoneRegex.test(userInput.value)) {
            resultsDiv.textContent = `Valid US number: ${formatPhoneNumber(phoneNumber)}`;
        } else {
            resultsDiv.textContent = `Invalid US number: ${userInput.value}`;
        }
    }

    function clearInput() {
        userInput.value = '';
        resultsDiv.textContent = '';
    }

    function formatPhoneNumber(phoneNumber) {
        const cleaned = phoneNumber.replace(/\D/g, '');
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            const intlCode = match[1] ? '+1 ' : '';
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return phoneNumber;
    }
});
