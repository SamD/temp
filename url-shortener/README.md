* [server](./server) simple NestJS server
* [client](./client) simple Angular client

### Building and Running

Use [buildRun.sh](./buildRun.sh) for quick launch, it does
* install packages in both `server` and `client`
* builds the `client`
* starts the `server`

When server starts up the url is http://localhost:8080 which will default to 
serving the client build as static content

### Testing
There is only one set of `e2e` test which tests the `server` url controller and service

Sample Run
```shell
cd url-shortener/server
# runs the e2e tests
npm run test:e2e
> url-shortener@0.0.1 test:e2e /home/samueldoyle/Projects/GitHub/SamD/temp/url-shortener/server
> jest --config ./test/jest-e2e.json

  console.log
    beforeAll

      at Object.<anonymous> (app.e2e-spec.ts:8:13)

 PASS  test/app.e2e-spec.ts
  UrlShortenerController (NEW)
    ✓ /s/{invalidid} (GET) (17 ms) # get a non existing short url
    ✓ /s/{new} (POST) (15 ms) # create a new short url
    UrlShortenerController (EXISTING)
      ✓ /s/{validid} (GET) does redirect (4 ms) # get an existing short url
      ✓ /s/{existing} (POST) (3 ms) # post existing , test it comes from cache

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        2.249 s
Ran all test suites.
```
