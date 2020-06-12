# インスタンス作成

- CentOS を選択(月次料金 3.5\$を選択)
- リソース名：talknProdApp-root
- キー値タグ：env: prod, type: app, ch: /

## ネットワーキング　(静的 IP とインスタンスとグローバル IP の紐つけ)

- 作成したインスタンスを静的 IP に紐つける
- グローバルの DNS ゾーンと紐つける

## ネットワーキング(iptable)

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

## 必要な yum を install

`sudo yum install epel-release -y`
`sudo yum update -y`
`sudo yum install git -y`
`sudo yum install certbot -y`
`sudo yum install mongodb-org -y`(mongodb-org-xx.repo)
`sudo yum install redis -y`
`sudo yum install gcc-c++ -y`
`sudo yum install glibc-common -y`

## step1 前提条件を満たす

talkn.io ドメインを静的 IP にアタッチしターミナルで SSH アクセス
`sudo vi /etc/ssh/sshd_config` で 22 ポートを 56789 に変更してサーバーを再起動して設定を反映。
22 ポートは Connection refused。
56789 はでアクセスを成功する事を確認。

接続時に Host key verification failed が出る場合は
`ssh-keygen -R ${IP}`
`ssh-keygen -R talkn.io`
もしくは
`vi /Users/hmiyazaki/.ssh/known_hosts`
で該当するドメインや IP のローカルの SSH 認証情報を削除する

## step2 Let's Encrypt の SSL ワイルドカード証明書をリクエストする

```
DOMAIN=talkn.io
WILDCARD=\*.$DOMAIN
echo $DOMAIN && echo $WILDCARD
sudo certbot -d $DOMAIN -d \$WILDCARD --manual --preferred-challenges dns certonly
(\は削除して実行する)
```

で\_acme-challenge.talkn.io の DNS の TXT レコードが発行されるので
Lightsail の「ネットワーキング」で「登録済みドメインの入力」に talkn.io で入力し「DND ゾーンの作成」を押す。(作成済み)
実行したターミナルのコマンドは待機。ZONE ファイルで TXT レコードを追加し

`dig -t TXT \_acme-challenge.talkn.io`

で変更を確認(変更されてなければ待つ)
実行したターミナルのコマンドでエンターを押し

> IMPORTANT NOTES:
>
> - Congratulations! Your certificate and chain have been saved at:

と表示されれば成功。失敗する場合は ssl.md を参照。

手順参照)
https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/amazon-lightsail-using-lets-encrypt-certificates-with-wordpressから抜粋

# MongoDB インストール

普通に yum install すると古いバージョンが入るので mongodb のリポジトリを登録。
その時の最新の安定版を選択する事。(4.2 は適宜変更)

`sudo vi /etc/yum.repos.d/mongodb-org-4.2.repo`

```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

下記を実行

```
sudo yum -y install mongodb-org
mongod -version
sudo systemctl start mongod
sudo systemctl status mongod
mongo
sudo chkconfig mongod on
```

## 管理ユーザ作成と認証機能有効化

https://qiita.com/tomy0610/items/f540150ac8acaa47ff66

# Redis-Server インストール

```
sudo yum install epel-release -y
sudo yum install -y redis
redis-server --version
sudo systemctl start redis
sudo systemctl status redis
sudo chkconfig redis on
```

# Node 環境 インストール

## nvm

```
git clone git://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh
nvm --version
```

`source $HOME/.nvm/nvm.sh`を`~/.bash_profile`に追加しておく。
(これをしないと再ログイン時に nvm が使用出来なくなる)

## Node

```
nvm install stable
node -v
npm -v
```

`/home/centos/.nvm/versions/node/v14.4.0/bin`の$PAHTが追加されるので、
`~/.bash_profile`にも$PATH を通す
(これをしないと再ログイン時に node, npm, yarn 等が使用出来なくなる)

## yarn

`npm install -g yarn`
`yarn --version`

# Github からソースを checkout

`cd home centos`
`ssh-keygen -t rsa -b 4096 -C "mirazle2069@gmail.com"`
`view /home/centos/.ssh/id_rsa.pub`
で公開鍵を github の Setting->Deploy keys に追加

`git clone git@github.com:mirazle/talkn.git`

# ソースの修正

common/define.ts の

```
  PRODUCTION_IP: "ip-172-26-3-161.ec2.internal",
```

にプライベート IP を反映させる`172-26-3-161`が可変になる

`env | echo $HOSTNAME`で確認出来る文字列

# 権限の解消

sudo chown -R centos /etc/letsencrypt

# Local 設定

下記のエラーの対処法

> -bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory

`sudo yum -y install glibc-common`
`localectl list-locales | grep -i ja`
`sudo localectl set-locale LANG=ja_JP.UTF-8`
`sudo localectl set-locale LC_CTYPE=ja_JP.utf8`
`source /etc/locale.conf`
`localectl`

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
