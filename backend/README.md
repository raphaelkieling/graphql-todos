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


## Reference
https://engineering.shopify.com/blogs/engineering/solving-the-n-1-problem-for-graphql-through-batching

