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

//DELETE

router.delete('/contacts/:id', async (req: Request, res: Response) => {
  console.log('HERE')
  try {

    const findContact = await app.locals.contacts.find((contact: any) => {
      const id = parseInt(req.params.id)
      return contact.id === id
    })

    if (findContact) {
      const updatedContacts = await app.locals.contacts.filter((contact: any) => {
        const id = parseInt(req.params.id)
        return contact.id !== id
      })

      app.locals.deleted = [...app.locals.deleted, findContact]
      app.locals.contacts = updatedContacts

      res.status(201).send({
        data: JSON.stringify(updatedContacts),
        message: `Contact with ID: ${req.params.id} deleted.`
      })

    } else {
      throw new Error(`ERROR: Cannot find contact with id: ${req.params.id}`)
    }

  } catch (err: any) {
    res.status(500).send(JSON.stringify(err.message))
  }
})

export default router