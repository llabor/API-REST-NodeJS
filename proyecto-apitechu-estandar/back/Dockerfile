#Imagen inicial apartir de la cual creamos nuetra imagen
FROM node

#definir directorio del contenedor
WORKDIR /colapi_jdcc

#Añadimos contenido  del proyecto en el directorio contenedor
ADD . /colapi_jdcc

#puerto por donde escucha
EXPOSE 3001

#comando para lanzar nuetra API REST 'colapi'
CMD [ "npm", "start" ]
#CMD [ "npm", "server.js" ]
