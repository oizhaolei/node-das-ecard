const redis = require('promise-redis')();
const JSEncrypt = require('node-jsencrypt');
const request = require('request-promise');
const md5 = require('md5');

const DES3 = require('./des');
const redisClient = redis.createClient(process.env.REDIS_URL);
/**
 *
 *
 *
 **/
//生成guid,用于制作token
const guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
};
//生成新token
const getNewToken = async () => {
  const tokenstr = guid();
  const token = tokenstr.substr(2, 24);
  const date = new Date();
  const datelong = date.getTime();
  await redisClient.setex('ecard_Token', 2 * 60 * 60, token);
  console.log(`获取新Token：${token}`);
  return token;
};
//获取token
const getToken = async () => {
  let token = await redisClient.get('ecard_Token');
  if (token) {
    console.log(`获取旧Token：${token}`);
  } else {
    token = await getNewToken();
    console.log(`获取新Token：${token}`);
    //注册到系统
  }
  return token;
};
exports.getToken = getToken;
//RSA加密
//参数 token 加密原文
//返回值  返回加密密文
const RSAEncrypt = (token, public_key) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(public_key);
  const tokenRsa = encrypt.encrypt(token);
  return tokenRsa;
};
exports.RSAEncrypt = RSAEncrypt;

//参数签名方法
//参数1 json json格式数组
//参数2 token
//返回值 签名后字符串
const sign = function (json, token) {
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
  console.log(signStr);
  const sign = md5(signStr).toUpperCase();
  return sign;
};
exports.sign = sign;

const getTimeStr = function () {
  const TimeStamp = new Date().getTime();
  const TimeStr = `${parseInt(TimeStamp / 1000)}`;
  console.log(TimeStamp, TimeStr);
  return TimeStr;
};
exports.getTimeStr = getTimeStr;
