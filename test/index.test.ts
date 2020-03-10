import {CloudflareWorkerGlobalScope} from 'types-cloudflare-worker';
declare var self: CloudflareWorkerGlobalScope;

import makeCloudflareWorkerEnv from 'cloudflare-worker-mock';

describe('worker', () => {
  beforeEach(() => {
    // Merge the Cloudflare Worker Environment into the global scope.
    Object.assign(global, makeCloudflareWorkerEnv());
    // Clear all module imports.
    jest.resetModules();
    // Import and init the Worker.
    jest.requireActual('../src/index');
  });

  it('works', async () => {
    expect(self).toBeDefined();
  });
});
