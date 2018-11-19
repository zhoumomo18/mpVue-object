// import Vue from 'vue'
// import VeeValidate, { Validator} from 'vee-validate'
// import zh from 'vee-validate/dist/locale/zh_CN' // 引入中文文件

// // 配置中文
// Validator.addLocale(zh)

// const config = {
//   locale: 'zh_CN'
// }

// Vue.use(VeeValidate, config)

// // 自定义validate  attributes就是 field
// const dictionary = {
//   zh_CN: {
//     messages: {
//       email: () => '请输入正确的邮箱格式',
//       required: (field) => '请输入' + field
//     },
//     attributes: {
//       email: '邮箱',
//       password: '密码',
//       name: '账号',
//       mobile: '手机',
//       length11: '长度'
//     }
//   }
// }

// Validator.updateDictionary(dictionary)

// Validator.extend('mobile', {
//   messages: {
//     zh_CN: field => field + '必须是11位手机号码'
//   },
//   validate: value => {
//     return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
//   }
// })

// Validator.extend('length11', {
//   messages: {
//     zh_CN: field => field + '必须是11位'
//   },
//   validate: value => {
//     return value.length === 11
//   }
// })

export default class Validate {
  static phone (value) {
    return value.length === 11 && /(^(?:(?:13[0-9]|147|15[0-9]|18[0-9]|17[0-9]|19[0-9])-?\d{5}(\d{3}|\*{3})$)|(?:0(?:10|2[0-57-9]|[3-9]\d{2})\d{7,8})$)/.test(value)
  }
  static pwd (value) {
    return /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value)
  }
  static equalTo (value, value2) {
    return value2 && value === value2
  }
  static minlength (value, param) {
    return value && value.length >= param
  }
  static isNum (value) {
    return /^\d{n,}$/.test(value)
  }
  static rangelength (value, n1, n2) {
    return value && (value.length >= n1 && value.length <= n2)
  }
}
