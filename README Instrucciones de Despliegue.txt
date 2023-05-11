WEB API

	- ASP.NET (.NET 7.0)
	- Se utilizó Entity Framework para definir la base de datos SQL Server
	- Es necesario modificar el StringConnection en el archivo appsettings.json
	y ejecutar el comando 'update-database' en la consola del administrador de
	paquetes
	- Al crearse la base de datos, se generan 2 usuarios por defecto
	
	uno de tipo ADMINISTRADOR:
		usuario: admin@admin.com
		contraseña: Pa$word1
	
	y otro de tipo GERENTE:
		usuario: ger@ger.com 
		contraseña: Pa$word1 
	
	- A todas las cuentas que se creen, se les asignara Pa$word1 como contraseña


--------------------------------------------------------------------------------------

CLIENT APP

	- Angular 13.3.5
	- Ejecutar el comando 'npm install' en el espacio de trabajo, para descargar
	las dependencias
	- En el archivo environment.ts se puede verificar que el puerto localhost sea
	el correcto.

