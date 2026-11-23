// "Banco de dados" simulado: não há servidor, internet nem banco real.
const pedidos = [
  { numero: 101, cliente: "Ana Souza",     produto: "Notebook",      valor: 3500.0, status: "Entregue" },
  { numero: 102, cliente: "Bruno Lima",    produto: "Mouse sem fio", valor: 89.9,   status: "Em transporte" },
  { numero: 103, cliente: "Carla Mendes",  produto: "Teclado",       valor: 199.9,  status: "Em separação" },
  { numero: 104, cliente: "Diego Ribeiro", produto: "Monitor 24\"",  valor: 899.0,  status: "Aguardando pagamento" }
];

const TEMPO_ESPERA_MS = 2000;

// Elementos da página
const form = document.getElementById("form-consulta");
const inputNumero = document.getElementById("numero-pedido");
const btnConsultar = document.getElementById("btn-consultar");
const divStatus = document.getElementById("status");
const divResultado = document.getElementById("resultado");
const btnContador = document.getElementById("btn-contador");
const spanContador = document.getElementById("contador");

/**
 * Simula uma consulta demorada a um servidor.
 * Retorna uma Promise que:
 *  - chama resolve(pedido) se o pedido existir  -> estado fulfilled
 *  - chama reject(erro) se não existir/for inválido -> estado rejected
 * Enquanto o setTimeout não termina, a Promise fica em pending.
 */
function consultarPedido(numero) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Number.isInteger(numero) || numero <= 0) {
        reject(new Error("Número de pedido inválido."));
        return;
      }

      const pedido = pedidos.find((p) => p.numero === numero);

      if (pedido) {
        resolve(pedido);
      } else {
        reject(new Error(`Pedido nº ${numero} não encontrado.`));
      }
    }, TEMPO_ESPERA_MS);
  });
}

function mostrarStatus(estado, mensagem) {
  divStatus.className = `status ${estado}`;
  divStatus.innerHTML = mensagem;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarPedido(pedido) {
  divResultado.classList.remove("oculto");
  divResultado.innerHTML = `
    <h2>Pedido nº ${pedido.numero}</h2>
    <dl>
      <dt>Cliente</dt> <dd>${pedido.cliente}</dd>
      <dt>Produto</dt> <dd>${pedido.produto}</dd>
      <dt>Valor</dt>   <dd>${formatarMoeda(pedido.valor)}</dd>
      <dt>Status</dt>  <dd>${pedido.status}</dd>
    </dl>
  `;
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const numero = Number(inputNumero.value);

  // Estado pending: a consulta começou, mas o resultado ainda não existe
  divResultado.classList.add("oculto");
  btnConsultar.disabled = true;
  mostrarStatus("pending", '<span class="spinner"></span>Consultando pedido... (pending)');

  consultarPedido(numero)
    .then((pedido) => {
      // Estado fulfilled
      mostrarStatus("fulfilled", "Pedido encontrado! (fulfilled)");
      mostrarPedido(pedido);
    })
    .catch((erro) => {
      // Estado rejected
      mostrarStatus("rejected", `${erro.message} (rejected)`);
    })
    .finally(() => {
      // Executa nos dois casos: libera o botão para nova consulta
      btnConsultar.disabled = false;
    });

  // Esta linha roda ANTES do .then/.catch, provando que a Promise não bloqueia o código
  console.log("Consulta iniciada; o código seguiu executando sem esperar.");
});

// Contador independente: continua funcionando durante a espera
let cliques = 0;
btnContador.addEventListener("click", () => {
  cliques++;
  spanContador.textContent = cliques;
});
