FROM nginx:mainline

ADD app /app
ADD build/nginx/default.conf /etc/nginx/conf.d/default.conf
