# Self Signed Certificate

create a new certificate with the following command:
``` bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout debug.key -out debug.crt
```
