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
      res.status(200).json({user,message: "user info succesfully retrieved"})
    }).catch( error => {
      res.status(500).json({ error: `Could not load user info, ${error}`})
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
      res.status(200).json({ message: `user: ${user} has been deleted` })
    }).catch(error => {
      res.status(500).json({ error: `Could not delete user by this id, ${error}`})
    })
})
// UPDATE

router.put("/:id", async (req,res) => {
  try {
    const updateUserInfo = await Users.update(req.params.id, req.body)
    if(updateUserInfo)
      res.status(200).json({
        message: `user info: ${updateUserInfo}`,
        updateUserInfo: req.body,
      })
  } catch (error) {
    res.status(500).json({
      message: 'Unable to update this user at this time.'
    })
  }
})


module.exports = router;
