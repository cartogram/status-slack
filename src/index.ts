import CloudflareWorkerGlobalScope from 'types-cloudflare-worker';
declare var self: CloudflareWorkerGlobalScope;

export class Worker {
  public async handle(event: FetchEvent) {
    console.log(event);
    return new Response('Hello super worker!', {
      headers: {'content-type': 'text/plain'},
    });
  }
}

self.addEventListener('fetch', (event: Event) => {
  const worker = new Worker();
  const fetchEvent = event as FetchEvent;
  fetchEvent.respondWith(worker.handle(fetchEvent));
});
