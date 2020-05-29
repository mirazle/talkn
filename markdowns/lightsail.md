● サーバー側では定義したバランス通りに保存するだけ。
dokcerのインストール

sudo yum install -y docker          # dockerのインストール
sudo service docker start           # dockerの起動
sudo groupadd docker                # ユーザー権限で実行できるようにしておく
sudo usermod -g docker centos       # 作成したグループにcentosユーザを追加
sudo /bin/systemctl restart docker.service
docker info         

docker-composeのインストール

sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

docker login