# Para utilizar imagen que ya existe
FROM node

# Definimos directorio del contenedor donde queremos guardar lo que
# tenemos en nuestro directorio del proyecto
WORKDIR /apitechu

# Añadimos el contenido de nuestro directorio (actual) donde esta el código de nuestra API
# al directorio del contenedor
ADD . /apitechu

# Definimos puerto donde escuchará el contenedor (virtual)
# 3000 que es el que hemos puesto en nuestra API
EXPOSE 3000

CMD ["npm", "start"]
