import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('acronym-scheme', 'Integration | Component | acronym scheme', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{acronym-scheme}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#acronym-scheme}}
      template block text
    {{/acronym-scheme}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
