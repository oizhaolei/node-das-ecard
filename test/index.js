const assert = require('assert');
const moment = require('moment');

const Ecard = require('../lib/index.js');
const ecard = new Ecard({
  public_key: process.env.PUBLIC_KEY,
  iv: process.env.IV.split(','),
  url: process.env.URL,
});

describe('module', () => {
  // Token值注册
  it('RegisterSystem', async () => {
    const PhoneNO = '13601007397';
    const EmpPWD = '';

    const reg = await ecard.fetch('RegisterSystem', {
      PhoneNO,
      EmpPWD,
    });
    console.log('reg', reg);
  });
});
