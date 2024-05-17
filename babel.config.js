module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react' // Asegúrate de incluir este preset si estás usando React
    ],
    plugins: [
      '@babel/plugin-transform-runtime' // Este plugin es útil para manejar async/await y otras funcionalidades de ES6+
    ]
  };
  