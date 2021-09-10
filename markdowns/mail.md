# 整理

AWS コンソールにルートアカウントにてログインした状態で以下のリンクから申請をおこないます。

Request to Remove Email Sending Limitations

## ①Route53(DNS)

DND に追加(存在確認)するレコードは下記。

|レコード名|タイプ|値|
|talkn.io|MX|10 mail.talkn.io.|
|mail.talkn.io|A|18.235.161.122(パブリック IP)|

## ②Lightsail | EC2 の iptable(firewall)

下記を開放しておく。

受信ポート: 25(外部から)
受信ポート: 143(内部から(www.talkn.ioのメールフォーム等から))
送信ポート: 587

## ③gmail アカウント設定(リレーサーバー)

OP25B 問題により、gmail をリレーさせる手法をとる。
google アカウント → セキュリティ →Google へのログイン →→ アプリパスワード
でアプリを選択：「その他」、デバイスを選択：「その他」で
「お使いのデバイスのアプリ パスワード」をメモしておき後述の sasl_passwd で記述する

talkn の mail: 「 qtzlqwzxfrvybnek 」

vi /etc/postfix/sasl_passwd

```
[smtp.gmail.com]:587 mirazle2069:qtzlqwzxfrvybnek
```

chmod 600 /etc/postfix/sasl_passwd
postmap /etc/postfix/sasl_passwd

## ④ 必要パッケージ install

# yum -y install postfix dovecot cyrus-sasl-plain cyrus-sasl-md5 cyrus-sasl telnet

## ⑤postfix: 送信メールサーバー

vi /etc/postfix/main.cf

### Example1

```
myhostname = mail.talkn.io
mydomain = talkn.io
myorigin = $mydomain
inet_interfaces = all
inet_protocols = all
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
home_mailbox = Maildir/

local_recipient_maps =
luser_relay = unknown_user@localhost
relayhost = [smtp.gmail.com]:587

# Copy(存在しないプロパティ)
message_size_limit = 10485760

smtpd_sasl_auth_enable = yes
smtpd_recipient_restrictions =
permit_mynetworks =
permit_sasl_authenticated =
reject_unauth_destination =

smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_sasl_tls_security_options = noanonymous
smtp_sasl_mechanism_filter = plain
smtp_use_tls = yes
```

### Example2

```
myhostname = mail.talkn.io
mydomain = talkn.io
myorigin = $mydomain
inet_interfaces = all
inet_protocols = ipv4
mynetworks = 127.0.0.0/8,192.168.0.0/24,10.0.0.0/8
relay_domains = $mydestination
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
home_mailbox = Maildir/
header_checks = regexp:/etc/postfix/header_checks
smtpd_banner = \$myhostname ESMTP unknown

smtpd_sasl_auth_enable = yes
smtpd_sasl_local_domain = \$myhostname

# 最下行に以下追記

message_size_limit = 5242880
disable_vrfy_command = yes
smtpd_helo_required = yes
strict_rfc821_envelopes = yes
allow_percent_hack = yes
swap_bangpath = yes
allow_untrusted_routing = no

```

下記でエラーチェック

```
postconf -n
```

(エラー例)
postconf: fatal: /etc/postfix/main.cf, line 692: missing '=' after attribute name: "permit_mynetworks"

vi /etc/postfix/master.cf

コメントアウト

```
smtp      inet  n       -       n       -       -       smtpd
submission inet n       -       n       -       -       smtpd
  -o smtpd_sasl_auth_enable=yes
```

### 起動

# systemctl restart postfix

# systemctl enable postfix

## ⑥SASL cyrus-sasl: SMTP-Auth

vi /etc/sasl2/smtpd.conf

```
pwcheck_method: auxprop
mech_list: plain login
```

### ユーザー作成

useradd -s /sbin/nologin hmiyazaki
passwd hmiyazaki
saslpasswd2 -c -u mail.talkn.io hmiyazaki
chgrp postfix /etc/sasldb2

### ユーザー削除(作成済みユーザーを削除したい時に実行)

saslpasswd2 -u mail.talkn.io -d hmiyazaki

### ユーザー確認

sasldblistusers2

### 起動

# systemctl start saslauthd

# systemctl enable saslauthd

## ⑦dovecot: 受信メールサーバー

vi /etc/dovecot/conf.d/10-mail.conf

```
mail_location = maildir:~/Maildir
```

vi /etc/dovecot/conf.d/10-auth.conf

```
disable_plaintext_auth = no
```

vi /etc/dovecot/conf.d/10-ssl.conf

```
ssl = no
```

vi /etc/dovecot/dovecot.conf

```
#listen = *
```

vi /etc/dovecot/conf.d/10-master.conf

```
  # Postfix smtp-auth
  unix_listener /var/spool/postfix/private/auth {
    mode = 0660
    user = postfix
    group = postfix
  }
```

# vim /etc/dovecot/conf.d/10-mail.conf

mail_location = maildir:~/Maildir

# vim /etc/dovecot/conf.d/10-auth.conf

disable_plaintext_auth = no

# vim /etc/dovecot/conf.d/10-ssl.conf

ssl = no

### 起動

# systemctl start dovecot

# systemctl enable dovecot

```

(参考)
https://qiita.com/tachitechi/items/895bf9c63356ee0751b5


# 不正送信ログがたまる

/var/spool/postfix/deferred
```
