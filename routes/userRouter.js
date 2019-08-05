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
  const id = req.params.id;
  
})


// POST

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

module.exports = router;
