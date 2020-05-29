FROM node:12

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# yarn install
RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

# アプリケーションのソースをバンドルする
COPY . .

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
# COPY package*.json ./

RUN yarn install
# 本番用にコードを作成している場合
# RUN npm install --only=production

EXPOSE 8080
CMD [ "yarn ", "run", "client" ]