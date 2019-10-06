export default `Avaliable hooks:

pre-deploy
pre-download
post-deploy
post-download

hooks can be a file or a directory with files inside

| - pre-download (file)
| - pre-deploy (directory)
|   | 00-slack-notify
|   | 01-nginx-restart
|   | 02-php-fpm
| - post-deploy (directory)
|   | 00-slack-notify
|   | 01-nginx-restart
|   | 02-php-fpm

`