# 整理

## ①Route53(DNS)

DND に追加(存在確認)するレコードは下記。

|レコード名|タイプ|値|
|talkn.io|MX|10 mail.talkn.io.|
|mail.talkn.io|A|18.235.161.122(パブリック IP)|

## ②Lightsail | EC2 の iptable(firewall)

下記を開放しておく。

受信ポート: 143
送信ポート: 587

## ③gmail アカウント設定()

OP25B 問題により、gmail をリレーさせる手法をとる。

google アカウント → セキュリティ →Google へのログイン →→ アプリパスワード
でアプリを選択：「その他」、デバイスを選択：「その他」で
「お使いのデバイスのアプリ パスワード」をメモしておき後述の sasl_passward で記述する

## ④postfix: 送信メールサーバー

### vi /etc/postfix/main.cf

myhostname = mail.talkn.io
mydomain = talkn.io
myorigin = $mydomain
inet_interfaces = all
inet_protocols = all
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain, \$mydomain
home_mailbox = Maildir/

message_size_limit = 10485760
local_recipient_maps =
luser_relay = unknown_user@localhost
relayhost = [smtp.gmail.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_sasl_tls_security_options = noanonymous
smtp_sasl_mechanism_filter = plain
smtp_use_tls = yes

### ⑤cyrus-sasl: SMTP-Auth

### ⑥dovecot: 受信メールサーバー

## Postfix(dovcot&cyrus-sasl(SMTP-AUTH))

```


# yum -y install cyrus-sasl-plain
# yum -y install cyrus-sasl-md5
# yum install cyrus-sasl
# systemctl start saslauthd
# systemctl enable saslauthd
# vi /etc/sasl2/smtpd.conf
pwcheck_method: auxprop
mech_list: plain login
# yum install postfix
# vi /etc/postfix/main.cf
message_size_limit = 5242880
inet_interfaces = all
mydistination = mail.talkn.io
myhostname = mail.talkn.io
mydomain = talkn.io
myorigin = $mydomain
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
home_mailbox = Maildir/
smtpd_sasl_auth_enable = yes
smtpd_recipient_restrictions =
    permit_mynetworks
    permit_sasl_authenticated
    reject_unauth_destination

# systemctl restart postfix
# systemctl enable postfix
# yum install dovecot
# vim /etc/dovecot/conf.d/10-mail.conf
mail_location = maildir:~/Maildir
# vim /etc/dovecot/conf.d/10-auth.conf
disable_plaintext_auth = no
# vim /etc/dovecot/conf.d/10-ssl.conf
ssl = no
# systemctl start dovecot
# systemctl enable dovecot
# useradd -s /sbin/nologin admin
# passwd admin
# ↓　　　　　　echo "[パスワード]" | saslpasswd2 -p -u mail.talkn.io -c admin
# echo "admin" | saslpasswd2 -p -u talkn.io -c admin
# sasldblistusers2
admin@mail.talkn.io: userPassword
# chgrp postfix /etc/sasldb2
```

https://qiita.com/tachitechi/items/895bf9c63356ee0751b5

### vi /etc/sasl2/smtpd.conf

```
pwcheck_method: auxprop
mech_list: plain login
```

vi /etc/dovecot/dovecot.conf

```
listen = *
```

vi /etc/dovecot/conf.d/10-master.conf

```
  unix_listener /var/spool/postfix/private/auth {
    mode = 0666
    user=admin
    group=admin
  }
```

vi /etc/dovecot/conf.d/10-auth.conf

```
disable_plaintext_auth = no
auth_mechanisms = plain login
```

vi /etc/dovecot/conf.d/10-ssl.conf

```
ssl = no
```

vi /etc/postfix/master.cf

```
smtp      inet  n       -       n       -       -       smtpd
submission inet n       -       n       -       -       smtpd
  -o smtpd_sasl_auth_enable=yes
```

vi /etc/postfix/main.cf

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
smtpd_banner = $myhostname ESMTP unknown

smtpd_sasl_auth_enable = yes
smtpd_sasl_local_domain = $myhostname

# 最下行に以下追記
message_size_limit = 5242880
disable_vrfy_command = yes
smtpd_helo_required = yes
strict_rfc821_envelopes = yes
allow_percent_hack = yes
swap_bangpath = yes
allow_untrusted_routing = no
```
