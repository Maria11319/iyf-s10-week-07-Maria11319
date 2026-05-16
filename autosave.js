const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const status = document.getElementById('status');

// Recover data on page load
function loadSaved() {
    const saved = JSON.parse(localStorage.getItem('formData'));
    if (saved) {
        nameInput.value = saved.name || '';
        emailInput.value = saved.email || '';
        messageInput.value = saved.message || '';
        status.textContent = 'Draft recovered!';
    }
}

// Auto-save every 5 seconds
setInterval(function () {
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    };
    localStorage.setItem('formData', JSON.stringify(formData));
    status.textContent = 'Auto-saved at ' + new Date().toLocaleTimeString();
}, 5000);

// Clear on submit
document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();
    localStorage.removeItem('formData');
    status.textContent = 'Submitted and data cleared!';
    this.reset();
});

loadSaved();