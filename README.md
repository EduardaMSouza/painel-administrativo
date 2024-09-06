# Documentação da Aplicação React

## Descrição
Esta aplicação React implementa um sistema de autenticação simples. O usuário pode fazer login, e, se autenticado, um botão de "Logout" aparece no cabeçalho para desconectar. O estado de autenticação é armazenado no `localStorage`.

## Funcionalidades
- **Autenticação via `localStorage`**: O token de autenticação é salvo no navegador para identificar se o usuário está logado.
- **Logout**: O botão "Sair" remove o token do `localStorage` e redireciona o usuário para a página inicial.

## Como Funciona
- O componente `Header` verifica o estado de autenticação ao carregar, utilizando o `localStorage`.
- O botão de logout só aparece se o usuário estiver logado.
- O estado de login é monitorado e atualizado usando o hook `useEffect`.

## Como Executar
1. Clone o repositório e instale as dependências:
   ```bash
   npm install

## Desenvolvido por:
- <a href="https://github.com/EduardaMSouza"> Eduarda Menegueli - EduardaMSouza </a>
- <a href="https://github.com/Jhonatan-Rodrigues"> Jhonatan Rodrigues - Jhonatan-Rodrigues </a>
- <a href="https://github.com/josiascta"> Josias Texeira - josiascta </a>
