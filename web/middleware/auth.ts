export default function ({ store, redirect, next }) {
  console.log('__Middleware');
  console.log(store.state.auth);
  console.log(next);

  //ToDo Verify Token
  if (!store.state.auth.loggedIn) {
    return redirect('/');
  } else {
    return next;
  }
}
