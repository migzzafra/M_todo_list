import path from 'node:path';
import { fileURLToPath } from 'node:url';

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 export default {
   entry: {
     app: './src/index.js',
   },
   experiments: {
     html: true,
   },
   output: {
     filename: '[name].bundle.js',
     htmlFilename: 'index.html',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
     html: {
       meta: {
         charset: 'UTF-8',
         viewport: 'width=device-width, initial-scale=1',
       },
       title: 'Production',
     },
   },
   module: {
    rules:[
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
   },
 };