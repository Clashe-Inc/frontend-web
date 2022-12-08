// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import vuetify from '@/plugins/VuetifyPlugin';
import router from '@/router';
import { mount } from 'cypress/vue';
import type { Router } from 'vue-router';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
/* eslint-disable @typescript-eslint/no-namespace */

type MountParams = Parameters<typeof mount>;
type OptionsParam = MountParams[1] & {
  router?: Router;
  vuetify?: any;
  props: {};
};

declare global {
  namespace Cypress {
    interface Chainable {
      mount(component: any, options?: OptionsParam): Chainable<any>;
    }
  }
}

Cypress.Commands.add('mount', (component, options) => {
  const newOptions = { ...options };
  newOptions.global = { plugins: [] };
  newOptions.global.plugins.push(vuetify);
  newOptions.global.plugins.push(router);
  return mount(component, newOptions);
});
// Example use:
// cy.mount(MyComponent)
