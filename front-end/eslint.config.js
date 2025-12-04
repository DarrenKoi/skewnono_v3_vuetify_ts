import vuetify from 'eslint-config-vuetify'
import prettier from 'eslint-plugin-prettier/recommended'

export default vuetify(
  // Vuetify config options
  {},
  // Additional configs
  prettier,
  {
    rules: {
      // Prettier integration - show warnings instead of errors
      'prettier/prettier': 'warn',
    },
  }
)
