import { termo, resultadoEnum } from "./termo.js";

class telaTermo{
  pnlConteudo: HTMLDivElement;
  pnlTermo: HTMLDivElement;
  pnlTeclado: HTMLDivElement;
  btnEnter: HTMLButtonElement;
  lbNotificacao: HTMLParagraphElement;
  jogo: termo;
  linha: number;
  coluna: number;
  botoesClicados: HTMLButtonElement[];
   
  constructor(){
   this.registrarElementos();
   this.registrarEventos();
   this.linha = 0;
   this.coluna = 0;

   this.jogo = new termo();
   this.botoesClicados = [];
  }

  registrarElementos(): void{
     this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;

     this.pnlTermo = document.getElementById('pnlTermo') as HTMLDivElement;

     this.pnlTeclado = document.getElementById('pnlTeclado') as HTMLDivElement;

     this.btnEnter = document.getElementById('btnEnter') as HTMLButtonElement;

     this.lbNotificacao = document.getElementById('lbNotificacao') as HTMLParagraphElement;
  }

  registrarEventos(): void{
    this.pnlTeclado.childNodes.forEach(b => {
      const botao = b as HTMLButtonElement;
      if (botao.id != "btnEnter") {
          botao.addEventListener('click', (sender) => this.atualizarJogo(sender));
      }
  });

  this.btnEnter.addEventListener('click', () => this.avaliarPalavra());
  }

  atualizarJogo(sender: MouseEvent): void {
    const botao: HTMLButtonElement = sender.target as HTMLButtonElement;

    if (this.linha == 5) {
        return;
    }

    const lista = document.querySelectorAll(".letra");
    
    const letra: HTMLDivElement =
        lista[this.coluna * 5 + this.linha] as HTMLDivElement;

    letra.textContent = botao.textContent;

    this.linha += 1;
}

  avaliarPalavra(): void{
     if (this.jogo.jogoAcabou) {
          this.resetarJogo();
          return;
      }

      if (this.linha != 5) {
          return;
      }

      let palavra: string = "";

      const lista = document.querySelectorAll(".letra");

        for (let i = this.coluna * 5; i < this.coluna * 5 + 5; i++) {
            palavra += (lista[i] as HTMLDivElement).textContent;
        }

     const resultado: resultadoEnum[] = this.jogo.verificacaoPalavra(palavra);

      this.atualizarEstilo(resultado);

      this.coluna += 1;
      this.linha = 0;

      this.verificarResultado();
  }

  atualizarEstilo(palavra: resultadoEnum[]) {
    const lista = document.querySelectorAll(".letra");

    let x = 0;
    for(let i = this.coluna * 5; i < this.coluna * 5 + 5; i++) {
        const celula = lista[i] as HTMLDivElement;

        if (palavra[x] == resultadoEnum.Acerto) {
            celula.style.backgroundColor = "#22dd55";
        }

        else if (palavra[x] == resultadoEnum.Contido) {
            celula.style.backgroundColor = "#eded00";
        }

        else {
            celula.style.backgroundColor = "#5e5e5e";
            this.botoesClicados[x].disabled = true;
        }

        x++;
    }   
  }

 verificarResultado(): void {
   if (!this.jogo.fimDeJogo()) {
       return;
   }

   const resultado = this.jogo.obterResultado();

   this.lbNotificacao.style.display = "inline";
   this.lbNotificacao.textContent = resultado;

   if (this.jogo.venceu) {
       this.lbNotificacao.className = "notificacao-acerto";
   }

   else {
       this.lbNotificacao.className = "notificacao-erro";
   }

   this.pnlTeclado.childNodes.forEach(b => {
const botao = b as HTMLButtonElement;
       if (botao.id != "btnEnter") {
           botao.disabled = true;
       }
   });
}

resetarJogo(): void {
    this.linha = 0;
    this.coluna = 0;
    this.jogo.IniciarJogo();

    this.pnlTeclado.childNodes.forEach(b => {
        const botao = b as HTMLButtonElement;
        botao.disabled = false;
    });

    const lista = document.querySelectorAll(".letra");

    for (let i = 0; i < lista.length; i++) {
        const celula = lista[i] as HTMLDivElement;
        celula.textContent = "";
        celula.style.backgroundColor = "#bebebe";
    }

    this.lbNotificacao.style.display = "none";
    this.botoesClicados = [];
}
}

window.addEventListener('load', () => new telaTermo())

