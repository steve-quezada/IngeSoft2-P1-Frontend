# Multi-stage build para el frontend React/Vite

# Etapa 1: Build - Instalación de dependencias y construcción
FROM node:20-alpine as builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (regenerar package-lock.json si es necesario)
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Producción - Servidor ligero con Supervisor
FROM node:20-alpine as production

# Instalar supervisor y wget para healthcheck
RUN apk add --no-cache supervisor wget

# Instalar serve globalmente
RUN npm install -g serve

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los artefactos build desde la etapa builder
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Crear directorio para logs de supervisor con permisos adecuados
RUN mkdir -p /var/log/supervisor /var/run/supervisor && \
    chown -R nextjs:nodejs /var/log/supervisor /var/run/supervisor

# Copiar configuración de supervisor con permisos correctos
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chown nextjs:nodejs /etc/supervisor/conf.d/supervisord.conf

# Cambiar a usuario no-root
USER nextjs

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production

# Comando para iniciar Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
