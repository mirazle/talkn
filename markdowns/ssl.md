# Setting Localhost SSL 
## ●localhostのSSL設定

### workspace

```
cd common/pems/server
```

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
DNS.3 = client.localhost
DNS.4 = assets.localhost
DNS.5 = session.localhost
DNS.6 = ext.localhost
```

### command 

```
openssl x509 -req -in localhost.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out localhost.crt -days 1825 -sha256 -extfile localhost.ext
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

# ●Setting Letsencrypt(root & Wildcard)

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

SSL GRADE "A" SETTING CAA ( then Regist _acme-challenge that remove )
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

1 _acme-challengeが合わない&CAAレコードが妨げているとエラー
          .
          .(loop)
          .

2 以前のインスタンスが残っている場合がある
```
 Another instance of Certbot is already running.
```

3 前回の上記インスタンスを生成した時の./cert-autoコマンドを実行

その時のzone.conf

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|   HOST_NAME                 |   TYPE    |                   DATA                    |
|   _acme-challenge.talkn.io. |   TXT     |"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" |
|   @                         |   CAA     | 0 issuewild "letsencrypt.org"             |
|   @                         |   CAA     | 0 issuewild ";"                           |
|   @                         |   CAA     | 0 iodef "mailto:mirazle2069@gmail.com"    |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
