/**
 * COS 是腾讯云提供的对象存储服务
 * cos-js-sdk-v5 是其前端调用的 api
 * 文档 https://cloud.tencent.com/document/product/436/11459
 * 目前采用 固定密钥方式，不太安全，后续考虑替换成后端授权
 */

 import COS from 'cos-js-sdk-v5';

 // SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
 export const cos = new COS({
  // 填入密钥
 });