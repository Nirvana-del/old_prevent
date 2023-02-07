// 电话号码正则
export const PHONE_NUMBER_RULE = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
// 密码正则
export const PASSWORD_RULE = /^[a-zA-Z]\w{5,17}$/; // 密码必须以字母开头，只能输入 6-18 个字母、数字、下划线
// 用户名正则
export const USER_NAME_RULE = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,6}$/; // 用户名为2~6个英文，数字，下划线，中文
// 姓名正则
export const NAME_RULE = /^[\u4e00-\u9fa5]{2,4}$/ // 姓名为 2~4 个汉字