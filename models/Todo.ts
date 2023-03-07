import prisma from "../lib/prisma"
import { Todo as TodoType } from '@prisma/client'

export const Todo = {
  async getAll(): Promise<TodoType[]> {
    await prisma.$connect()
    return await prisma.todo.findMany()
  },

  async create(title: string): Promise<TodoType> {
    await prisma.$connect()
    return await prisma.todo.create({
      data: {
        title,
        completed: false,
      },
    })
  },

  async find(id: string): Promise<TodoType | null> {
    await prisma.$connect()
    return await prisma.todo.findUnique({
      where: { id },
    })
  },

  async update(id: string, title: string, completed: boolean): Promise<TodoType> {
    await prisma.$connect()
    return await prisma.todo.update({
      where: { id },
      data: { completed },
    })
  },

  async delete(id: string): Promise<void> {
    await prisma.$connect()
    await prisma.todo.delete({ where: { id } })
  },
}
