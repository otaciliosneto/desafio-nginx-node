FROM nginx:latest

RUN apt-get update && apt-get install -y wget

COPY html /usr/share/nginx/html

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]