# 一卡通API接口约定API

## Install

```sh
$ npm install --save oizhaolei/node-das-ecard
```


## Usage
```js
var Ecard = require('node-das-ecard');
var ecard = new Ecard({
  public_key: "_PUBLIC_KEY_",
  iv: "_IV_".split(','),
  url: "_URL_",
});

const data = await ecard.fetch('func', {
    params,
});
// {"RtnCode":0,"RtnInfo":"SUCCESS","data":[{“ToKenHours”:”2”}]}
// {"RtnCode":1,"RtnInfo":"参数格式非法","data":[]}
```

## Test
```sh
npm install
export PUBLIC_KEY=DUMMY_PUBLIC_KEY_QEBAQUAAAAAAAAAAAAAAAAlgGyIXmGHfbxSkWlG1OrMjKErNS2vq4Q1Ay/o3ne2sxcoITze5sShffHAOFbWK2YGz1c9MJVkw2YPkLGzQbwxkGi+1O5g4MiPAd6GS7GJhalDpip3Qu7arMpOZ6CUaxW8BB/OvaE1U6y7JbPsMlnQnJqSLQySiXq3A8XOzYPEwIDAQAB &&
    export IV=1,2,3,4,5,6,7,8 &&
    export URL=http://192.168.24.1:80 &&
    export REDIS_URL=redis://localhost:6379
mocha test/index.js
```

rsync -avz --delete --exclude node_modules/ --exclude .git /works/projects/yida/node-das-ecard/ yidalize_no2:/tmp/node-das-ecard/
