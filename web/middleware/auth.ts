export default function ({ store, redirect }) {
  //ToDo add validation
  if (!store.state.myAuth.loggedIn) {
    return redirect("/");
  }
}
