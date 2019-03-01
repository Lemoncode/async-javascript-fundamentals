## This is going to be our protected API.

* To protect this API, we're going to use _express-jwt_.
* We're sync _auth_ and _API_ by using in both places the same secret.

```javascript
const jwtCheck = expressjwt({
    secret: 'mysupersecretkey',
})


app.use('/api/users', jwtCheck, users);
app.use('/api/cars', jwtCheck, cars);
```
* If the user is not authenticated will not get response from API