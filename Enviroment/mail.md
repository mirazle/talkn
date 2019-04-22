## Postfix(dovcot&cyrus-sasl(SMTP-AUTH))

```
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
# echo "[パスワード]" | saslpasswd2 -p -u mail.talkn.io -c admin
# sasldblistusers2
admin@mail.talkn.io: userPassword
# chgrp postfix /etc/sasldb2
```
 https://qiita.com/tachitechi/items/895bf9c63356ee0751b5

