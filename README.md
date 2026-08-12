# Lenda Motivação Store

Loja online estática adaptada do projeto **Ferragem Lendária** para venda de:

- Perfumes
- Cremes e cuidados pessoais
- Acessórios de celular
- Celulares

## Funcionalidades

- Catálogo responsivo para computador e celular
- Pesquisa, filtro por categoria e ordenação por preço
- Produtos de demonstração com preços em Meticais (MT)
- Imagens ilustrativas embutidas no próprio projeto, sem depender de serviços externos
- Carrinho com quantidade, subtotal e total
- Persistência do carrinho no `localStorage`
- Finalização do pedido pelo WhatsApp
- Geração de resumo imprimível do pedido
- Painel administrativo local para adicionar, editar, ativar/desativar e remover produtos
- Estoque e categorias editáveis

## Executar

Abra `index.html` diretamente no navegador ou publique o repositório em qualquer hospedagem estática/GitHub Pages.

O painel administrativo fica em `pages/admin.html`.

> Os produtos e preços incluídos são exemplos de demonstração e podem ser alterados no painel administrativo.

## Observação sobre produção

O projeto funciona sem backend, usando `localStorage`. Para vários administradores/dispositivos e estoque compartilhado em tempo real, recomenda-se posteriormente ligar o painel a um backend (por exemplo, Supabase) com autenticação.
