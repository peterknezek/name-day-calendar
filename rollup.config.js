import sourceMaps from 'rollup-plugin-sourcemaps';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy'


import packageJson from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
    external: [
         ...Object.keys(packageJson.peerDependencies || {}),
         ...Object.keys(packageJson.dependencies || {})
    ],
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            name: packageJson.name,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            name: packageJson.name,
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        nodeResolve({
          mainFields: ['main', 'jsnext:main'],
          extensions,
        }),
        commonjs(),
        babel({
          extensions,
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
        }),
        copy({
          targets: [
            { src: 'fonts', dest: 'dist' },
          ]
        }),
        sourceMaps(),
        terser(),
      ],
      watch: {
        include: 'src/**',
      },
};
