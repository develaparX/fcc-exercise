document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const checkBtn = document.getElementById('check-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsDiv = document.getElementById('results-div');

    checkBtn.addEventListener('click', validatePhoneNumber);
    clearBtn.addEventListener('click', clearResults);

    function validatePhoneNumber() {
        const phoneNumber = userInput.value.trim();
        if (phoneNumber === '') {
            alert('Please provide a phone number');
            return;
        }

        const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
        const isValid = regex.test(phoneNumber);
        
        resultsDiv.textContent = isValid 
            ? `Valid US number: ${phoneNumber}`
            : `Invalid US number: ${phoneNumber}`;
    }

    function clearResults() {
        userInput.value = '';
        resultsDiv.textContent = '';
    }
});
