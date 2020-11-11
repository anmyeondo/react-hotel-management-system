const users = [
    { id: "qsc", password: "123", name: "Kim" },
    { id: "wdv", password: "456", name: "Lee" },
    { id: "efv", password: "789", name: "Park" },
  ]
  
  export function signIn({ id, password }) {
    const user = users.find(
      (user) => user.id === id && user.password === password
    )
    if (user === undefined) throw new Error()
    return user
  }