import express from 'express'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
const adapter = new PrismaPg({
    connectionString:process.env.DATABASE_URL
})
const prisma = new PrismaClient({ adapter })
const app = express();
app.use(express.json());
// create user
app.post('/', async (req, res) => {
    const { firstName, lastName, age ,email} = req.body
    const newUser = await prisma.user.create({
        data:{firstName, lastName, age,email}
    })
    res.status(201).json(newUser)
})
// get all users
app.get('/', async (req, res) => {
    const users = await prisma.user.findMany({
        where: { OR: [{email:{startsWith:"a"}}, {email:{endsWith:".a"}}]}
    });
    res.status(200).json(users)
})
// update user
app.patch('/:id', async (req, res) => {
    const { age } = req.body;
    const { id } = req.params;
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data:{age}
    })
    res.status(200).json(updatedUser)
})
// delete user
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
        where:{id:parseInt(id)}
    })
    res.status(200).json(deletedUser)
})
app.post('/post', async (req, res) => {
    const { title, user_id } = req.body;
    const newPost = await prisma.post.create({
        data: { title, user_id, active: true, content: null },
        select:{title:true,creator:true}
    })
    res.status(201).json(newPost)
})
app.post('/post/many', async (req, res) => {
    const allPosts = await prisma.post.createMany({
        data:req.body
    })
    res.json(allPosts)
})
const port = 4000;
app.listen(port, () => console.log(`server is running on port ${port}`))
