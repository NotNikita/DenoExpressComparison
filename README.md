# Deno v2 vs Express comparison

### How to run only one framework:

Create image of Express

```
cd express-app
docker build --tag express-app .
```

Run container and expose port

```
docker run --publish 7070:7070 express-app
```
