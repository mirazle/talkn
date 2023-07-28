#!/bin/bash

systemctl stop httpd
certbot renew --no-self-upgrade
systemctl start httpd