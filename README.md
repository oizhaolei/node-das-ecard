# 一卡通API接口约定API

## Install

```sh
$ npm install --save oizhaolei/node-dashi-ecard
```


## Usage

```js
var Ecard = require('node-dashi-ecard');
var ecard = new Ecard({
  public_key: "_PUBLIC_KEY_",
  iv: "_IV_".split(','),
  url: "_URL_",
});

const data = await ecard.TokenRegister(mobile, password);
// {"RtnCode":0,"RtnInfo":"SUCCESS","data":[{“ToKenHours”:”2”}]}
// {"RtnCode":1,"RtnInfo":"参数格式非法","data":[]}
```

## Test
```sh
export PUBLIC_KEY=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4lgGyIXmGHfbxSkWlG1OrMjKErNS2vq4Q1Ay/o3ne2sxcoITze5sShffHAOFbWK2YGz1c9MJVkw2YPkLGzQbwxkGi+1O5g4MiPAd6GS7GJhalDpip3Qu7arMpOZ6CUaxW8BB/OvaE1U6y7JbPsMlnQnJqSLQySiXq3A8XOzYPEwIDAQAB &&
export IV=117,20,36,64,5,89,7,29 &&
export URL=http://192.168.254.1:8080 &&
export REDIS_URL=redis://:huarui1111@localhost:6379 &&
mocha test/index.js
```

rsync -avz --delete --exclude node_modules/ --exclude .git /works/projects/yida/node-dashi-ecard/ yidalize_no2:/tmp/node-dashi-ecard/

