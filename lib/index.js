// 开放平台API
const redis = require('promise-redis')();
const JSEncrypt = require('node-jsencrypt');
const request = require('request-promise');
const md5 = require('md5');

const redisClient = redis.createClient(process.env.REDIS_URL);

const des = require('./des');
//
module.exports = class Ecard {
  constructor(conf) {
    this.conf = conf;
  }
  //生成guid,用于制作token
  guid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
  }
  //生成新token
  async getNewToken(PhoneNO) {
    const tokenstr = this.guid();
    const token = tokenstr.substr(2, 24);
    const date = new Date();
    const datelong = date.getTime();
    await redisClient.setex(`ecard_Token${PhoneNO}`, 2 * 60 * 60, token);
    return token;
  }
  //获取token
  async getToken(PhoneNO) {
    const key = `ecard_Token${PhoneNO}`;
    let token = await redisClient.get(key);
    if (token) {
      console.log(`${key}:旧Token：${token}`);
    } else {
      token = await this.getNewToken(PhoneNO);
      console.log(`${key}:新Token：${token}`);
      //注册到系统

      // Token注册 用户注册的时候不需要
      const MethodName = 'RegisterSystem';
      const reg = await this.fetch({
        MethodName,
        PhoneNO,
      });
      console.log('Token注册', reg);
      if (reg.RtnCode !== 0) {
        throw new Error(reg.RtnInfo);
      }
    }
    return token;
  }
  //RSA加密
  //参数 token 加密原文
  //返回值  返回加密密文
  RSAEncrypt(token, public_key) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
    const tokenRsa = encrypt.encrypt(token);
    return tokenRsa;
  }

  //参数签名方法
  //参数1 json json格式数组
  //参数2 token
  //返回值 签名后字符串
  sign(json, token) {
    let signStr = '';
    const arr = [];
    for (var key in json) {
      arr.push(key);
    }
    arr.sort((a, b) => (`${a}`).localeCompare(`${b}`));
    for (var key in arr) {
      const value = json[arr[key]];
      if (value === '') {
        continue;
      }
      signStr += `${arr[key]}=${value}&`;
    }
    signStr += `key=${token}`;
    const sign = md5(signStr).toUpperCase();
    return sign;
  }

  getTimeStr() {
    const TimeStamp = new Date().getTime();
    const TimeStr = `${parseInt(TimeStamp / 1000)}`;
    return TimeStr;
  }

  async fetch(json) {
    const token = await this.getToken(json.PhoneNO);
    const tokenRsa = this.RSAEncrypt(token, this.conf.public_key);
    if (json.EmpPWD || json.EmpPWD === '') {
      const encrypt = await des.encrypt(token, json.EmpPWD, this.conf.iv);
      json.EmpPWD = encrypt;
    }

    const body = {
      ...json,
      TimeStamp: this.getTimeStr(),
    };

    //用户注册、token注册
    if (json.MethodName == 'RegisterSystem' || json.MethodName == 'UserRegister') {
      body.Token = tokenRsa;
    }

    body.SignString = this.sign(body, token);

    console.log('body', JSON.stringify(body));
    const options = {
      method: 'POST',
      uri: `${this.conf.url}/SvrCardInfo.ashx?MethodName=${json.MethodName}`,
      body,
      json: true, // Automatically stringifies the body to JSON
    };
    const data = await request(options);
    console.log(options, data);
    if (data.RtnCode !== 0) {
      await redisClient.del(`ecard_Token${json.PhoneNO}`);
    }
    return data;
  }
};
