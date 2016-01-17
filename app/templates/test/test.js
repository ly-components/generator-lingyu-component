import <%= component %> from '../src/index.js';
mocha.ui('bdd');
describe('test', function() {
  it('test', function() {
    return <%= component %>().should.be.eql('test');
  });
});
if (window.mochaPhantomJS) {
  window.mochaPhantomJS.run();
} else {
  mocha.run();
}
