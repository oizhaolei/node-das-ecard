const assert = require('assert');
const moment = require('moment');

const Ecard = require('../lib/index.js');
const ecard = new Ecard({
  public_key: process.env.PUBLIC_KEY,
  iv: process.env.IV.split(','),
  url: process.env.URL,
});

describe('module', () => {
  // 用户注册
  it('UserRegister', async () => {
    const MethodName = 'UserRegister';
    const PhoneNO = '18810981100';

    const reg = await ecard.fetch({
      MethodName: 'UserRegister',
      PhoneNO,
    });
    console.log('reg', reg);
  });
  // Token值注册
  /* it('RegisterSystem', async () => {
   *   const PhoneNO = '18810981100';

   *   const reg = await ecard.fetch('RegisterSystem', {
   *     PhoneNO,
   *   });
   *   console.log('reg', reg);
   *   return;
   * });*/
});
