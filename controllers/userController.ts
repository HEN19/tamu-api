//@ts-ignore
import { RouterContext, Params} from "https://deno.land/x/oak/mod.ts"
import * as userModel from "../models/userModel.ts"

export const getAllUsers = (context: RouterContext<any, Params, any>) => {
  context.response.body = userModel.getUsers()
}
export const getUser = (context: RouterContext<any, Params, any>) => {
  const id = context.params.id
  const user = userModel.getUserById(id!)
  if (user) {
    context.response.body = user
  } else {
    context.response.status = 404
    context.response.body = { message: "User not found" }
  }
}

export const createUser = async (context: RouterContext<any, Params, any>) => {
  const body = await context.request.body.json()
  const newUser = userModel.createUser(body)
  context.response.status = 201
  context.response.body = newUser
}

export const updateUser = async (context: RouterContext<any, Params, any>) => {
  const id = context.params.id
  const body = await context.request.body.json()
  const updatedUser = userModel.updateUser(id!, body)
  if (updatedUser) {
    context.response.body = updatedUser
  } else {
    context.response.status = 404
    context.response.body = { message: "User not found" }
  }
}

export const deleteUser = (context: RouterContext<any, Params, any>) => {
  const id = context.params.id
  const success = userModel.deleteUser(id!)
  if (success) {
    context.response.status = 204
  } else {
    context.response.status = 404
    context.response.body = { message: "User not found" }
  }
}
