# passwd_client
# Descripción
Esta página permite almacenar contraseñas de forma segura
# Uso
Clonar el repositorio, instalar las dependencias e iniciarlo
```
git clone https://github.com/Fedex75/passwd_client.git
cd passwd_client
npm i
npm run start
```
# Configuración
- URL del servidor: En los archivos src/services/API.js y src/services/Auth.js igualar this.host a la URL del servidor

(opcional; el valor por defecto funciona correctamente)
# Usuario
Puede registrar un nuevo usuario o usar el usuario de prueba:
- Usuario: test@example.com
- Contraseña: 1234
