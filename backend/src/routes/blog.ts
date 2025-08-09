import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

blogRouter.use('/*', async (c, next) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  const token = jwt.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  await next()
})

blogRouter.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id);
  return c.text('Get Blog Route')
})

blogRouter.post('/api/v1/blog', (c) => {
  return c.text('Create Blog Route')
})

blogRouter.put('/api/v1/blog', (c) => {
  return c.text('Update Blog Route')
})