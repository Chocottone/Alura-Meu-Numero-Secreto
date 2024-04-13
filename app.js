let listaNumerosSorteados = [];
let dificuldade = Number(prompt('Defina o limite do numero secreto'));
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio(dificuldade);

// Função para manipular tags
function manipularTags(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

// Mensagem Inicial
function mensagemInicial(){
    manipularTags('h1', 'Número Secreto');
    manipularTags('p', 'Escolha um número entre 1 e ' + dificuldade);
};

mensagemInicial();

// Limpar campos de texto
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
};

// função para verificarChute
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        manipularTags('h1', 'Acertou!');
        let mensagemTentativas = tentativas == 1 ? `Parabêns você acertou! o número secreto com ${tentativas} tentativa!` : `Parabêns você acertou! o número secreto com ${tentativas} tentativas!`;
        manipularTags('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled',true);        
    } else {
        chute > numeroSecreto ? manipularTags('p', 'O número secreto é menor.') : manipularTags('p', 'O número secreto é maior.');
        tentativas++;
        limparCampo();
    };
};

// Gerar um numero aleatorio entre 1 e dificuldade
function gerarNumeroAleatorio(dificuldade) {
   let numeroEscolhido = parseInt(Math.random() * dificuldade + 1);
   let tamanhoDaLista = listaNumerosSorteados.length;

    if (tamanhoDaLista == dificuldade) {
        listaNumerosSorteados = [];
    };

   if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
   } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
   };
};

// Resetar o jogo
function resetarJogo() {
    document.getElementById('chutar').removeAttribute('disabled');
    dificuldade = Number(prompt('Defina o limite do numero secreto'));     
    numeroSecreto = gerarNumeroAleatorio(dificuldade);
    tentativas = 1;
    mensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled',true);
};