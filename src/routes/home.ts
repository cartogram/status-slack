export default async function home(request: FetchEvent) {
  console.log(request);
  return new Response('Hello super worker!', {
    headers: {'content-type': 'text/plain'},
  });
}
