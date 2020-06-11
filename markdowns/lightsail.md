●Lightsail 起動

# インスタンス作成で CentOS を選択(月次料金 3.5\$を選択)

リソース名：talknProdApp-root
キー値タグ：env: prod, type: app, ch: /

## ネットワーキング

443(https)
6379(redis)
10443(socket-io の https)
27017(mongo)
56789(SSH)

を解放

## 静的 IP の紐つけ

A レコード @.talkn.io STATIC_IP_talknProdApp-root(18.235.161.122)
A レコード \*.talkn.io STATIC_IP_talknProdApp-root(18.235.161.122)

# Setup SSL (SSH LOGINED)

## 必要な yum を install

`sudo yum update -y`
`sudo yum install epel-release -y`
`sudo yum install git -y`
`sudo yum install certbot -y`
`sudo yum -y install mongodb-org`
`sudo yum install -y redis`

## step1 前提条件を満たす

talkn.io ドメインを静的 IP にアタッチしターミナルで SSH アクセス
sudo vi /etc/ssh/sshd_config で 22 ポートを 56789 に変更して再起動。
22 ポートは Connection refused。
56789 はでアクセスを成功する事を確認。

Host key verification failed が出る場合は
`ssh-keygen -R ${IP}`
`ssh-keygen -R talkn.io`
でローカルの SSH 認証情報をリセットする

## step2 Lightsail インスタンスに Certbot をインストールする

### Centos7 インスタンスを選択していた場合

sudo yum update -y
sudo yum install epel-release -y
sudo yum install certbot -y

### Node.Js インスタンスを選択していた場合

`sudo apt-get update`sudo apt-get install software-properties-common
`sudo apt-add-repository ppa:certbot/certbot -y`sudo apt-get update -y
`sudo apt-get install certbot -y

https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/amazon-lightsail-using-lets-encrypt-certificates-with-wordpressから抜粋

## step3 Let's Encrypt の SSL ワイルドカード証明書をリクエストする

DOMAIN=talkn.io
WILDCARD=\*.$DOMAIN
echo $DOMAIN && echo $WILDCARD
sudo certbot -d $DOMAIN -d \$WILDCARD --manual --preferred-challenges dns certonly

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

# Node 環境 インストール

## nvm

`git clone git://github.com/creationix/nvm.git ~/.nvm`
`source ~/.nvm/nvm.sh`

## Node

`nvm install stable`

## yarn

`curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo`
`sudo yum install yarn -y`
`yarn --version`

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

`sudo yum -y install mongodb-org`
`mongod -version`
`sudo systemctl start mongod`
`sudo systemctl status mongod`
`mongo`

## 管理ユーザ作成と認証機能有効化

https://qiita.com/tomy0610/items/f540150ac8acaa47ff66

# Redis-Server インストール

`sudo yum install epel-release -y`
`sudo yum install -y redis`
`redis-server --version`
`sudo systemctl start redis`
`sudo systemctl status redis`

# Github からソースを checkout

`cd home centos`
`ssh-keygen -t rsa -b 4096 -C "mirazle2069@gmail.com"`
`view /home/centos/.ssh/id_rsa.pub`
で公開鍵を github の Setting->Deploy keys に追加

`git clone git@github.com:mirazle/talkn.git`

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
