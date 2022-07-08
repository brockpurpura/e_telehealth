FROM nginx:1.13.5
COPY nginx.conf /etc/nginx/
COPY default.conf /etc/nginx/conf.d/
RUN mkdir /certs/
COPY univagohealthcare.crt univagohealthcare.key /certs/
EXPOSE 443
