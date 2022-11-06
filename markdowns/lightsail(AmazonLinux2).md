# インスタンス作成

- Linux/Unix OS のみ Amazon Linux2(月次料金 3.5\$を選択)
- インスタンスを確認(リソース名)：talknProdApp-root
- キー値タグ：env: prod, type: app, ch: /

「インスタンスを作成」を押す。

## ネットワーキング　(静的 IP とインスタンスとグローバル IP の紐つけ)

- 作成したインスタンスを静的 IP に紐つける
- グローバルの DNS ゾーンと紐つける

## インスタンスのネットワーキング(iptable)

- 443(https)
- 6379(redis)
- 10443(socket-io の https)
- 27017(mongo)
- 56789(SSH)

を解放

## DNS 基本設定

- A レコード @.talkn.io STATIC_IP_talknProdApp-root(18.235.161.122)
- A レコード \*.talkn.io STATIC_IP_talknProdApp-root(18.235.161.122)

# Setup SSL (SSH LOGINED)

```
sudo su -
yum update -y
```

## ssh 接続

- talkn.io ドメインを静的 IP にアタッチしターミナルで SSH アクセス
- ログインする`cecntos`ユーザーで`vi /etc/ssh/sshd_config` で 22 ポートを 56789 に変更してサーバーを再起動して設定を反映。
- `systemctl restart sshd`で sshd を再起動
- 22 ポートは Connection refused。
- 56789 はでアクセスを成功する事を確認。

- 接続時に Host key verification failed が出る場合は
  `ssh-keygen -R 18.235.161.122`
  `ssh-keygen -R talkn.io`
- もしくは
  `vi /Users/hmiyazaki/.ssh/known_hosts`
  で該当するドメインや IP のローカルの SSH 認証情報を削除する

- 下記でアクセス
  `ssh centos@talkn.io -i ~/Downloads/LightsailDefaultKey-us-east-1.pem`

## step2 Let's Encrypt の SSL ワイルドカード証明書をリクエストする

$ sudo su -
$ cd /etc/yum.repos.d/
$ wget https://people.canonical.com/~mvo/snapd/amazon-linux2/snapd-amzn2.repo
$ vi /etc/yum.conf

下記を追加

```
exclude=snapd-*.el7 snap-*.el7
```

$ amazon-linux-extras install epel
$ yum install snapd
$ systemctl enable --now snapd.socket
$ systemctl status --now snapd.socket
$ snap install --classic certbot
$ ln -s /snap/bin/certbot /usr/bin/certbot

```
DOMAIN=talkn.io
WILDCARD=*.$DOMAIN
echo $DOMAIN && echo $WILDCARD
certbot -d $DOMAIN -d $WILDCARD --manual --preferred-challenges dns certonly
(\は削除して実行する)
```

- \_acme-challenge.talkn.io の DNS の TXT レコードが発行されるので
  Lightsail の「ネットワーキング」で「登録済みドメインの入力」に talkn.io で入力「DND ゾーンの作成」を押す。(作成済み)
- 実行したターミナルのコマンドは待機。ZONE ファイルで TXT レコードを追加し

`dig -t TXT \_acme-challenge.talkn.io`

で変更を確認(変更されていなければ、TTL で設定してある時間待つ)

- 実行したターミナルのコマンドでエンターを押し

```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/talkn.io/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/talkn.io/privkey.pem
This certificate expires on 2021-10-02.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.
```

と表示されれば成功。失敗する場合は ssl.md を参照。

手順参照)
https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/amazon-lightsail-using-lets-encrypt-certificates-with-wordpressから抜粋

注意)

週に 5 回を超えると更新できなくなる(Duplicate Certificate limit of 5 per week)

> Renewals are treated specially: they don’t count against your Certificates per Registered Domain limit, but they are subject to a Duplicate Certificate limit of 5 per week. Note: renewals used to count against your Certificate per Registered Domain limit until March 2019, but they don’t anymore. Exceeding the Duplicate Certificate limit is reported with the error message too many certificates already issued for exact set of domains.

https://letsencrypt.org/docs/rate-limits/

# MongoDB インストール

vi /etc/yum.repos.d/mongodb-org-4.4.repo

```
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

```
yum install -y mongodb-org
yum install -y mongodb-org-4.4.6 mongodb-org-server-4.4.6 mongodb-org-shell-4.4.6 mongodb-org-mongos-4.4.6 mongodb-org-tools-4.4.6
systemctl start mongod
```

# Redis-Server インストール

Amazon Linux 2 の EPEL レポジトリを有効にする
amazon-linux-extras install -y epel

```
yum install epel-release -y
yum install -y redis
redis-server --version
systemctl start redis
chkconfig redis on
```

# Node 環境 インストール

## nvm

```
yum install git -y
git clone git://github.com/creationix/nvm.git ~/.nvm | curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm --version
```

- `source $HOME/.nvm/nvm.sh`を`~/.bash_profile`に追加しておく。
  (これをしないと再ログイン時に nvm が使用出来なくなる)

## Node

```
nvm install stable | nvm install --lts
node -v
npm -v
```

- `$HOME/.nvm/versions/node/v14.4.0/bin`(バージョンは可変)の$PAHTが追加されるので、
`~/.bash_profile`にも$PATH を通す
  (これをしないと再ログイン時に node, npm, yarn 等が使用出来なくなる)

## yarn

`npm install -g yarn`
`yarn set version berry` | `yarn set version latest`
`yarn plugin import interactive-tools`
`yarn -v`

※ Error: yarn plugin import interactive-tools

`touch .yarn.lock`

※ Internal Error: The "yarn-path" option has been set xxx .yarnrc.yml

`vi .yarnrc.yml`

```
yarnPath: /root/.nvm/versions/node/v16.4.1/bin/yarn
```

## python3

$ sudo yum install -y python3
$ sudo amazon-linux-extras install -y python3.8

alias 設定
Python3 をインストールした状態だと Python -V でバージョン確認しても以前 Python 2.7 が動作してしまいます。
毎回 3.8 と入力するのは手間なので、エイリアスを設定して pyhon コマンド実行時に使用されるバージョンを上書きします。

alias 設定
$ echo 'alias python=python3.8' >> ~/.bashrc
$ source ~/.bashrc

# Github からソースを checkout

- 公開鍵を github の Setting->Deploy keys に追加

Title: talknProdApp-root
key: view の内容をペースト

```
ssh-keygen -t rsa -b 4096 -C "mirazle2069@gmail.com"
view /root/.ssh/id_rsa.pub
```

- チェックアウト

```
ssh -T git@github.com
cd /usr/share/applications/
git clone git@github.com:mirazle/talkn.git
ln -s /usr/share/applications/talkn/ /root/talkn
cd /usr/share/applications/talkn

// iconvのインストールのために先にインストールしておく
yarn global add node-gyp
yarn install
```

### node_modules

`vi node_modules/send/index.js` を

```
24 var mime = require('mime-types')
```

に変更する(TODO: この修正無しでも動作出来るようにうにする)

### その他

デフォルトのアイコンをサーバーにあげる

```
cp client/assets/favicon.ico server/src/listens/express/assets/icon/https:__assets.talkn.io_favicon.ico.png
```

# アプリ起動

## 起動

基本は`yarn install`してから`sh start.sh`を実行する。

## 起動失敗時

```
ps aux | grep node | grep -v grep | awk '{ print "kill -9", $2 }' | sh
systemctl restart redis
systemctl restart mongod
nvm use 14.4.0
rm -Rf node_modules
yarn cache clean
yarn install
```

# Local 設定

- 下記のエラーの対処法

> -bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory

`yum -y install glibc-common`
`localectl list-locales | grep -i ja`
`localectl set-locale LANG=ja_JP.UTF-8`
`localectl set-locale LC_CTYPE=ja_JP.utf8`
`source /etc/locale.conf`
`localectl`

# ソースの実行

`cd /usr/share/applications/talkn`
`git pull`
`yarn install`
`sh start.sh`

## 低スペック(512MB 程度)サーバーだと yarn でメモリエラーが発生する

`yarn install` `yarn run server`を実行する際に killed, crashed などのエラーが発生してしまうので、
swap 領域を確保して、実行メモリ領域を確保する。

下記のコマンドで swap 領域を確認する

```
free -m
```

一番下の行を見ると、合計 0 バイトのスワップメモリ ​​ があるのは良くない。
Node はかなりメモリを空けることができ、メモリが不足したときにスワップスペースが利用できない場合、エラーは必ず発生する。

```
dd if=/dev/zero of=/swap bs=1M count=1024
sudo mkswap /swap
chmod 0600 /swap
sudo swapon /swap
```

## ポートが埋まって実行できない時

# dokcer のインストール

sudo yum install -y docker # docker のインストール
sudo service docker start # docker の起動
sudo groupadd docker # ユーザー権限で実行できるようにしておく
sudo usermod -g docker centos # 作成したグループに centos ユーザを追加
sudo /bin/systemctl restart docker.service
docker info

docker-compose のインストール

sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-\$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

docker login
