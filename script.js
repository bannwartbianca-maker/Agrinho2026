document.addEventListener("DOMContentLoaded", function () {
    const btnOuvir = document.getElementById("btn-ouvir");
    const btnParar = document.getElementById("btn-parar");
    
    // Seleciona apenas a parte do texto que deve ser lida
    const conteudoParaLer = document.querySelector(".texto-informativo");

    if ('speechSynthesis' in window) {
        let mensagem = new SpeechSynthesisUtterance();
        mensagem.lang = 'pt-BR';
        // Extrai o texto limpo, ignorando tags HTML
        mensagem.text = conteudoParaLer.innerText; 

        // Quando o botão Ouvir for clicado
        btnOuvir.addEventListener("click", function () {
            window.speechSynthesis.cancel(); // Para qualquer leitura anterior travada
            window.speechSynthesis.speak(mensagem);
            
            btnOuvir.style.display = "none";
            btnParar.style.display = "inline-block";
            btnParar.focus();
        });

        // Quando o botão Parar for clicado
        btnParar.addEventListener("click", function () {
            window.speechSynthesis.cancel();
            resetarBotoes();
        });

        // Se a voz terminar de ler naturalmente
        mensagem.onend = function () {
            resetarBotoes();
        };

        function resetarBotoes() {
            btnParar.style.display = "none";
            btnOuvir.style.display = "inline-block";
            btnOuvir.focus();
        }

    } else {
        // Se o navegador for muito antigo e não suportar voz
        btnOuvir.style.display = "none";
        console.log("Este navegador não suporta leitura de texto em voz.");
    }
});
