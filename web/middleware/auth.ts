export default function ({ store, redirect, next }) {
  console.log('__Middleware');
  console.log(next);

  //ToDo Verify Token
  if (!store.state.myAuth.loggedIn) {
    return redirect('/');
  } else {
    return next;
  }
}
