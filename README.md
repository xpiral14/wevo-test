# Teste criado para a WEVO

## Requisitos

- Node JS >= 14.15.4
- NPM >= 6.0.0

## Como instalar: 

1. Clone o repositório:

``` 
    git clone https://github.com/xpiral14/wevo-test
```

2. entre na pasta do projeto:
```
    cd wevo-test
```

3. instale as dependencias:
```
    npm install
```

4. execute o sevidor:
```
    node ace serve
```
4. Rotas criadas: 

```
    GET   /users      -> obtém todas os usuários criados
    GET   /users/:id  -> obtém um usuário passando seu id na rota
    POST  /users      -> cria um usuário a partir de um body
    PUT   /users/:id  -> atualiza os dados de um usuário passando seu id pela rota e seus dados através de um body
    DELETE /users/:id -> deleta um usuário através de seu id passado na rota
```

5. Corpo de requisições POST e PUT
```json
{
    "name": "Samuel Reis", // nome do usuário
    "cpf": "1234556789", // cpf do usuário
    "email": "s.reis1999@gmail.com", // email do usuario
    "phone": "61995465556", // telefone do usuário
    "gender": "M", // gênero do usuário
    "birthday": "1999-09-22" // data de aniversário do usuário
}
```