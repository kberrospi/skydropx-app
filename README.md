This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Skydropx App

Este proyecto se construyó con la finalidad de mostrar un flujo en la transacción de envios por parte de un usuario, 
en el cual el usuario debe ingresar el codigo postal de origen y destino, además de las medidas del paquete que envia
que son: Largo, Ancho, Alto y Peso.

Una vez el usuario digite estos datos y al dar click en el boton de continuar, si no hay errores en los datos ingresados,
podrá observar una lista de servicios donde se muestra la compañia que presta el servicio, los dias en los que puede 
demorar el envío y el costo del mismo. Para éste caso el servicio más económico será resaltado de tal manera que el usuario 
pueda identificarlo como una mejor opción. Al seleccionar el servicio que el usuario desee, podrá dar click al boton "Enviar"

Luego de dar click, al usuario se le preguntará si desea hacer el envío con el servicio seleccionado para evitar generar un envio
no deseado sí por accidente da click al boton "Enviar". Luego de la confirmación si hay errores en la creación de la guia, el usuario 
será notificado y se mantendrá en la pantalla para escoger otro servicio. Si tenemos una respuesta exitosa, al usuario
se le abrirá una nueva pestaña con la guia en formato pdf y se redireccionara al inicio para hacer un proceso nuevo si lo desea.


### Pasos para inciar el proyecto:

- Clonamos el proyecto
- Entramos en la carpeta del proyecto llamad skydropx-app
- Ejecutamos el comando yarn para instalar las dependencias
- Luego ejecutamos el comando yarn dev, para ejecutarlo en modo dev

#### Iniciar Proyecto en produccion

- Ejecutamos el comando yarn build
- Una vez terminado el proceso de construcción ejecutamos el comando yarn start.

En ambos casos de modo dev y produccion el proyecto se ejecutará en el siguiente enlace: [http://localhost:3000](http://localhost:3000) 

## Pruebas

- Para ejecur las pruebas puede ejecutar el comando yarn test.

## Deploy 
Deploy realizado en vercel, pueden acceder con el siguiente enlace [Skydropx App](https://skydropx-app.vercel.app/)

