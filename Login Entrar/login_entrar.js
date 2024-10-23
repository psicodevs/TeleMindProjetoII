
const CORRECT_USUARIO = 'admin';
const CORRECT_SENHA = 'admin';


const usuarioInput = document.getElementById('login_usuario');
const senhaInput = document.getElementById('login_senha');
const entrarButton = document.getElementById('login_entrar');


entrarButton.addEventListener('click', (e) => {
  e.preventDefault();

  
  const usuario = usuarioInput.value.trim();
  const senha = senhaInput.value.trim();

  
  if (usuario === '' || senha === '') {
    alert('Favor preencher todos os campos');
    return;
  }

  
  if (usuario === CORRECT_USUARIO && senha === CORRECT_SENHA) {
    // checar local da pagina inicial
    window.location.href = 'tela_inicial.html';
  } else {
    alert('Usuário ou Senha Incorretos');
  }
});