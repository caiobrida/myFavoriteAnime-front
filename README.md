# myFavoriteAnimes (FRONTEND)
Esta é uma aplicação frontend que consome sua api [myFavoriteAnimes-api](https://github.com/caiobrida/myFavoriteAnime-api), ou seja, a api precisa estar sendo executada para que o frontend possa funcionar consumindo ela.
A aplicação possue autenticação (registro e login) e propõe que o usuário possa navegar e pesquisar animes, favoritar esses animes e também pode filtrar pelos seus animes favoritados.

# Como executar localmente
- Primeiramente, execute a api mencionada (tutorial de execução da api está no repositório dela), caso haja alteração na porta de execução da api, alterar a porta da variável de ambiente chamada "VITE_API_URL" no arquivo ".env".
- No projeto frontend, execute npm install
- Para executar a aplicação, execute npm run dev

# Observação
Sei que não se deve subir o arquivo ".env" no repositório, apenas fiz isso para facilitar e acelerar o processo de configuração do projeto
