import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    });

    return c.text('jwt here')
  } catch (e) {
    return c.status(403);
  }
})

app.post('/api/v1/signin', (c) => {
  return c.text('Signin Route')
})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id);
  return c.text('Get Blog Route')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Signin Post Route')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Signin Put Route')
})

export default app
