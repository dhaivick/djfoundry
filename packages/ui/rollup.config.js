import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const config = [
{
    input: 'src/index.ts',
    output: [
    { file: 'dist/index.js', format: 'esm' },
    { file: 'dist/index.cjs', format: 'cjs' }
    ],
    plugins: [typescript()],
    external: ['react', 'react-dom']
},
{
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'esm' },
    plugins: [dts()]
}
]

export default config