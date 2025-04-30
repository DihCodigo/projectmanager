document.querySelectorAll('.start-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault(); 
        const url = this.getAttribute('href');

        document.getElementById('loading').style.display = 'flex';

        setTimeout(() => {
            window.location.href = url;
        }, 2500);
    });
});