# Consulta de Pedido com Promise

Página que simula a consulta de um pedido usando **Promise** e **setTimeout()**, com JavaScript em arquivo externo. Não usa servidor, internet nem banco de dados.

## Como executar

Abra o arquivo `index.html` no navegador.

## Como funciona

1. O usuário informa o número do pedido e clica em **Consultar**.
2. A função `consultarPedido()` retorna uma `Promise` e simula 2 segundos de espera com `setTimeout()`.
3. Estados exibidos na tela:
   - **pending**: enquanto a consulta está em andamento (mensagem amarela com spinner);
   - **fulfilled**: pedido encontrado, `resolve(pedido)` → tratado no `.then()`;
   - **rejected**: pedido inexistente ou inválido, `reject(erro)` → tratado no `.catch()`.
4. O `.finally()` reativa o botão nos dois casos.
5. O botão contador mostra que a página continua respondendo durante a espera, ou seja, a Promise não bloqueia a página.

Pedidos de teste: **101, 102, 103 e 104**. Qualquer outro número gera erro (rejected).

## Estrutura

```
index.html   → estrutura da página
style.css    → estilos
script.js    → lógica com Promise (arquivo externo)
```
