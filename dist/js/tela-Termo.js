import { termo } from "./termo.js";
class telaTermo {
    constructor() {
        this.registrarElementos();
        this.registrarEventos();
        this.linha = 0;
        this.coluna = 0;
        this.jogo = new termo();
    }
    registrarElementos() {
        this.pnlConteudo = document.getElementById('pnlConteudo');
        this.pnlTermo = document.getElementById('pnlTermo');
        this.pnlTeclado = document.getElementById('pnlTeclado');
        this.btnEnter = document.getElementById('btnEnter');
        this.lbNotificacao = document.getElementById('lbNotificacao');
    }
    registrarEventos() {
        this.pnlTeclado.childNodes.forEach(b => {
            const botao = b;
            if (botao.id != "btnEnter") {
                botao.addEventListener('click', (sender) => this.atualizarJogo(sender));
            }
        });
        this.btnEnter.addEventListener('click', () => this.avaliarPalavra());
    }
    atualizarJogo(sender) {
        const botao = sender.target;
        if (this.linha == 5) {
            return;
        }
        const lista = document.querySelectorAll(".letra");
        const letra = lista[this.coluna * 5 + this.linha];
        letra.textContent = botao.textContent;
        this.linha += 1;
    }
    avaliarPalavra() {
        if (this.jogo.jogoAcabou) {
            this.resetarJogo();
            return;
        }
        if (this.linha != 5) {
            return;
        }
        let palavra = "";
        const lista = document.querySelectorAll(".letra");
        for (let i = this.coluna * 5; i < this.coluna * 5 + 5; i++) {
            palavra += lista[i].textContent;
        }
        const resultado = this.jogo.verificacaoPalavra(palavra);
        this.atualizarEstilo(resultado.split(''));
        this.coluna += 1;
        this.linha = 0;
        //this.verificarResultado();
    }
    atualizarEstilo(palavra) {
        const lista = document.querySelectorAll(".letra");
        let j = 0;
        for (let i = this.coluna * 5; i < this.coluna * 5 + 5; i++) {
            const celula = lista[i];
            if (palavra[j] == 'X') {
                celula.style.backgroundColor = "#22dd55";
            }
            else if (palavra[j] == 'C') {
                celula.style.backgroundColor = "#eded00";
            }
            else {
                celula.style.backgroundColor = "#5e5e5e";
            }
            j++;
        }
    }
    // verificarResultado(): void {
    //  if (!this.jogo.fimDeJogo()) {
    //      return;
    //   }
    //  const resultado = this.jogo.obterResultado();
    //   this.lbNotificacao.style.display = "inline";
    //  this.lbNotificacao.textContent = resultado;
    //  if (this.jogo.venceu) {
    //      this.lbNotificacao.className = "notificacao-acerto";
    //   }
    //  else {
    //      this.lbNotificacao.className = "notificacao-erro";
    //  }
    //  this.pnlTeclado.childNodes.forEach(b => {
    //const botao = b as HTMLButtonElement;
    //      if (botao.id != "btnEnter") {
    //         botao.disabled = true;
    //     }
    // });
    //}
    resetarJogo() {
        this.linha = 0;
        this.coluna = 0;
        this.jogo.IniciarJogo();
        this.pnlTeclado.childNodes.forEach(b => {
            const botao = b;
            botao.disabled = false;
        });
        const lista = document.querySelectorAll(".letra");
        for (let i = 0; i < lista.length; i++) {
            const celula = lista[i];
            celula.textContent = "";
            celula.style.backgroundColor = "#bebebe";
        }
        this.lbNotificacao.style.display = "none";
    }
}
window.addEventListener('load', () => new telaTermo());
//# sourceMappingURL=tela-Termo.js.map