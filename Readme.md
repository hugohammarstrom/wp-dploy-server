# WP-dploy server application

## Install

```
LATEST_RELEASE=$(curl -L -s -H 'Accept: application/json' https://github.com/hugohammarstrom/wp-dploy-server/releases/latest)
LATEST_VERSION=$(echo $(curl -L -s -H 'Accept: application/json' https://github.com/hugohammarstrom/wp-dploy-server/releases/latest) | sed -e 's/.*"tag_name":"\([^"]*\)".*/\1/')

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     ARTIFACT="wp-dploy-server-linux";;
    Darwin*)    ARTIFACT="wp-dploy-server-macos";;
    *)          echo "UNKNOWN:${unameOut}"
esac


ARTIFACT_URL="https://github.com/hugohammarstrom/wp-dploy-server/releases/download/$LATEST_VERSION/$ARTIFACT"
wget $ARTIFACT_URL -O /usr/bin/wp-dploy-server

chmod +x /usr/bin/wp-dploy-server
```

## Related

- [wp-dploy](https://github.com/hugohammarstrom/wp-dploy)
