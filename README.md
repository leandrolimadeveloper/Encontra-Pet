# Encontra-Pet

<h1 align="center">Encontra Pet</h1>
<p align="center">
    <a href="#sobre">Sobre |</a>
    <a href="#tecnologias">Tecnologias |</a>
    <a href="#instalação">Instalação de dependências e uso</a>
</p>

## Sobre
Projeto de API que busca ajudar tutores de pets a encontrarem seus pets desaparecidos, onde o usuário cadastrado com email e senha, informa seu pet perdido por meio de informações referentes ao animal.

![image](https://user-images.githubusercontent.com/76854209/206924695-70b03c16-1f3d-4f21-b5e0-d74f645e8a74.png)

**Vídeo de demonstração**:<br>
[![Encontra Pet](https://img.youtube.com/vi/45p6H8p8Qyw/0.jpg)](https://www.youtube.com/watch?v=45p6H8p8Qyw "Asssistir no YouTube")

## Tecnologias
<ul>
    <li><a href="https://nodejs.org/" alt="Node.js">Node.js</a></li>
    <li><a href="https://www.postgresql.org/" alt="PostgreSQL">PostgreSQL</a></li>
    <li><a href="https://aws.amazon.com/" alt="Amazon AWS">Amazon AWS</a></li>
</ul>

## Instalação e uso 
> Este guia assume que você já tenha o Node.js instalado, um banco de dados PostgreSQL, com os seus dados de conexão com o banco, e uma conta na AWS, com bucket criado e demais informações e configurações.

Criar arquivo .env com as variáveis ambiente. Seguir modelo disponível no arquivo .env.example.

```bash
$ git clone https://github.com/leandrolimadeveloper/Encontra-Pet
$ cd Encontra-Pet
```

### Instalação de dependências
```bash
$ npm i
```

Para executar o servidor, execute:
```
$ npm run dev
```

## Endpoints 
(Demonstração de alguns endpoints)
> Para testar a API é necessário ter um cliente de API REST como as ferramentas Insomnia e Postman. 

### User: POST /users 
Endpoint para cadastrar usuário.

```
{
    "name": "Usuário Teste",
    "email": "uteste@uteste.com",
    "password": "123456"
}
```

#### Parâmetros
Nenhum

#### Respostas 
OK! 200 (Sucesso na requisição) — Loga o usuário<br>
BAD REQUEST! 400 (Solicitação Incorreta) — 'Error: Usuário já existe'

### Sessions: POST /sessions
Endpoint para logar usuário e receber um token/sessão.

```
{
	"email": "uteste@uteste.com",
	"password": "123456"
}
```

#### Parâmetros
Nenhum

#### Respostas 
OK! 200 (Sucesso na requisição) — Loga o usuário<br>
UNAUTHORIZED! 401 (Requisição não autorizada) — 'Error: Usuário não existe'
UNAUTHORIZED! 401 (Requisição não autorizada) — 'Error: Senha incorreta'

### Pets: POST /pets
Endpoint para cadastrar pet desaparecido. 
(Deve-se estar logado, com o token da sessão registrado. Cadastrar via Multipart Form Data)

#### Parâmetros
Nenhum

#### Respostas 
OK! 200 (Sucesso na requisição) — Cadastra o pet<br>
BAD REQUEST! 400 (Servidor não entendeu a requisição) — Mensagem de erro da biblioteca de validação Yup

Exemplo:

``` 
{
    pet_name        Snow Miau
    type_of_pet     Gato
    gender          male
    img             img-file.jpg
    breed           Siamês
    reward          true
    last_seen       2022-11-15
    description     Gato desaparecido ... (em texto de múltiplas linhas)
}
```

### Pets: GET /pets
Retorna um ou mais pets desaparecidos do usuário que está logado via token. 

#### Parâmetros
Nenhum

#### Respostas 
OK! 200 (Sucesso na requisição) — Os dados são retornados.

Exemplo:
``` 
GET /pets
```

### Dashboard: GET /dashboard
Retorna todos os pets cadastrados na aplicação, os que estão com status de não-encontrados (missing=true) e encontrados (missing=false). 

#### Parâmetros
Query Params: missing=true/false

#### Respostas 
OK! 200 (Sucesso na requisição) — Os dados são retornados.

Exemplo:
``` 
GET /dashboard?missing=false
GET /dashboard?missing=true
```

## Uso
Para testar os endpoints deve-se utilizar um programa como o Insomnia ou Postman.</br>
https://insomnia.rest/download</br>
https://www.postman.com/

**Deploy**:<br>
http://18.230.17.39:8686
