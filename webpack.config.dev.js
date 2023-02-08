const HtmlWebpackPlugin = require('html-webpack-plugin')//traemoss a el plugin de html
const path = require('path')//llamamos a el modulo path de node,path indica la ruta absoluta donde se van a guardar los cambios resultantes
const MiniCssExtractPlugin=require('mini-css-extract-plugin')//plugin para extraer el css



module.exports = {//el module.export es un objeto especial de nodejs incluido en todas las apps js de node
    entry: './src/index.js',//punto de entrada del proyecto a transformar
    output: {
        path: path.resolve(__dirname, 'dist'),//__dirname obtiene el directorio donde se encuentra el archivo actualmente ejecutado,'dist' carpeta donde se huba el archivo resultante(punto de salida)
        //path.resolve indica la ruta fileSytem/user/Document/proyecto/__dirname/dist (diferente de path.join)
        filename: 'bundle.js',//nombre del archivo donde va a querdar nuestro paquete
        publicPath:'/',//ruta base para todos lo archivos de la apliacion
    },
    resolve: {//extenciones que tiene el proyecto de entrada
        extensions: ['.js', '.jsx'],//extenciones que intentara resolver primero
    },
    mode:'development',
    module: {//esta opcion determina como se transformaran los distintos tipos de modulos dentro del proyecto (impor,export,url(),<img src=''>), https://webpack.js.org/concepts/modules/
        rules: [//este array tiene la configuracion que seguira webpack cuando se encuentre con x archivos
            {
                test: /\.(js|jsx)$/,//los archivos que cumplan con esa extencion van a pasar por el codigo de abajo
                exclude: /node_modules/,//excluimos la carpeta node_modules que tiene los modulos de node
                use: {//indica el loader que va a usar para hacer la transformacion
                    loader: "babel-loader",
                }
            },
            {
                test: /\.html$/,//los archivos .htmml van a seguir las reglas de abajo
                use: [
                    { loader: 'html-loader' }//los html van a pasar por el html-loader  para que webpack pueda interpretar el codigo
                ]
            },
            {
                test:/\.s[ac]ss$/, //detecta los archivos css y sass
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [//plugins
        new HtmlWebpackPlugin({//llamamos a el plugin que declaramos al inicio
            mode:"development",
            template: './public/index.html',//de donde va a sacar el archivo
            filename: './index.html'//este va a ser el resultaod
        }),
        new MiniCssExtractPlugin({//llamamos a el plugin la para transformar css
            filename:'[name].css'//el nombre con el que van a salir los archivos
        }),
    ],
    devServer: {
        static:{

            directory: path.join(__dirname, 'dist'),//indica desde donde tiene que traer los archivos, si traer, no dejar
            //path.join indica la ruta proyecto/dirname/dist (diferente de path.resolve)
        },
        compress: true,//habilitar la configuracion gzip para todo el servidor,envia el sitio comprimido para el usuario final
        port: 3006,//especifica el puerto para escuchar las solicitudes, en este caso los 3006 por que es el puerto para servidodres locales
    }
}
