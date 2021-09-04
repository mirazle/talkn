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

$ yum install snap
$ systemctl enable --now snapd.socket
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
sudo vim /etc/yum.repos.d/mongodb-enterprise.repo
sudo yum install -y mongodb-enterprise

```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/8Server/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

Amazon linux の場合
/etc/yum.repos.d/mongodb-org-4.4.repo

```
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

```
sudo yum install -y mongodb-org
sudo yum install -y mongodb-org-4.4.6 mongodb-org-server-4.4.6 mongodb-org-shell-4.4.6 mongodb-org-mongos-4.4.6 mongodb-org-tools-4.4.6
sudo systemctl start mongod
```

- 下記を実行

```
yum -y install mongodb-org
mongod -version
systemctl start mongod
systemctl status mongod
mongo
systemctl enable mongod.service
```

Error: Package: mongodb-org-database-tools-extra-4.4.6-1.el8.x86_64 (mongodb-org-4.2)
Requires: /usr/libexec/platform-python
というエラーが出る。ローカルの python が 2 系だが 3 系のパスを求められていることが原因

$ sudo yum install -y python3
$ sudo amazon-linux-extras install -y python3.8

alias 設定
Python3 をインストールした状態だと Python -V でバージョン確認しても以前 Python 2.7 が動作してしまいます。
毎回 3.8 と入力するのは手間なので、エイリアスを設定して pyhon コマンド実行時に使用されるバージョンを上書きします。

alias 設定
$ echo 'alias python=python3.8' >> ~/.bashrc
$ source ~/.bashrc

## 管理ユーザ作成と認証機能有効化

https://qiita.com/tomy0610/items/f540150ac8acaa47ff66

# Redis-Server インストール

Amazon Linux 2 の EPEL レポジトリを有効にする
sudo amazon-linux-extras install -y epel

```
sudo yum install epel-release -y
yum install -y redis
redis-server --version
sudo systemctl start redis
systemctl start redis
systemctl status redis
chkconfig redis on
```

# Swap 領域を確保

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

別のやり方(ubuntu 系)

```
sudo fallocate -l 4G /swapfile 4ギガバイトのスワップファイルを作成
sudo chmod 600 /swapfileルートへのアクセスを制限してスワップファイルを保護します
sudo mkswap /swapfileファイルをスワップスペースとしてマークする
sudo swapon /swapfileスワップを有効にする
echo "/swapfile none swap sw 0 0" | Sudo tee -a /etc/fstab再起動後もスワップファイルを保持します（
```

## fallocate 出なく dd を使用する理由

df -T で確認すると centos の/のファイルシステムが xfs であることが確認出来る。
xfs ファイルシステムは fallocate(ファイルレベル)での swap メモリ領域確保は許容されていない。
`swapon: 512MB.dat: swapon failed: Invalid argument`
というエラーが出るので swap メモリ領域確保は dd(物理ディスクレベル)で実行する。

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
key: view の内容をペースト

```
ssh-keygen -t rsa -b 4096 -C "mirazle2069@gmail.com"
view /root/.ssh/id_rsa.pub
```

- チェックアウト

ssh-keygen -t rsa -b 4096

$ ssh -T git@github.com
The authenticity of host 'github.com (140.82.114.3)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
RSA key fingerprint is MD5:16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,140.82.114.3' (RSA) to the list of known hosts.
Hi mirazle! You've successfully authenticated, but GitHub does not provide shell access.

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

### フォルダ解決

```
mkdir /usr/share/applications/talkn/server/listens/express/assets/icon
```

yarn run server 時に下記のようなエラーが出るので

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
