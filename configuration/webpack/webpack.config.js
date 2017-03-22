function build(env = 'dev') {
  console.log(`starting webpack module bundler in ${env} mode`);
  return require(`./${env}.js`)({ env });
}
module.exports = build;
