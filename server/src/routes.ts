import express, { Request, Response } from 'express'

const contacts = require('./data/contacts')
const favorites = require('./data/favorites')
const recentlyDeleted = require('./data/deleted')

const router = express.Router()

// GET

router.get('/contacts', (req: Request, res: Response) => {
  res.status(200).send({
    data: JSON.stringify(contacts),
  })
})

router.get('/contacts/:id', async (req: Request, res: Response) => {
  try {
    
    const findContact = await contacts.find((contact: any) => {
      const id = parseInt(req.params.id)
      return contact.id === id
    })
    
    if(findContact) {
      res.status(200).send({
        data: JSON.stringify(findContact),
        message: ''
      })
    } else {
      throw new Error(`ERROR: Cannot find contact with id: ${req.params.id}`)
    }

  } catch (err: any) {
    res.status(500).send(JSON.stringify(err.message))
  }
})

router.get('/favorites', (req: Request, res: Response) => {
  res.status(200).send({
    data: JSON.stringify(favorites),
  })
})

router.get('/deleted', (req: Request, res: Response) => {
  res.status(200).send({
    data: JSON.stringify(recentlyDeleted),
  })
})

// POST & PUT

// router.post('/contact', (req: Request, res: Response) => {
//   console.log(req, res)
// })

//DELETE

router.delete('/contacts/:id', async (req: Request, res: Response) => {
  console.log('HERE')
  try {

    const findContact = await contacts.find((contact: any) => {
      const id = parseInt(req.params.id)
      return contact.id === id
    })

    if (findContact) {
      const updatedContacts = await contacts.filter((contact: any) => {
        const id = parseInt(req.params.id)
        return contact.id !== id
      })

      recentlyDeleted.push(findContact)

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