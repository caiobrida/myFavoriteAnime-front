# myFavoriteAnimes (FRONTEND)
Esta é uma aplicação frontend em ReactJS que consome sua api [myFavoriteAnimes-api](https://github.com/caiobrida/myFavoriteAnime-api), ou seja, a api precisa estar sendo executada para que o frontend possa funcionar consumindo ela.
A aplicação possue autenticação (registro e login) e propõe que o usuário possa navegar e pesquisar animes, favoritar esses animes e também pode filtrar pelos seus animes favoritados.

# Como executar localmente
- Clone o repositório para seu ambiente local
- Configure um arquivo ".env" com as variáveis ambiente que estão no arquivo ".env.example".
- Antes de executar o frontend, execute a api mencionada (tutorial de execução da api está no repositório dela), caso haja alteração na porta ou url de execução da api, alterar a variável de ambiente chamada "VITE_API_URL" no arquivo ".env".
- No projeto frontend, execute npm install
- Para executar a aplicação, execute npm run dev
