## ○localhostのSSL設定

### command

- openssl genrsa -des3 -out myCA.key 2048
- openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem
- openssl req -new -key localhost.key -out localhost.csr
- openssl genrsa -out localhost.key 2048

### localhost.ext

```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = portal.localhost
DNS.2 = client.localhost
DNS.3 = assets.localhost
DNS.4 = session.localhost
```

### command 

- openssl x509 -req -in localhost.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out localhost.crt -days 1825 -sha256 -extfile localhost.ext

### keychainAccess

keychainAccessで「信頼」

###　reference

https://qiita.com/suin/items/37313aee4543c5d01285

## ○talkn.ioのssl設定

https://letsencrypt.jp/docs/acme-v2-wildcards.html

San&Wildcard
```
git clone https://github.com/certbot/certbot
./certbot-auto certonly --manual --domain *.talkn.io --domain talkn.io --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory
```

_acme-challengeのTXTレコードに発行された値を設定
