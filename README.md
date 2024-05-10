# Aplicativo Laravel com Inertia, React e Vite.js

Guia rápido para como começar o desenvolvimento do aplicativo usando Laravel com Inertia para o backend e React com Vite.js e TailwindCSS para o frontend.

## Instalação

1. Clone o repositório do seu projeto:

   ```bash
   git clone https://github.com/projeto-segue-me/projeto.segueme.app.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd projeto.segueme.app
   ```

3. Instale as dependências do PHP com Composer:

   ```bash
   composer install
   ```

4. Instale as dependências do frontend com npm ou yarn:

   ```bash
   npm install
   ```

5. Inicie o servidor PHP:

   ```bash
   php artisan serve
   ```

6. Inicie o servidor react:

   ```bash
   npm run dev
   ```

Agora seu aplicativo Laravel está em execução em `http://localhost:8000`.

## Criando Páginas

As páginas são criadas como componentes React dentro do diretório `resources/js/Pages`.

1. Crie um novo arquivo TypeScript (`.tsx`) para sua página, por exemplo:

   ```bash
   touch resources/js/Pages/MinhaPagina.tsx
   ```

2. No arquivo recém-criado, você pode escrever seu componente React utilizando o padrão Inertia:

   ```tsx
   import React from 'react';
   import { InertiaLink } from '@inertiajs/inertia-react';

   const MinhaPagina: React.FC = () => {
       return (
           <div>
               <h1>Minha Página</h1>
               <p>Este é um exemplo de página usando Inertia.js e React.</p>
               <InertiaLink href="/">Voltar para a página inicial</InertiaLink>
           </div>
       );
   }

   export default MinhaPagina;
   ```

Agora você pode acessar sua página em `http://localhost:8000/minha-pagina`.

## Controllers e Models

Os Controllers e Models são organizados nos diretórios padrão do Laravel.

- Controllers devem ser colocados em `app/Http/Controllers`.
- Models devem ser colocados em `app/Models`.

Por exemplo, você pode criar um Controller assim:

```bash
php artisan make:controller MeuController
```

E um Model assim:

```bash
php artisan make:model MeuModelo
```

Em seguida, você pode usá-los normalmente.

## Documentações

Segue a documentações dos frameworks e bibliotecas utilizadas

### Back-end:
https://inertiajs.com

https://laravel.com/docs/11.x/installation


### Front-end:

https://tailwindcss.com/docs/installation

https://vitejs.dev/guide/

https://react.dev/learn/installation
