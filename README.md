# Deno v2 vs Express comparison

## Quick guide:

Terminal 1

```
docker-compose up --build
```

Test 1:

```
cd deno-app
k6 run deno-test-get.js
```

Test 2:

```
cd deno-app
k6 run deno-test-post.js
```

### How to run k6 tests:

Current setup supports running tests only localy

```
cd deno-app
k6 run deno-test.js
```

> Node: If you dont have k6 installed on your machine - you can use docker image:

```
docker run --rm -i grafana/k6 run deno-test.js
```

### How to run only one framework:

First change the database host from _postgres_ to _localhost_ in `config.yaml`

1. Create image of Express

```
cd express-app
docker build --tag express-app .
```

2. Run container and expose port

```
docker run --publish 7070:7070 express-app
```
