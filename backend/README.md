# Backend Graphql TODOS

## Problem

    The n+1 problem means that the server executes multiple unnecessary round trips to datastores for nested data. In the above case, the server makes 1 round trip to a datastore to fetch the authors

    The n+1 problem is further exacerbated in GraphQL, because neither clients nor servers can predict how expensive a request is until after it’s executed. In REST, costs are predictable because there’s one trip per endpoint requested. In GraphQL

If i make:

```js
{
    user: async (root, args, context, info) => {
      return await axios.get(`${API}/users/${root.userId}`).then(a => a.data)
    }
}
```

And:

```
query todos {
  todo(id:3){
    userId
    user{
      name
    }
  }
}
```

This will execute user even being equal, it's dangerous.
    
## Solution

#1 approach - Creating a memoize function

```js
function memoize(method) {
  let cache = {};
  return async function () {
    let args = JSON.stringify(arguments);
    cache[args] = cache[args] || method.apply(this, arguments);
    return cache[args];
  };
}

// And create this
const getUserById = memoize((userId) => axios.get(`${API}/users/${userId}`).then(a => a.data))
```

#2 approach - Use a dataloader

```js
/**
 * userLoader is like getUserById memoize. It's cache the all id's and return the cache or request value
 **/
const userLoader = new Dataloader(async keys => {
  return Promise.all(keys.map(async (userId) => axios.get(`${API}/users/${userId}`).then(a => a.data)));
});
```

https://medium.com/@bluepnume/async-javascript-is-much-more-fun-when-you-spend-less-time-thinking-about-control-flow-8580ce9f73fc

## Reference
https://engineering.shopify.com/blogs/engineering/solving-the-n-1-problem-for-graphql-through-batching

https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55
