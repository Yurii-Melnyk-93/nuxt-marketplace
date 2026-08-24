// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.vue'],
  rules: {
    // One attribute per line, first attribute on its own line, closing bracket on its own line
    'vue/max-attributes-per-line': ['warn', { singleline: { max: 1 }, multiline: { max: 1 } }],
    'vue/first-attribute-linebreak': ['warn', { singleline: 'beside', multiline: 'below' }],
    'vue/html-closing-bracket-newline': ['warn', { singleline: 'never', multiline: 'always' }],
    'vue/html-indent': ['warn', 2, { attribute: 1, closeBracket: 0, alignAttributesVertically: true }],
    // Content of a multiline tag on its own line, not glued to the brackets
    'vue/multiline-html-element-content-newline': 'warn',
  },
})
