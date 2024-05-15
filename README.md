![Logo](https://i.imgur.com/PfwZGRO.png)


# ChatBadgerAPI

Este projeto apresenta uma *API de Chat robusta e escalável*, desenvolvida como parte do Trabalho Prático de Redes I. A API foi projetada para facilitar a comunicação em tempo real entre usuários em uma rede de computadores. Utilizando Node e Express, esta API oferece uma solução eficiente para a criação de salas de chat, transmissão de mensagens e gerenciamento de salas.

## Deploy

Para fazer o deploy desse projeto, consideramos que sua máquina já tenha o NodeJS:

```bash
  node server.js
```

## Documentação da API - Rotas de usuário

#### Registrar um novo usuário.

  ```http
  POST /users
```

- Body:

  ```json
  {
  "usarname":"NomeDeUsuario",
  "password":"Senha123"
  }
  ```


#### Efetua login com os dados informados.

  ```http
  POST /users/login
```
- Body:

  ```json
  {
  "usarname":"NomeDeUsuario",
  "password":"Senha123"
  }
  ```


### Efetua logout

  ```http 
  POST /users/logout
  ```
  Não tem parâmetro e nem corpo JSON.

### Mostrar dados do usuário pelo ID

  ```http
  GET /users/{id}
  ```

  | Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| id      | int | *Obrigatório*. O ID do usuário que você quer as informações |



## Documentação da API - Rotas das salas

### Criar uma sala  
  ```http 
  POST /rooms
  ```
- Body:
  ```json
  {
    "roomName": "TesteSala01"
  }
  ```

### Deletar uma sala
  ```http 
  DELETE /rooms/{roomId}
  ```

| Parâmetro   | Tipo       | Descrição                                   |
 | :---------- | :--------- | :------------------------------------------ |
 | roomId      | int | *Obrigatório*. O ID da sala que será deletada |

### Entrar em uma sala
  ```http 
  POST /rooms/{roomId}/enter
  ```
| Parâmetro   | Tipo       | Descrição                                   |
 | :---------- | :--------- | :------------------------------------------ |
 | roomId      | int | *Obrigatório*. O ID da sala que o usuário irá entrar |

 ### Sair de uma sala
  ```http 
  POST /rooms/{roomId}/leave
  ```
| Parâmetro   | Tipo       | Descrição                                   |
 | :---------- | :--------- | :------------------------------------------ |
 | roomId      | int | *Obrigatório*. O ID da sala que o usuário irá sair | 

 ### Remover um usuário de uma sala
   ```http 
  DELETE /rooms/{roomId}/users/{userId}
  ```
| Parâmetro   | Tipo       | Descrição                                   |
 | :---------- | :--------- | :------------------------------------------ |
 | roomId      | int | *Obrigatório*. O ID da sala que o usuário será removido | 
  | userId      | int | *Obrigatório*. O ID do usuário que será removido | 


## Documentação da API - Rotas das mensagens entre usuários

### Mensagem direta para outro usuário
  ```http 
  POST /messages/direct/{receiverId}
  ```
- Body:
  ```json
  {
    "message": "Hello my dear"
  }
  ```

| Parâmetro   | Tipo       | Descrição                                   |
 | :---------- | :--------- | :------------------------------------------ |
 | receiverId      | int | *Obrigatório*. O ID do usuário destinatário | 

## Documentação da API - Rotas das mensagens dentro de uma sala
### Mensagem para uma sala
  ```http 
  POST /rooms/{roomId}/messages
  ```
- Body:
  ```json
  {
    "message": "Hello room01"
  }
  ```

| Parâmetro   | Tipo       | Descrição                                   |
 | :---------- | :--------- | :------------------------------------------ |
 | roomId      | int | *Obrigatório*. O ID da sala destinatária |

### Receber mensagens de uma sala
  ```http 
  GET /rooms/{roomId}/messages
  ```

| Parâmetro   | Tipo       | Descrição                                   |
 | :---------- | :--------- | :------------------------------------------ |
 | roomId      | int | *Obrigatório*. O ID da sala que as mensagens serão recebidas |




## Autores

- Arthur Gonçalves Ayres Lanna [@ArthurLanna36](https://www.github.com/ArthurLanna36)
- Arthur Oliveira Braga [@ArtilBr](https://www.github.com/ArtilBr)
- Rafael Ramos de Andrade [@rafael0121](https://www.github.com/rafael0121)
- Marcus Leandro Gomes Campos Oliveira [@Marcus305](https://www.github.com/Marcus305)
