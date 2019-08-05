const router = require('express').Router();

//MODEL
const Users = require('../data/db')

// GET ALL USERS
router.get("/", async(req,res) => {
  try {
    const users = await Users.find()
      if(users) {
        res.status(200).json(users)
      }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve users'})
  }
})

//GET USER BY ID

router.get("/:id", async(req,res) => {
  const {id} = req.params;
  Users.findById(id)
    .then(user => {
      res.status(200).json({message: "user info succesfully retrieved"})
    }).catch( error => {
      res.status(500).json({ error: "Could not load user info"})
    })
})


// POST

router.post("/", (req,res) => {
  // const {id} = req.params
  
  const userInfo = req.body;
  Users.insert(userInfo)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(500).json({ message: 'error adding user'})
    })
})


// DELETE
router.delete("/:id", (req,res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(user => {
      res.status(200).json({ message: 'user deleted' })
    }).catch(error => {
      res.status(500).json({ error: 'Could not delete user by this id'})
    })
})
// UPDATE

router.put("/:id", (req,res) => {
  const {id} = req.params;
  const user = req.body;

  Users.update(id, user)
    .then(updated => {
      if (updated) {
        res.status(200).json(update)
      } else {
        res.status(404).json({ message: 'user not found'})
      } 
    })
    .catch(error => {
      res.status(500).json({ message: 'error updating the user'})
    })
})
module.exports = router;
