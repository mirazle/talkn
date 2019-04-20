# talkn

## ○Description

  talkn is token communication dapps on url.

## ○Node(localhost)

- nodebrew 1.0.0
- node v10.6.0
- npm 6.1.0

## ○フォルダ構造

- server
- common
- client

## ○mongoDB

mongod --config /usr/local/etc/mongod.conf

## Postfix(dovcot&cyrus-sasl(SMTP-AUTH))

```
# yum install cyrus-sasl
# systemctl start saslauthd
# systemctl enable saslauthd
# vi /etc/sasl2/smtpd.conf
pwcheck_method: auxprop
mech_list: plain login
# yum install postfix
# vi /etc/postfix/main.cf
message_size_limit = 5242880
inet_interfaces = all
myhostname = mail.talkn.io
mydomain = talkn.io
myorigin = $mydomain
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
home_mailbox = Maildir/
smtpd_sasl_auth_enable = yes
smtpd_recipient_restrictions =
    permit_mynetworks
    permit_sasl_authenticated
    reject_unauth_destination

# systemctl restart postfix
# systemctl enable postfix
# yum install dovecot
# vim /etc/dovecot/conf.d/10-mail.conf
mail_location = maildir:~/Maildir
# vim /etc/dovecot/conf.d/10-auth.conf
disable_plaintext_auth = no
# vim /etc/dovecot/conf.d/10-ssl.conf
ssl = no
# systemctl start dovecot
# systemctl enable dovecot
# useradd -s /sbin/nologin admin
# passwd admin
# echo "[パスワード]" | saslpasswd2 -p -u mail.talkn.io -c admin
# sasldblistusers2
admin@mail.talkn.io: userPassword
# chgrp postfix /etc/sasldb2
```
 https://qiita.com/tachitechi/items/895bf9c63356ee0751b5


# Setting Localhost SSL 
## ○localhostのSSL設定

### command

```
1 openssl genrsa -des3 -out myCA.key 2048
2 openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem
3 openssl genrsa -out localhost.key 2048
4 openssl req -new -key localhost.key -out localhost.csr
```

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
DNS.5 = auto.localhost
```

### command 

```
- openssl x509 -req -in localhost.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out localhost.crt -days 1825 -sha256 -extfile localhost.ext
```

### keychainAccess

アプリケーション/ユーティリティ/keychainAccessで
- ①左メニューの「システム」を選択。
- ②証明書一覧のヘッダー部分の「＋」ボタンを押す
- ③生成したcrtを選択して一覧に追加
- ④追加したcrtをダブルクリックして開き「信頼」を押す
- ⑤「この証明書を使用するとき」で「常に信頼する」を選択。

### Referrence


https://qiita.com/suin/items/37313aee4543c5d01285

https://sterfield.co.jp/programmer/%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A8%BC%E6%98%8E%E6%9B%B8%E3%82%92%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AB%E4%BF%A1%E9%A0%BC%E3%81%95%E3%81%9B%E3%82%8B/

# Setting Letsencrypt(root & Wildcard)

```
./certbot-auto certonly --manual \
 -d talkn.io -d *.talkn.io -m mirazle2069@gmail.com --agree-tos --manual-public-ip-logging-ok \
--preferred-challenges dns-01 \
--server https://acme-v02.api.letsencrypt.org/directory
```

Your config "zone.conf" _acme-challenge
```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.talkn.io with the following value:

*******************************************

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
```
