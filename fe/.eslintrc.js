module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 太烦人了，刚建好的项目保存后就一堆bug，干脆屏蔽了。
    // 'plugin:vue/vue3-essential',
    // '@vue/standard'
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 6,
    sourceType: "module", // sourceType - set to "script" (default) or "module" if your code is in ECMAScript modules.
  },
  rules: {
  }
}
