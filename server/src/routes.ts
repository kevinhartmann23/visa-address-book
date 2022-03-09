import express, { Request, Response } from 'express'
import app from './app'

const router = express.Router()

// GET

router.get('/contacts', (req: Request, res: Response) => {
  res.status(200).send({
    data: JSON.stringify(app.locals.contacts),
  })
})

// POST & PUT

router.post('/contacts', (req, res) => {
  const { firstName, lastName, phoneNumber, email, id} = req.body

  try {
    if(!firstName || !phoneNumber || !id) {
        throw new Error('Expected format to include {firstName: <String>, phoneNumber: <String>, id: <String}. You are missing a parameter')
    }
  
    app.locals.contacts = [...app.locals.contacts, req.body]

    res.status(201).send({
      data: JSON.stringify(app.locals),
      message: `Contact successfully added!`
    })

  } catch (err: any) {
    res.status(422).send(JSON.stringify(err.message))
  }
})

router.post('/contacts/update', (req: Request, res : Response) => {
  const { id } = req.query

  try {
    
    if(!id) {
      throw new Error('Request missing a parameter. {id: <String>}')
    }

    const index = app.locals.contacts.findIndex((e:any) => e.id === id)
    app.locals.contacts[index] = req.body
    
    res.status(201).send({
      data: JSON.stringify(app.locals),
      message: `Contact successfully updated!`
    })

  } catch ( err: any ) {
    res.status(422).send(JSON.stringify(err.message))
  }
})

//DELETE

router.delete('/contacts', async (req: Request, res: Response) => {
  const { id } = req.query

  try {

    if (!id) {
      throw new Error('Request missing a parameter. {id: <String>}')
    }

    app.locals.contacts = app.locals.contacts.filter((e: any) => e.id !== id)

    res.status(201).send({
      data: JSON.stringify(app.locals),
      message: `Contact permanently deleted!`
    })

  } catch (err: any) {
    res.status(422).send(JSON.stringify(err.message))
  }

})

export default router