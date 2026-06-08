import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'

const config = [
{
    input: 'src/index.ts',
    output: [
    { file: 'dist/index.js', format: 'esm' },
    { file: 'dist/index.cjs', format: 'cjs' }
    ],
    plugins: [
        postcss({
            modules: true,
            extract: 'index.css',
            minimize: true,
        }),
        typescript(),
    ],
    external: ['react', 'react/jsx-runtime', 'react-dom']
},
{
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'esm' },
    plugins: [
        postcss({ modules: true }),
        dts(),
    ]
}
]

export default config