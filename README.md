projeto-react-api-node

Projeto em React com API simples em Node.

Frontend hospedado no Netlify: https://biblioteca-dnc-desafio5.netlify.app/

📄 Descrição

Este projeto consiste em um sistema de gerenciamento de livros, com backend em Node.js e frontend em React.
O backend fornece uma API REST com operações CRUD e o frontend consome essa API localmente.

🖥 Backend
🔹 Instalação

Entre na pasta do backend:

cd back-end


Instale as dependências:

npm install


Rode o servidor:

node index.js


O servidor estará disponível em:

http://localhost:3000

🔹 Endpoints
Método	Rota	Descrição	Body (JSON)
GET	/livros	Lista todos os livros	-
GET	/livros/:id	Retorna livro por ID	-
POST	/livros	Cria um novo livro	{ "titulo": "", "num_paginas": 0, "isbn": "", "editora": "" }
PUT	/livros/:id	Atualiza livro por ID	{ "titulo": "", "num_paginas": 0, "isbn": "", "editora": "" }
DELETE	/livros/:id	Deleta livro por ID	-
🔹 Testes no Postman

Os endpoints foram testados com sucesso no Postman.
Abaixo seguem as evidências:

GET /livros


POST /livros


GET /livros/:id


PUT /livros/:id


DELETE /livros/:id


🖥 Frontend
🔹 Instalação

Entre na pasta do frontend:

cd front-end


Instale as dependências:

npm install


Rode o frontend:

npm run dev


O frontend estará disponível em:

http://localhost:5173

🔹 Observações

O frontend consome o backend local (http://localhost:3000).

Todos os CRUDs (criar, ler, atualizar, deletar) foram testados com sucesso.

Prints de evidência estão na pasta prints/.
