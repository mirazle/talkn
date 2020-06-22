# インスタンス作成

- CentOS を選択(月次料金 3.5\$を選択)
- リソース名：talknProdApp-root
- キー値タグ：env: prod, type: app, ch: /

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
```

## 必要な yum を install

```
yum install epel-release -y
yum install certbot -y
yum update -y
yum install git -y
yum install gcc -y
yum install gcc-c++ -y
yum install lsof -y
yum install redis -y
yum install mongodb-org -y
```

## step1 前提条件を満たす

- talkn.io ドメインを静的 IP にアタッチしターミナルで SSH アクセス
- `vi /etc/ssh/sshd_config` で 22 ポートを 56789 に変更してサーバーを再起動して設定を反映。
- 22 ポートは Connection refused。
- 56789 はでアクセスを成功する事を確認。

- 接続時に Host key verification failed が出る場合は
  `ssh-keygen -R 18.235.161.122`
  `ssh-keygen -R talkn.io`
- もしくは
  `vi /Users/hmiyazaki/.ssh/known_hosts`
  で該当するドメインや IP のローカルの SSH 認証情報を削除する

## step2 Let's Encrypt の SSL ワイルドカード証明書をリクエストする

```
DOMAIN=talkn.io
WILDCARD=\*.$DOMAIN
echo $DOMAIN && echo $WILDCARD
certbot -d $DOMAIN -d \$WILDCARD --manual --preferred-challenges dns certonly
(\は削除して実行する)
```

- \_acme-challenge.talkn.io の DNS の TXT レコードが発行されるので
  Lightsail の「ネットワーキング」で「登録済みドメインの入力」に talkn.io で入力「DND ゾーンの作成」を押す。(作成済み)
- 実行したターミナルのコマンドは待機。ZONE ファイルで TXT レコードを追加し

`dig -t TXT \_acme-challenge.talkn.io`

で変更を確認(変更されていなければ、TTLで設定してある時間待つ)

- 実行したターミナルのコマンドでエンターを押し

> IMPORTANT NOTES:
>
> - Congratulations! Your certificate and chain have been saved at:

と表示されれば成功。失敗する場合は ssl.md を参照。

手順参照)
https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/amazon-lightsail-using-lets-encrypt-certificates-with-wordpressから抜粋

注意)

週に 5 回を超えると更新できなくなる(Duplicate Certificate limit of 5 per week)

> Renewals are treated specially: they don’t count against your Certificates per Registered Domain limit, but they are subject to a Duplicate Certificate limit of 5 per week. Note: renewals used to count against your Certificate per Registered Domain limit until March 2019, but they don’t anymore. Exceeding the Duplicate Certificate limit is reported with the error message too many certificates already issued for exact set of domains.

https://letsencrypt.org/docs/rate-limits/

# MongoDB インストール

- 普通に yum install すると古いバージョンが入るので mongodb のリポジトリを登録。
- その時の最新の安定版を選択する事。(4.2 は適宜変更)

`vi /etc/yum.repos.d/mongodb-org-4.2.repo`

```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

- 下記を実行

```
yum -y install mongodb-org
mongod -version
systemctl start mongod
systemctl status mongod
mongo
chkconfig mongod on
```

## 管理ユーザ作成と認証機能有効化

https://qiita.com/tomy0610/items/f540150ac8acaa47ff66

# Redis-Server インストール

```
yum install epel-release -y
yum install -y redis
redis-server --version
systemctl start redis
systemctl status redis
chkconfig redis on
```

# Swap領域を確保

## 低スペック(512MB程度)サーバーだとyarnでメモリエラーが発生する

`yarn install` `yarn run server`を実行する際にkilled, crashedなどのエラーが発生してしまうので、
swap領域を確保して、実行メモリ領域を確保する。

下記のコマンドでswap領域を確認する
```
free -m
```

```
dd if=/dev/zero of=/swap bs=1M count=1024
sudo mkswap /swap
chmod 0600 /swap
sudo swapon /swap
```

## fallocate出なくddを使用する理由

df -Tで確認するとcentosの/のファイルシステムがxfsであることが確認出来る。
xfsファイルシステムはfallocate(ファイルレベル)でのswapメモリ領域確保は許容されていない。
`swapon: 512MB.dat: swapon failed: Invalid argument`
というエラーが出るのでswapメモリ領域確保はdd(物理ディスクレベル)で実行する。

# Node 環境 インストール

## nvm

```
git clone git://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh
nvm --version
```

- `source $HOME/.nvm/nvm.sh`を`~/.bash_profile`に追加しておく。
  (これをしないと再ログイン時に nvm が使用出来なくなる)

## Node

```
nvm install stable
node -v
npm -v
```

- `$HOME/.nvm/versions/node/v14.4.0/bin`の$PAHTが追加されるので、
`~/.bash_profile`にも$PATH を通す
  (これをしないと再ログイン時に node, npm, yarn 等が使用出来なくなる)

## yarn

`npm install -g yarn`
`yarn -v`

# Github からソースを checkout

- 公開鍵を github の Setting->Deploy keys に追加

Title: talknProdApp-root
key: viewの内容をペースト

```
ssh-keygen -t rsa -b 4096 -C "mirazle2069@gmail.com"
view /root/.ssh/id_rsa.pub
```

- チェックアウト

```
cd /usr/share/applications/
git clone git@github.com:mirazle/talkn.git
ln -s /usr/share/applications/talkn/ /root/talkn
cd /usr/share/applications/talkn

// iconvのインストールのために先にインストールしておく
yarn global add node-gyp
```

# ソースの修正

チェックアウトが正しく完了した後に実行する。
これらが完了しないと本番で動作しない。

### IP アドレス

- common/define.ts の

```
  PRODUCTION_IP: "ip-172-26-3-161.ec2.internal",
```

にプライベート IP を反映させる`172-26-3-161`が可変になる

`env`か`echo $HOSTNAME`で確認出来る文字列

### フォルダ解決

```
mkdir /usr/share/applications/talkn/server/listens/express/assets/icon
```

yarn run server時に下記のようなエラーが出るので

> (node:18715) UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, open '/usr/share/applications/talkn/server/listens/express/assets/icon/https:\_\_assets.talkn.io_favicon.ico.png'

### node_modules

`vi node_modules/send/index.js` を

```
24 var mime = require('mime-types')
```

に変更する(TODO: この修正無しでも動作出来るようにうにする)

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
yarn global add node-gyp
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
