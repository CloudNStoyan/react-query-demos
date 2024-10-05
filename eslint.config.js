import path from 'path';
import { fileURLToPath } from 'url';

import noDestructuringArraysAsObjects from '@arabasta/eslint-plugin-no-destructuring-arrays-as-objects';
import noTestingLibraryWithoutCleanup from '@arabasta/eslint-plugin-no-testing-library-without-cleanup';
import reportCaughtError from '@arabasta/eslint-plugin-report-caught-error';
import requireUseeffectDependencyArray from '@arabasta/eslint-plugin-require-useeffect-dependency-array';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import pluginQuery from '@tanstack/eslint-plugin-query'
import confusingBrowserGlobals from 'confusing-browser-globals';
import prettier from 'eslint-config-prettier';
import deprecation from 'eslint-plugin-deprecation';
import es from 'eslint-plugin-es';
import importlint from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import newWithError from 'eslint-plugin-new-with-error';
import reactLint from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

// The tseslint.config function is a variadic identity function which is a fancy way of saying
// that it's a function with a spread argument that accepts any number flat config objects
// and returns the objects unchanged. It exists as a way to quickly and easily provide
// types for your flat config file without the need for JSDoc type comments.
export default tseslint.config(
  eslint.configs.recommended,
  requireUseeffectDependencyArray.configs.recommended,
  reportCaughtError.configs.recommended,
  noTestingLibraryWithoutCleanup.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:react-hooks/recommended'),
  eslintComments.recommended,
  ...compat.extends('plugin:import/errors'),
  prettier,
  {
    plugins: {
      import: importlint,
      'jsx-a11y': jsxA11y,
      react: reactLint,
    },
    rules: {
      'accessor-pairs': 'off',
      'array-callback-return': ['error', { allowImplicit: true }],
      'block-scoped-var': 'error',
      complexity: 'off',
      'consistent-return': 'error',
      'default-case': ['error', { commentPattern: '^no default$' }],
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': ['error', { allowKeywords: true }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'grouped-accessor-pairs': 'error',
      'guard-for-in': 'error',
      'no-alert': 'warn',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-constructor-return': 'error',
      'no-div-regex': 'off',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],
      'no-empty-pattern': 'error',
      'no-empty-static-block': 'error',
      'no-eq-null': 'off',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-fallthrough': 'error',
      'no-global-assign': ['error', { exceptions: [] }],
      'no-native-reassign': 'off',
      'no-implicit-coercion': 'off',
      'no-implicit-globals': 'off',
      'no-implied-eval': 'error',
      'no-invalid-this': 'off',
      'no-iterator': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-magic-numbers': 'off',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'off',
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-restricted-properties': [
        'error',
        {
          object: 'arguments',
          property: 'callee',
          message: 'arguments.callee is deprecated',
        },
        {
          object: 'global',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead',
        },
        {
          object: 'self',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead',
        },
        {
          object: 'window',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead',
        },
        {
          object: 'global',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead',
        },
        {
          object: 'self',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead',
        },
        {
          object: 'window',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead',
        },
        {
          property: '__defineGetter__',
          message: 'Please use Object.defineProperty instead.',
        },
        {
          property: '__defineSetter__',
          message: 'Please use Object.defineProperty instead.',
        },
        {
          object: 'Math',
          property: 'pow',
          message: 'Use the exponentiation operator (**) instead.',
        },
      ],
      'no-return-assign': ['error', 'always'],
      'no-script-url': 'error',
      'no-self-assign': [
        'error',
        {
          props: true,
        },
      ],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'off',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
          allowTernary: false,
          allowTaggedTemplates: false,
        },
      ],
      'no-unused-labels': 'error',
      'no-useless-call': 'off',
      'no-useless-catch': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-warning-comments': 'off',
      'no-with': 'error',
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
      'prefer-named-capture-group': 'off',
      'prefer-regex-literals': [
        'error',
        {
          disallowRedundantWrapping: true,
        },
      ],
      radix: 'error',
      'require-await': 'off',
      'require-unicode-regexp': 'off',
      'vars-on-top': 'error',
      yoda: 'error',
      'for-direction': 'error',
      'getter-return': ['error', { allowImplicit: true }],
      'no-async-promise-executor': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-constant-binary-expression': 'error',
      'no-constant-condition': 'warn',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-parens': 'off',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-obj-calls': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-promise-executor-return': 'error',
      'no-prototype-builtins': 'error',
      'no-regex-spaces': 'error',
      'no-setter-return': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-unreachable': 'error',
      'no-unreachable-loop': [
        'error',
        {
          ignore: [],
        },
      ],
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': [
        'error',
        { disallowArithmeticOperators: true },
      ],
      'no-unused-private-class-members': 'off',
      'no-useless-backreference': 'error',
      'no-negated-in-lhs': 'off',
      'require-atomic-updates': 'off',
      'use-isnan': 'error',
      'valid-jsdoc': 'off',
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'callback-return': 'off',
      'global-require': 'error',
      'handle-callback-err': 'off',
      'no-buffer-constructor': 'error',
      'no-mixed-requires': 'off',
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'no-process-env': 'off',
      'no-process-exit': 'off',
      'no-restricted-modules': 'off',
      'no-sync': 'off',
      'array-bracket-newline': 'off',
      'array-element-newline': 'off',
      camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
      'capitalized-comments': 'off',
      'consistent-this': 'off',
      'func-name-matching': 'off',
      'func-names': 'warn',
      'func-style': 'off',
      'id-denylist': 'off',
      'id-length': 'off',
      'id-match': 'off',
      'line-comment-position': 'off',
      'lines-between-class-members': 'off',
      'lines-around-comment': 'off',
      'lines-around-directive': [
        'error',
        {
          before: 'always',
          after: 'always',
        },
      ],
      'max-depth': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
      'max-params': 'off',
      'max-statements': 'off',
      'max-statements-per-line': 'off',
      'multiline-comment-style': 'off',
      'multiline-ternary': 'off',
      'new-cap': [
        'error',
        {
          newIsCap: true,
          newIsCapExceptions: [],
          capIsNew: false,
          capIsNewExceptions: [
            'Immutable.Map',
            'Immutable.Set',
            'Immutable.List',
          ],
        },
      ],
      'newline-after-var': 'off',
      'newline-before-return': 'off',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-continue': 'error',
      'no-inline-comments': 'off',
      'no-lonely-if': 'error',
      'no-multi-assign': ['error'],
      'no-negated-condition': 'off',
      'no-nested-ternary': 'error',
      'no-new-object': 'error',
      'no-plusplus': 'error',
      'no-spaced-func': 'off',
      'no-ternary': 'off',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'always'],
      'padding-line-between-statements': 'off',
      'prefer-exponentiation-operator': 'error',
      'prefer-object-spread': 'error',
      'require-jsdoc': 'off',
      'sort-keys': 'off',
      'sort-vars': 'off',
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            exceptions: ['-', '+'],
            markers: ['=', '!', '/'], // space here to support sprockets directives, slash for TS /// comments
          },
          block: {
            exceptions: ['-', '+'],
            markers: ['=', '!', ':', '::'], // space here to support sprockets directives and flow comment types
            balanced: true,
          },
        },
      ],
      'unicode-bom': ['error', 'never'],
      'wrap-regex': 'off',
      'init-declarations': 'off',
      'no-catch-shadow': 'off',
      'no-delete-var': 'error',
      'no-label-var': 'error',
      // TODO: Update this
      // https://github.com/airbnb/javascript/commit/11ab37144b7f846f04f64a29b5beb6e00d74e84b
      'no-restricted-globals': [
        'error',
        {
          name: 'isFinite',
          message:
            'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
        },
        {
          name: 'isNaN',
          message:
            'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
        },
      ].concat(confusingBrowserGlobals),
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-undef': 'error',
      'no-undef-init': 'error',
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
      'no-use-before-define': [
        'error',
        { functions: true, classes: true, variables: true },
      ],
      'arrow-body-style': [
        'error',
        'as-needed',
        {
          requireReturnForObjectLiteral: false,
        },
      ],
      'constructor-super': 'error',
      'no-class-assign': 'error',
      'no-const-assign': 'error',
      'no-dupe-class-members': 'error',
      'no-duplicate-imports': 'off',
      'no-new-symbol': 'error',
      'no-restricted-exports': [
        'error',
        {
          restrictedNamedExports: [
            'default', // use `export default` to provide a default export
            'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
          ],
        },
      ],
      'no-this-before-super': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': [
        'error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        },
      ],
      'no-var': ['error'],
      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true,
        },
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'prefer-numeric-literals': 'error',
      'prefer-reflect': 'off',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'require-yield': 'error',
      'symbol-description': 'error',
      'import/named': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'test/**', // tape, common npm pattern
            'tests/**', // also common npm pattern
            'spec/**', // mocha, rspec-like pattern
            '**/__tests__/**', // jest pattern
            '**/__mocks__/**', // jest pattern
            'test.{js,jsx}', // repos with a single test file
            'test-*.{js,jsx}', // repos with multiple top-level test files
            '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
            '**/jest.config.js', // jest config
            '**/jest.setup.js', // jest setup
            '**/vue.config.js', // vue-cli config
            '**/webpack.config.js', // webpack config
            '**/webpack.config.*.js', // webpack config
            '**/rollup.config.js', // rollup config
            '**/rollup.config.*.js', // rollup config
            '**/gulpfile.js', // gulp config
            '**/gulpfile.*.js', // gulp config
            '**/Gruntfile{,.js}', // grunt config
            '**/protractor.conf.js', // protractor config
            '**/protractor.conf.*.js', // protractor config
            '**/karma.conf.js', // karma config
            '**/.eslintrc.js', // eslint config
          ],
          optionalDependencies: false,
        },
      ],
      'import/no-mutable-exports': 'error',
      'import/no-amd': 'error',
      'import/first': 'error',
      'import/imports-first': 'off',
      'import/no-namespace': 'off',
      'import/newline-after-import': 'error',
      'import/max-dependencies': 'off',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-internal-modules': 'off',
      'import/unambiguous': 'off',
      // TODO: Webpack specific rule
      'import/no-webpack-loader-syntax': 'error',
      'import/no-unassigned-import': 'off',
      'import/no-named-default': 'error',
      'import/no-anonymous-default-export': 'off',
      'import/exports-last': 'off',
      'import/group-exports': 'off',
      'import/no-named-export': 'off',
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: '∞' }],
      'import/no-useless-path-segments': ['error', { commonjs: true }],
      'import/dynamic-import-chunkname': 'off',
      'import/no-relative-parent-imports': 'off',
      'import/no-unused-modules': 'off',
      'import/no-import-module-exports': [
        'error',
        {
          exceptions: [],
        },
      ],
      'import/no-relative-packages': 'error',
      strict: ['error', 'never'],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: true,
        },
      ],
      'class-methods-use-this': [
        'error',
        {
          exceptMethods: [
            'render',
            'getInitialState',
            'getDefaultProps',
            'getChildContext',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
            'componentDidCatch',
            'getSnapshotBeforeUpdate',
          ],
        },
      ],
      'react/display-name': 'off',
      'react/forbid-prop-types': [
        'error',
        {
          forbid: ['any', 'array', 'object'],
          checkContextTypes: true,
          checkChildContextTypes: true,
        },
      ],
      'react/forbid-dom-props': 'off',
      'react/jsx-boolean-value': ['error', 'never', { always: [] }],
      'react/jsx-handler-names': 'off',
      'react/jsx-key': 'off',
      'react/jsx-no-bind': [
        'error',
        {
          ignoreRefs: true,
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
          ignoreDOMComponents: true,
        },
      ],
      'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
      'react/jsx-no-literals': 'off',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': [
        'error',
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],
      'react/sort-prop-types': 'off',
      'react/jsx-sort-prop-types': 'off',
      'react/jsx-sort-props': 'off',
      'react/jsx-sort-default-props': 'off',
      'react/jsx-uses-react': ['error'],
      'react/jsx-uses-vars': 'error',
      'react/no-danger': 'warn',
      'react/no-deprecated': ['error'],
      'react/no-did-mount-set-state': 'off',
      'react/no-did-update-set-state': 'error',
      'react/no-will-update-set-state': 'error',
      'react/no-direct-mutation-state': 'off',
      'react/no-is-mounted': 'error',
      'react/no-multi-comp': 'off',
      'react/no-set-state': 'off',
      'react/no-string-refs': 'error',
      'react/no-unknown-property': 'error',
      'react/prefer-es6-class': ['error', 'always'],
      'react/prefer-stateless-function': [
        'error',
        { ignorePureComponents: true },
      ],
      'react/prop-types': [
        'error',
        {
          ignore: [],
          customValidators: [],
          skipUndeclared: false,
        },
      ],
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      'react/sort-comp': [
        'error',
        {
          order: [
            'static-variables',
            'static-methods',
            'instance-variables',
            'lifecycle',
            '/^handle.+$/',
            '/^on.+$/',
            'getters',
            'setters',
            '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
            'instance-methods',
            'everything-else',
            'rendering',
          ],
          groups: {
            lifecycle: [
              'displayName',
              'propTypes',
              'contextTypes',
              'childContextTypes',
              'mixins',
              'statics',
              'defaultProps',
              'constructor',
              'getDefaultProps',
              'getInitialState',
              'state',
              'getChildContext',
              'getDerivedStateFromProps',
              'componentWillMount',
              'UNSAFE_componentWillMount',
              'componentDidMount',
              'componentWillReceiveProps',
              'UNSAFE_componentWillReceiveProps',
              'shouldComponentUpdate',
              'componentWillUpdate',
              'UNSAFE_componentWillUpdate',
              'getSnapshotBeforeUpdate',
              'componentDidUpdate',
              'componentDidCatch',
              'componentWillUnmount',
            ],
            rendering: ['/^render.+$/', 'render'],
          },
        },
      ],
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
      'react/jsx-no-comment-textnodes': 'error',
      'react/no-render-return-value': 'error',
      'react/require-optimization': 'off',
      'react/no-find-dom-node': 'error',
      'react/forbid-component-props': 'off',
      'react/forbid-elements': 'off',
      'react/no-danger-with-children': 'error',
      'react/no-unused-prop-types': [
        'error',
        {
          customValidators: [],
          skipShapeProps: true,
        },
      ],
      'react/style-prop-object': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-children-prop': 'error',
      'react/jsx-space-before-closing': 'off',
      'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
      'react/void-dom-elements-no-children': 'error',
      'react/default-props-match-prop-types': [
        'error',
        { allowRequiredDefaults: false },
      ],
      'react/no-redundant-should-component-update': 'error',
      'react/no-unused-state': 'error',
      'react/boolean-prop-naming': 'off',
      'react/no-typos': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/destructuring-assignment': ['error', 'always'],
      'react/no-access-state-in-setstate': 'error',
      'react/button-has-type': [
        'error',
        {
          button: true,
          submit: true,
          reset: false,
        },
      ],
      'react/jsx-child-element-spacing': 'off',
      'react/no-this-in-sfc': 'error',
      'react/jsx-max-depth': 'off',
      'react/no-unsafe': 'off',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/state-in-constructor': ['error', 'always'],
      'react/static-property-placement': ['error', 'property assignment'],
      'react/prefer-read-only-props': 'off',
      'react/jsx-no-script-url': [
        'error',
        [
          {
            name: 'Link',
            props: ['to'],
          },
        ],
      ],
      'react/jsx-no-useless-fragment': 'error',
      'react/no-adjacent-inline-elements': 'off',
      'react/jsx-newline': 'off',
      'react/jsx-no-constructed-context-values': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/no-namespace': 'error',
      'react/prefer-exact-props': 'error',
      'react/no-arrow-function-lifecycle': 'error',
      'react/no-invalid-html-attribute': 'error',
      'react/no-unused-class-component-methods': 'error',
      'jsx-a11y/accessible-emoji': 'off',
      'jsx-a11y/alt-text': [
        'error',
        {
          elements: ['img', 'object', 'area', 'input[type="image"]'],
          img: [],
          object: [],
          area: [],
          'input[type="image"]': [],
        },
      ],
      'jsx-a11y/anchor-has-content': ['error', { components: [] }],
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': ['error', { ignoreNonDOM: false }],
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/autocomplete-valid': 'off',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/control-has-associated-label': [
        'error',
        {
          labelAttributes: ['label'],
          controlComponents: [],
          ignoreElements: [
            'audio',
            'canvas',
            'embed',
            'input',
            'textarea',
            'tr',
            'video',
          ],
          ignoreRoles: [
            'grid',
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'row',
            'tablist',
            'toolbar',
            'tree',
            'treegrid',
          ],
          depth: 5,
        },
      ],
      'jsx-a11y/heading-has-content': ['error', { components: [''] }],
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: [],
          labelAttributes: [],
          controlComponents: [],
          assert: 'both',
          depth: 25,
        },
      ],
      'jsx-a11y/lang': 'error',
      'jsx-a11y/media-has-caption': [
        'error',
        {
          audio: [],
          video: [],
          track: [],
        },
      ],
      'jsx-a11y/mouse-events-have-key-events': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],
      'jsx-a11y/no-distracting-elements': [
        'error',
        {
          elements: ['marquee', 'blink'],
        },
      ],
      'jsx-a11y/no-interactive-element-to-noninteractive-role': [
        'error',
        {
          tr: ['none', 'presentation'],
        },
      ],
      'jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        {
          handlers: [
            'onClick',
            'onMouseDown',
            'onMouseUp',
            'onKeyPress',
            'onKeyDown',
            'onKeyUp',
          ],
        },
      ],
      'jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        {
          ul: [
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'tablist',
            'tree',
            'treegrid',
          ],
          ol: [
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'tablist',
            'tree',
            'treegrid',
          ],
          li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
          table: ['grid'],
          td: ['gridcell'],
        },
      ],
      'jsx-a11y/no-noninteractive-tabindex': [
        'error',
        {
          tags: [],
          roles: ['tabpanel'],
        },
      ],
      'jsx-a11y/no-onchange': 'off',
      'jsx-a11y/no-redundant-roles': ['error'],
      'jsx-a11y/no-static-element-interactions': [
        'error',
        {
          handlers: [
            'onClick',
            'onMouseDown',
            'onMouseUp',
            'onKeyPress',
            'onKeyDown',
            'onKeyUp',
          ],
        },
      ],
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',
      'jsx-a11y/label-has-for': 'off',
    },
  },
  {
    // This configuration object matches all files that other configuration objects
    // match, because config objects that don’t specify files or ignores apply to
    // all files that have been matched by any other configuration object.
    // https://eslint.org/docs/latest/use/configure/configuration-files#:~:text=You%20can%20use,default.%20For%20example%3A
    name: 'All files',
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.json'],
        },
      },
      'import/extensions': ['.js', '.mjs', '.jsx'],
      'import/core-modules': [],
      'import/ignore': [
        'node_modules',
        '\\.(coffee|scss|css|less|hbs|svg|json)$',
      ],
      react: {
        pragma: 'React',
        version: 'detect',
      },
      propWrapperFunctions: ['forbidExtraProps', 'exact', 'Object.freeze'],
      'import/internal-regex': '^(~|src)',
    },
    languageOptions: {
      globals: {
        ...globals.es2015,
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        generators: true,
        ecmaFeatures: {
          jsx: true,
          globalReturn: true,
          generators: false,
          objectLiteralDuplicateProperties: false,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      'react-refresh': reactRefresh,
      react: reactLint,
      'unused-imports': unusedImports,
      'new-with-error': newWithError,
      es,
    },
    rules: {
      'no-void': 'off',
      'no-undefined': 'off',
      // TODO: Formatting rule
      'linebreak-style': ['error', 'unix'],
      'no-console': 'error',
      'no-func-assign': 'error',
      'no-await-in-loop': 'off',
      'max-classes-per-file': 'off',
      'no-return-await': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          selector: 'LabeledStatement',
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector: 'WithStatement',
          message:
            '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],
      'new-with-error/new-with-error': 'error',
      'unused-imports/no-unused-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Usage of relative parent imports is not allowed.',
            },
          ],
        },
      ],
      'import/prefer-default-export': 'off',
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
          pattern: {
            js: 'never',
            jsx: 'never',
          },
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            ['external'],
            'internal',
            ['sibling', 'parent', 'index'],
            'unknown',
            'object',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '~/**',
              group: 'internal',
            },
            {
              pattern: 'src/**',
              group: 'internal',
            },
            {
              pattern: '**/*.+(css|scss)',
              patternOptions: { dot: true, nocomment: true },
              group: 'unknown',
              position: 'after',
            },
            {
              pattern: '{.,..}/**/*.+(css|scss)',
              patternOptions: { dot: true, nocomment: true },
              group: 'unknown',
              position: 'after',
            },
          ],
          warnOnUnassignedImports: true,
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
          },
        },
      ],
      'import/no-default-export': 'error',
      'import/no-deprecated': 'error',
      'import/no-commonjs': 'error',
      'import/no-empty-named-blocks': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-nodejs-modules': 'error',
      'import/no-unresolved': [
        'error',
        { commonjs: true, caseSensitive: true },
      ],
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './',
              from: './src/**/+(*.)+(spec|test).+(ts|js)?(x)',
              message: 'Importing test files in non-test files is not allowed.',
            },
            {
              target: './',
              from: './src/testing',
              message:
                'Importing testing utilities in non-test files is not allowed.',
            },
          ],
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react-refresh/only-export-components': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': 'off',
      'react/no-array-index-key': 'off',
      '@arabasta/report-caught-error/report-caught-error': [
        'error',
        'reportUnknownError',
      ],
      'es/no-optional-catch-binding': 'error',
      // This rule can be used just fine with Prettier as long as
      // you don’t use the "multi-line" or "multi-or-nest" option.
      // https://github.com/prettier/eslint-config-prettier/?tab=readme-ov-file#curly
      curly: ['error', 'all'],
    },
  },
  {
    name: 'All TypeScript files',
    files: ['**/*.+(ts|tsx)'],
    // This syntactic sugar comes from typescript-eslint's Flat config helper,
    // it allows you to more easily extend shared configs for specific file
    // patterns whilst also overriding rules/options provided by those configs.
    // IT HAS NOTHING TO DO WITH .ESLINTRC's EXTENDS KEY!
    // https://typescript-eslint.io/packages/typescript-eslint#flat-config-extends
    extends: [
      noDestructuringArraysAsObjects.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...compat.extends('plugin:import/typescript'),
      prettier,
    ],
    plugins: { '@typescript-eslint': tseslint.plugin, deprecation },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['tsconfig.json'],
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNullish: true,
          allowNumber: true,
        },
      ],
      'deprecation/deprecation': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          classes: true,
          functions: true,
          variables: true,
        },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
          allowTaggedTemplates: false,
          allowTernary: false,
          enforceForJSX: false,
        },
      ],
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-dupe-class-members': 'error',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      'import/no-empty-named-blocks': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-unresolved': 'error',
      'import/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
          pattern: {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        },
      ],
      'linebreak-style': ['error', 'unix'],
      'no-func-assign': 'error',
      'constructor-super': 'error',
      'getter-return': ['error', { allowImplicit: true }],
      'import/named': 'error',
      'no-const-assign': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-import-assign': 'error',
      'no-new-func': 'error',
      'no-new-symbol': 'error',
      'no-obj-calls': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
      curly: ['error', 'all'],
    },
  },
  {
    name: 'Test files and test related infrastructure',
    files: ['**/+(*.)+(spec|test).+(ts|js)?(x)', 'src/testing/**'],
    extends: [...compat.extends('plugin:testing-library/react')],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'testing-library/no-manual-cleanup': 'off',
      'testing-library/no-wait-for-multiple-assertions': 'off',
      'vitest/expect-expect': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      'import/no-restricted-paths': ['off', { zones: [] }],
    },
  },
  {
    name: 'Root level .js/.ts configuration files',
    files: ['*.js', '*.ts', '__mocks__/**/*.[j|t]s?(x)'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/no-default-export': 'off',
      'import/no-commonjs': 'off',
      'import/no-nodejs-modules': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
  },
  {
    name: 'Root level .ts configuration files',
    files: ['*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.node.json'],
      },
    },
  },
  {
    name: 'Type definition files',
    files: ['**/*.d.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    ignores: ['package-lock.json', 'dist', 'coverage', 'extra'],
  }
);
