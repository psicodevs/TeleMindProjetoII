document.addEventListener("DOMContentLoaded", function () {
    // Encontrar todos os botões "Like"
    const likeButtons = document.querySelectorAll('.likeLabel');

    // Adicionar event listeners para cada botão "Like"
    likeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Prevenir o comportamento padrão (se necessário)
            event.preventDefault();

            // Localizar o contador de curtidas
            let likesCountElement = document.querySelector('.likesCount');
            let currentLikes = parseInt(likesCountElement.textContent.replace(/[^\d]/g, ''), 10);

            // Incrementar a contagem de curtidas
            currentLikes++;

            // Atualizar a contagem de curtidas no elemento
            likesCountElement.textContent = `${currentLikes} Likes`;
        });
    });
});
