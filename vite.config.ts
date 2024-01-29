import { defineConfig } from 'vite';
import path, { resolve } from "path";
import reactRefresh from '@vitejs/plugin-react-refresh';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
function _resolve(dir: string) {
    return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log('command',command)
    console.log('mode',mode)
    return {
        plugins: [reactRefresh(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/images')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]'
        })],
        
        build: {
            minify: false,
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            outDir: _resolve("dist"),
            rollupOptions: {
                output: {
                    entryFileNames: `js/[name]-[hash].js`,
                    chunkFileNames: `js/[name]-[hash].js`,
                    assetFileNames: `[ext]/[name]-[hash].[ext]`
                },
            },
        },
        base: './', // 打包路径
        server: {
            host: '0.0.0.0',
            port: 4001, // 端口号
            open: true, // 是否自动打开浏览器
            cors: true, // 允许跨域
            // hmr: false,
        },
        resolve: {
            alias: {
                '@': resolve('./src')
            },
        },
       /*  css:{
            preprocessorOptions:{
                scss: {
                    additionalData: '@import "@/assets/scss/common.scss";' // 全局公共样式
                    // additionalData: '@use "@/assets/scss/global.scss" as *;'
                 }
            }
        } */
    };
});

