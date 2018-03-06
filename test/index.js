const assert = require('assert');
const moment = require('moment');

const Ecard = require('../lib/index.js');
const ecard = new Ecard({
  public_key: process.env.PUBLIC_KEY,
  iv: process.env.IV.split(','),
  url: process.env.URL,
});

describe('module', () => {
//   // 用户注册
//   it('UserRegister', async () => {
//     const MethodName = 'UserRegister';
//     // const PhoneNO = '15841165915';
//     const PhoneNO = '18810981100';
//     // const PhoneNO = '13284117088';

//     const reg = await ecard.fetch({
//       MethodName: 'UserRegister',
//       PhoneNO,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // Token注册
//   it('RegisterSystem', async () => {
//     const MethodName = 'RegisterSystem';
//     const PhoneNO = '18810981100';

//     const reg = await ecard.fetch({
//       MethodName: 'RegisterSystem',
//       PhoneNO,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // 充值
//   it('PutMoney', async () => {
//     const MethodName = 'PutMoney';
//     const PhoneNO = '18810981100';
//     const PutKind = 'APP帐号'; //微信、支付宝、APP帐号
//     const PutValue = '152';

//     const reg = await ecard.fetch({
//       MethodName,
//       PhoneNO,
//       PutKind,
//       PutValue,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // 挂失
//   it('ExecuteCardLoss', async () => {
//     const MethodName = 'ExecuteCardLoss';
//     const PhoneNO = '18810981100';

//     const reg = await ecard.fetch({
//       MethodName,
//       PhoneNO,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // 解挂
//   it('ExecuteCardCancelLoss', async () => {
//     const MethodName = 'ExecuteCardCancelLoss';
//     const PhoneNO = '18810981100';

//     const reg = await ecard.fetch({
//       MethodName,
//       PhoneNO,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // 充值查询
//   it('QueryPutMoneyData', async () => {
//     const MethodName = 'QueryPutMoneyData';
//     const PhoneNO = '18810981100';
//     const BeginTime = '2018-3-1 13:00';
//     const EndTime = '2018-3-1 18:00';

//     const reg = await ecard.fetch({
//       MethodName,
//       PhoneNO,
//       BeginTime,
//       EndTime,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // 消费查询
//   it('QueryXFData', async () => {
//     const MethodName = 'QueryXFData';
//     const PhoneNO = '18810981100';
//     const BeginTime = '2018-2-27 13:00';
//     const EndTime = '2018-2-27 15:00';

//     const reg = await ecard.fetch({
//       MethodName,
//       PhoneNO,
//       BeginTime,
//       EndTime,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // 记录查询（挂失，解挂，补卡）
//   it('QueryCardLossData', async () => {
//     const MethodName = 'QueryCardLossData';
//     const PhoneNO = '18810981100';
//     const BeginTime = '2018-2-27 13:00';
//     const EndTime = '2018-3-1 18:00';

//     const reg = await ecard.fetch({
//       MethodName,
//       PhoneNO,
//       BeginTime,
//       EndTime,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // 一卡通余额查询
//   it('QueryCardMoney', async () => {
//     const MethodName = 'QueryCardMoney';
//     const PhoneNO = '18810981100';

//     const reg = await ecard.fetch({
//       MethodName,
//       PhoneNO,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // 二维码开门
//   it('GetQrCode', async () => {
//     const MethodName = 'GetQrCode';
//     const PhoneNO = '18810981100';
//     const QrcodeType = '0';    //二维码类型 0 员工 1访客

//     const reg = await ecard.fetch({
//       MethodName,
//       QrcodeType,
//       PhoneNO,
//     });
//     console.log('reg', reg);
//   });
// });

// describe('module', () => {
//   // 访客邀请
//   it('GetInviteData', async () => {
//     const MethodName = 'GetInviteData';
//     const PhoneNO = '18810981100';
//     const VstName = '小王';
//     const VstPhone = '13915468546';
//     const VstIDNo = '210202154684684548';
//     const VstBeginTime = '2018-2-27 13:00';
//     const VstHour = '3';
//     const RsnDesc = '商务访谈';
//     const VstRegion = '0';

//     const reg = await ecard.fetch({
//       MethodName,
//       PhoneNO,
//       VstName,
//       VstPhone,
//       VstIDNo,
//       VstBeginTime,
//       VstHour,
//       RsnDesc,
//       VstRegion,
//     });
//     console.log('reg', reg);
//   });
// });

//  个人资料查询
  it('GetPersonalInfo', async () => {
    const MethodName = 'GetPersonalInfo';
    const PhoneNO = '18810981100';

    const reg = await ecard.fetch({
      MethodName,
      PhoneNO,
    });
    console.log('reg', reg);
  });
});
