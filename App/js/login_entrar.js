// Seleciona os elementos necessários
const popup = document.getElementById('signupPopup');
const cadastreLink = document.getElementById('login_cadastre-link');
const closeButton = document.querySelector('.close-button');
const submitButton = document.querySelector('.submit-button');

// Função para abrir o popup
function openPopup() {
    popup.style.display = 'flex'; // Exibe o popup
}

// Função para fechar o popup
function closePopup() {
    popup.style.display = 'none'; // Esconde o popup
}

// Adiciona o evento de clique ao link "Cadastre-se"
cadastreLink.addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    openPopup(); // Chama a função para abrir o popup
});

document.addEventListener('DOMContentLoaded', function () {
    const cpfField = document.querySelector('input[placeholder="CPF"]');
    const emailField = document.querySelector('input[type="email"]');
    const senhaField = document.getElementById('signup_senha');
    const confirmarSenhaField = document.getElementById('signup_confirmar_senha');
    const submitButton = document.querySelector('.submit-button');
    const nomeField = document.querySelector('input[placeholder="Nome Completo"]'); // Campo de nome
    
    // Mensagens de erro
    const cpfErrorMessage = document.createElement('div');
    const emailErrorMessage = document.createElement('div');
    const senhaErrorMessage = document.createElement('div');
    const confirmarSenhaErrorMessage = document.createElement('div');

    cpfErrorMessage.className = "error-message";
    emailErrorMessage.className = "error-message";
    senhaErrorMessage.className = "error-message";
    confirmarSenhaErrorMessage.className = "error-message";
    
    cpfField.parentNode.appendChild(cpfErrorMessage);
    emailField.parentNode.appendChild(emailErrorMessage);
    senhaField.parentNode.appendChild(senhaErrorMessage);
    confirmarSenhaField.parentNode.appendChild(confirmarSenhaErrorMessage);

    // Máscara para o CPF
    cpfField.addEventListener('input', function () {
        let cpf = cpfField.value.replace(/\D/g, ''); // Remover caracteres não numéricos
        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11); // Limitar a 11 dígitos
        }
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        cpfField.value = cpf;
    });

    // Função de validação do CPF
    cpfField.addEventListener('blur', function () {
        const cpf = cpfField.value.replace(/\D/g, '');
        if (cpf.length !== 11 || !isValidCPF(cpf)) {
            cpfField.style.border = "2px solid red";
            cpfErrorMessage.textContent = "CPF inválido. Verifique os dados.";
        } else {
            cpfField.style.border = "1px solid #ccc";
            cpfErrorMessage.textContent = "";
        }
    });

    // Função de validação do email
    emailField.addEventListener('blur', function () {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
            emailField.style.border = "2px solid red";
            emailErrorMessage.textContent = "Email inválido. Verifique o formato.";
        } else {
            emailField.style.border = "1px solid #ccc";
            emailErrorMessage.textContent = "";
        }
    });

    // Função de validação de senhas no botão "Criar Conta"
    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário antes da validação

        // Remover espaços extras antes de comparar as senhas
        const nome = nomeField.value.trim();
        const email = emailField.value.trim();
        const cpf = cpfField.value.trim();
        const senha = senhaField.value.trim();
        const confirmarSenha = confirmarSenhaField.value.trim();

        // Validar todos os campos
        let valid = true;

        if (!nome || !email || !cpf || !senha || !confirmarSenha) {
            valid = false; // Não pode criar conta se algum campo estiver vazio
            if (!nome) nomeField.style.border = "2px solid red";
            if (!email) emailField.style.border = "2px solid red";
            if (!cpf) cpfField.style.border = "2px solid red";
            if (!senha) senhaField.style.border = "2px solid red";
            if (!confirmarSenha) confirmarSenhaField.style.border = "2px solid red";
        }

        // Verificar se as senhas coincidem
        if (senha !== confirmarSenha) {
            confirmarSenhaField.style.border = "2px solid red"; // Marcar o campo 'Confirmar Senha' em vermelho
            confirmarSenhaErrorMessage.textContent = "As senhas não coincidem.";
            valid = false;
        } else {
            confirmarSenhaField.style.border = "1px solid #ccc"; // Senha confirmada corretamente
            confirmarSenhaErrorMessage.textContent = "";
        }

        // Validar CPF
        if (cpf.length !== 11 || !isValidCPF(cpf)) {
            cpfField.style.border = "2px solid red";
            cpfErrorMessage.textContent = "CPF inválido. Verifique os dados.";
            valid = false;
        } else {
            cpfField.style.border = "1px solid #ccc";
            cpfErrorMessage.textContent = "";
        }

        // Validar email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailField.style.border = "2px solid red";
            emailErrorMessage.textContent = "Email inválido. Verifique o formato.";
            valid = false;
        } else {
            emailField.style.border = "1px solid #ccc";
            emailErrorMessage.textContent = "";
        }

        // Se tudo estiver correto, permitir o envio (simular a criação da conta)
        if (valid) {
            alert("Conta criada com sucesso!");
            // Aqui você pode enviar o formulário ou realizar outras ações
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    });

    // Função auxiliar para validar o dígito verificador do CPF
    function isValidCPF(cpf) {
        if (/^(\d)\1+$/.test(cpf)) return false;

        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf[9])) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === parseInt(cpf[10]);
    }
});
