# Segue-me

Guia rápido para como começar o desenvolvimento do aplicativo usando Laravel com Inertia para o backend e React com Vite.js e TailwindCSS para o frontend.

## Instalação

1. Clone o repositório do seu projeto:

   ```bash
   git clone https://github.com/ProjetoSegue-Me/projeto.segueme.app.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd projeto.segueme.app
   ```

3. Copie o arquivo de exemplo `.env`:

   ```bash
   cp .env.example .env
   ```
4. Instale as dependências do PHP com Composer:

   ```bash
   composer install
   ```

5. Instale as dependências do frontend com npm ou yarn:

   ```bash
   npm install
   ```

6. Gere a chave da aplicação:

   ```bash
   php artisan key:generate
   ```

7. Configure o arquivo `.env` de acordo com a sua necessidade:

### Opção 1: Sem usar o banco de dados

```dotenv
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:YOUR_GENERATED_APP_KEY
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
APP_MAINTENANCE_STORE=database

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

#DB_CONNECTION=mysql
#DB_HOST=localhost
#DB_PORT=3306
#DB_DATABASE=laravel
#DB_USERNAME=root
#DB_PASSWORD=

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_DRIVER=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync

CACHE_DRIVER=file
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
```

### Opção 2: Usando banco de dados

```dotenv
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:YOUR_GENERATED_APP_KEY
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
APP_MAINTENANCE_STORE=database

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_DRIVER=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_DRIVER=database
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
```

8. Inicie o servidor PHP:

   ```bash
   php artisan serve
   ```

9. Inicie o servidor React:

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

Segue a documentações dos frameworks e bibliotecas utilizadas:

### Back-end:
https://inertiajs.com

https://laravel.com/docs/11.x/installation

### Front-end:

https://tailwindcss.com/docs/installation

https://vitejs.dev/guide/

https://react.dev/learn/installation
