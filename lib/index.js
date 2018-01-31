// 开放平台API

const request = require('request-promise');
const utils = require('./utils');
const des = require('./des');
//
module.exports = class Ecard {
  constructor(conf) {
    this.conf = conf;
  }

  async fetch(func, json) {
    const token = await utils.getToken();
    const tokenRsa = utils.RSAEncrypt(token, this.conf.public_key);
    if (json.EmpPWD || json.EmpPWD === '') {
      const encrypt = await des.encrypt(token, json.EmpPWD, this.conf.iv);
      json.EmpPWD = encrypt;
    }

    const body = {
      ...json,
      Token: tokenRsa,
      TimeStamp: utils.getTimeStr(),
    };

    body.SignString = utils.sign(body, token);

    console.log('body', JSON.stringify(body));
    const options = {
      method: 'POST',
      uri: `${this.conf.url}/SvrCardInfo.ashx?MethodName=${func}`,
      body,
      json: true // Automatically stringifies the body to JSON
    };
    const data = await request(options);
    console.log(options, data);
    return data;
  }
};
