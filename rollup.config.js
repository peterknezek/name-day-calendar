import sourceMaps from 'rollup-plugin-sourcemaps';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy'
import pluginJson from '@rollup/plugin-json';


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
            dir: packageJson.main,
            name: packageJson.name,
            format: 'cjs',
            sourcemap: true,
        },
        {
            dir: packageJson.module,
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
        pluginJson(),
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
