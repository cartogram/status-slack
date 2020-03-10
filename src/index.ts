import {home} from './routes';
import {Router} from './router';

export class Worker {
  public async handle(request: FetchEvent) {
    console.log(request);
    const router = new Router();
    router.post('/home', home);
    router.get('/home', home);

    let response = await router.route(request);

    if (!response) {
      response = new Response('Not found', {status: 404});
    }

    return response;
  }
}

self.addEventListener('fetch', (event: Event) => {
  console.log(event);
  const worker = new Worker();

  const fetchEvent = event as FetchEvent;
  fetchEvent.respondWith(worker.handle(fetchEvent));
});
