# Setting Localhost SSL

## ●localhost の SSL 設定

### workspace

```
cd common/pems
```

### LetsEncrypt のサイトから

参照) https://letsencrypt.org/ja/docs/certificates-for-localhost/

openssl req -x509 -out localhost.crt -keyout localhost.key \
 -subj "/C=JA/ST=TOKYO/CN=talkn.io/emailAddress=mirazle2069@gmail.com" \
 -newkey rsa:2048 -nodes -sha256 \
 -subj '/CN=localhost' -days 365 -extensions EXT -config <( \
 printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\n
subjectAltName=DNS:localhost,DNS:assets.localhost,DNS:client.localhost,DNS:cover.localhost,DNS:components.localhost,DNS:cover.localhost,DNS:api.localhost,DNS:ext.localhost,DNS:tune.localhost,DNS:www.localhost,DNS:own.localhost
\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

上記を実行後に生成された.crt をキーチェーンで承認。
keychainAccess(旧)を参照。

### localhost.ext(旧)

5 make this file

```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = portal.localhost
DNS.3 = client.localhost
DNS.4 = assets.localhost
DNS.5 = session.localhost
DNS.6 = ext.localhost
```

### command1(旧)

```
1 openssl genrsa -des3 -out myCA.key 2048
2 openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem
3 openssl genrsa -out localhost.key 2048
4 openssl req -new -key localhost.key -out localhost.csr
```

### command2(旧)

```
6 openssl x509 -req -in localhost.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out localhost.crt -days 1825 -sha256 -extfile localhost.ext
```

### keychainAccess(旧)

アプリケーション/ユーティリティ/keychainAccess で

- ① 左メニューの「システム」を選択。
- ② 証明書一覧のヘッダー部分の「＋」ボタンを押す(なければ鉛筆のアイコン)
- ③ 生成した .crt(or .pem) を選択して一覧に追加
- ④ 追加した .crt(or .pem) をダブルクリックして開き「信頼」を押す
- ⑤「この証明書を使用するとき」で「常に信頼する」を選択。

### Referrence

https://qiita.com/suin/items/37313aee4543c5d01285

https://sterfield.co.jp/programmer/%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A8%BC%E6%98%8E%E6%9B%B8%E3%82%92%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AB%E4%BF%A1%E9%A0%BC%E3%81%95%E3%81%9B%E3%82%8B/

# ●Setting Letsencrypt(root & Wildcard)

2021 年よりインストール方法が変更

```
yum install snapd
```

起動設定

```
systemctl enable --now snapd.socket
ln -s /var/lib/snapd/snap /snap
```

sudo snap install core
snap refresh core

sudo curl https://dl.eff.org/certbot-auto -o /usr/bin/certbot-auto
sudo chmod 700 /usr/bin/certbot-auto

```
./certbot-auto certonly --manual \
 -d talkn.io -d *.talkn.io -m mirazle2069@gmail.com --agree-tos --manual-public-ip-logging-ok \
--preferred-challenges dns-01 \
--server https://acme-v02.api.letsencrypt.org/directory
```

```
./certbot-auto certonly --manual -d talkn.io -d *.talkn.io -m mirazle2069@gmail.com --agree-tos --manual-public-ip-logging-ok --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory
```

Your config "zone.conf" \_acme-challenge

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.talkn.io with the following value:

*******************************************

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
```

SSL GRADE "A" SETTING CAA ( then Regist \_acme-challenge that remove )

```
https://www.ssllabs.com/ssltest/analyze.html?d=talkn.io
```

check

```
 dig -t TXT _acme-challenge.talkn.io
 dig -t CAA talkn.io
```

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

-------------------------------------------------------------------------
|   HOST_NAME   |   TYPE    |                   DATA                    |
|   @           |   CAA     | 0 issue "letsencrypt.org"                 |
|   @           |   CAA     | 0 issuewild ";"                           |
|   @           |   CAA     | 0 iodef "mailto:inquiry@mail.talkn.io"    |
-------------------------------------------------------------------------

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

cd /root
ps -aux | grep ./cert*
```

## なぜか上手くいかない時

1 \_acme-challenge が合わない&CAA レコードが妨げているとエラー
.
.(loop)
.

2 以前のインスタンスが残っている場合がある

```
 Another instance of Certbot is already running.
```

3 前回の上記インスタンスを生成した時の./cert-auto コマンドを実行

その時の zone.conf

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   HOST_NAME                 |   TYPE    |                   DATA                    |
|   _acme-challenge.talkn.io. |   TXT     |"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" |
|   @                         |   CAA     | 0 issuewild "letsencrypt.org"             |
|   @                         |   CAA     | 0 issuewild ";"                           |
|   @                         |   CAA     | 0 iodef "mailto:mirazle2069@gmail.com"    |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
