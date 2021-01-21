const path = require('path')
module.exports = {
    components: 'src/components/**/[A-Z]*.{ts,tsx}',
    resolver: require('react-docgen').resolver.findAllComponentDefinitions,
    propsParser: require('react-docgen-typescript').withCustomConfig(
      './tsconfig.json'
    ).parse,
    getExampleFilename(componentPath) {
      let baseName = path.basename(componentPath)
      return path.join(__dirname, 'src/documentation/', baseName.replace(/\.tsx?$/, '.md'))
    },
    styleguideComponents: {
      Wrapper: path.join(__dirname, 'src/styleguidist/Wrapper')
    }
}