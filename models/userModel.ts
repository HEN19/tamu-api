export interface User {
    id: string
    name: string
    email: string
  }
  
  // In-memory users data (can be replaced by a database later)
  let users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Doe", email: "jane@example.com" },
  ]
  
  // CRUD operations
  export const getUsers = (): User[] => users
  
  export const getUserById = (id: string): User | undefined => {
    return users.find((user) => user.id === id)
  }
  
  export const createUser = (user: User): User => {
    user.id = (users.length + 1).toString() // Generate a new ID
    users.push(user)
    return user
  }
  
  export const updateUser = (id: string, updatedUser: Partial<User>): User | null => {
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser }
      return users[userIndex]
    }
    return null
  }
  
  export const deleteUser = (id: string): boolean => {
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex !== -1) {
      users.splice(userIndex, 1)
      return true
    }
    return false
  }
  