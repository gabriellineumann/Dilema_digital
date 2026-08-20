document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const toggleVisibility = document.getElementById('toggleVisibility');
    const strengthMeter = document.getElementById('strengthMeter');
    const feedbackText = document.getElementById('feedbackText');

    // Alternar visibilidade da senha
    toggleVisibility.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    });

    // Avaliar força da senha em tempo real
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const result = evaluatePassword(password);

        strengthMeter.style.width = result.percentage + '%';
        strengthMeter.style.backgroundColor = result.color;
        feedbackText.textContent = result.message;
        feedbackText.style.color = result.color;
    });

    function evaluatePassword(pwd) {
        if (!pwd) {
            return { percentage: 0, color: '#ccc', message: 'Digite algo acima...' };
        }

        let score = 0;

        // Critérios simples de avaliação
        if (pwd.length >= 8) score += 25;
        if (pwd.length >= 12) score += 15;
        if (/[A-Z]/.test(pwd)) score += 20;
        if (/[0-9]/.test(pwd)) score += 20;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 20;

        if (score < 40) {
            return { percentage: score, color: '#e74c3c', message: 'Senha Fraca: Muito vulnerável a ataques.' };
        } else if (score < 75) {
            return { percentage: score, color: '#f39c12', message: 'Senha Média: Adicione símbolos ou aumente o tamanho.' };
        } else {
            return { percentage: 100, color: '#2ecc71', message: 'Senha Forte: Excelente combinação!' };
        }
    }
});