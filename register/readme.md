# API de Registro de Usuarios

Esta API proporciona endpoints para el registro de usuarios, así como para validar la disponibilidad de nombres de usuario, correos electrónicos y números de teléfono.

## Instalación

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/AlexGod05/streaming-video.git
```

2. Instala las dependencias del proyecto utilizando npm:

```bash
npm install
```

## Uso

Para ejecutar la API en un entorno de desarrollo, puedes utilizar el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor en modo de desarrollo utilizando nodemon, lo que significa que el servidor se reiniciará automáticamente cada vez que realices cambios en el código.

## Endpoints

### Validar Disponibilidad del Nombre de Usuario

Endpoint para verificar si un nombre de usuario está disponible.

```
GET /auth/validate-username?username=<username>
```

### Validar Disponibilidad del Correo Electrónico

Endpoint para verificar si un correo electrónico está disponible.

```
GET /auth/validate-email?email=<email>
```

### Validar Disponibilidad del Número de Teléfono con Indicativo

Endpoint para verificar si un número de teléfono con un indicativo específico está disponible.

```
GET /auth/validate-indicative-phone?phone=<phone>&indicative=<indicative>
```

### Registrar Nuevo Usuario

Endpoint para registrar un nuevo usuario.

```
POST /auth/register
```

El cuerpo de la solicitud debe contener los datos del usuario en formato JSON, que puede ser según el tipo de verificación (EMAIL o SMS).

- Para verificación por correo electrónico (EMAIL), el cuerpo debe incluir los siguientes campos:

```json
{
  "username": "nombre_de_usuario",
  "email": "correo_electronico",
  "password": "contraseña",
  "birthDate": "fecha_de_nacimiento_en_formato_YYYY-MM-DD",
  "typeVerification": "EMAIL"
}
```

- Para verificación por mensaje de texto (SMS), el cuerpo debe incluir los siguientes campos:

```json
{
  "username": "nombre_de_usuario",
  "indicative": "indicativo_del_pais",
  "phone": "numero_de_telefono",
  "password": "contraseña",
  "birthDate": "fecha_de_nacimiento_en_formato_YYYY-MM-DD",
  "typeVerification": "SMS"
}
```

## Documentación

La documentación de la API se encuentra disponible en la ruta `/api-docs` del servidor. Puedes acceder a ella a través de tu navegador web.

## Dependencias Principales

- **bcryptjs**: Para el hash de contraseñas.
- **cors**: Para habilitar el acceso a recursos de origen cruzado.
- **dotenv**: Para cargar variables de entorno desde un archivo `.env`.
- **express**: Framework web para Node.js.
- **mongoose**: Biblioteca de modelado de objetos MongoDB.
- **swagger-jsdoc**: Para generar documentación Swagger desde comentarios en el código.
- **swagger-ui-express**: Middleware de Express para visualizar la documentación Swagger.

## Dependencias de Desarrollo

- **@types/bcryptjs**: Tipos TypeScript para bcryptjs.
- **@types/cors**: Tipos TypeScript para cors.
- **@types/dotenv**: Tipos TypeScript para dotenv.
- **@types/express**: Tipos TypeScript para express.
- **@types/mongoose**: Tipos TypeScript para mongoose.
- **@types/swagger-jsdoc**: Tipos TypeScript para swagger-jsdoc.
- **@types/swagger-ui-express**: Tipos TypeScript para swagger-ui-express.
