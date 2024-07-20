import type {Config} from 'tailwindcss'


export default <Partial<Config>>{
    // 安全列表
    safelist: [

    ],
    theme: {
        extend: {
            aspectRatio: {
                '4/3': '4 / 3',
                '1/1': '1 / 1'
            }
        }
    },
    darkMode: 'class'
}