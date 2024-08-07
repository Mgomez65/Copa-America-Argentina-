Pasos 

    1° comando de base de datos  base de datos lo podes cipar y pegar en la consola con el comando mysql -u root -p   
            Create database tp2pr3; 

            use database tp2pr3; 

            CREATE TABLE usuarios (ID INT AUTO_INCREMENT PRIMARY KEY,gmail VARCHAR(255) NOT NULL UNIQUE,nombreUsuario VARCHAR(100) NOT NULL UNIQUE,password VARCHAR(255) NOT NUL);

    2°  ir ala carpeta back 
        abrir el archivo que se llama .env
        buscar el apartado que die db_pass y colocar tu contraseña de mysql 
    3° comandos entrar  ala carpeta front 
        cd front
        npm install 
        npm run dev 
    4° abrir otro consola sin cerrar donde estas corriendo el serviodr de react y ejecutar los siguientees comandos 
         
        cd back 
        npm install 
        npm run dev 

        