const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

// 경로 접근 방법 2가지 1. resolve 2. join

const ENTRY_FILE = path.resolve(__dirname, "./assets/js/main.js");
const OUTPUT_DIR = path.join(__dirname, "./static");

const config = {
  // Load File
  entry: ["@babel/polyfill", ENTRY_FILE],

  // Module
  module: {
    rules: [
      {
        // 정규식 .js file 찾기
        test: /\.(js)$/,
        use: [
          {
            // This allows webpack to understand babel
            loader: "babel-loader"
          }
        ]
      },
      {
        // 정규식 파일 구분하기
        test: /\.(scss)$/,

        // 위에 파일들을 아래에 적용 해독 순서 아래서 위로
        use: ExtractCSS.extract([
          {
            // 3. This allows webpack to understand CSS
            loader: "css-loader"
          },
          {
            // 2. CSS => Compatibility CSS
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            // 1. SCSS => CSS
            loader: "sass-loader"
          }
        ])
      }
    ]
  },

  // Out Put File Options
  output: {
    // File Out Path
    path: OUTPUT_DIR,
    // Save File Name
    filename: "[name].js"
  },
  // CSS file로 만들어 줌
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
