const btn = document.getElementById('themeBtn');

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    btn.textContent = 'Switch to Light Mode';
}

btn.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    btn.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});