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

router.get("/:id", (req,res) => {
 
  const {id} = req.params;

  Users.findById(id)
    if(!id) {
      res.status(404).json({ message: `yo dawg this id dont exist`})
    } else {
      Users.findById(id)
      .then(user => {
        res.status(200).json({ user: user, message: `user info retrieved`})
      }).catch( error => {
        res.status(500).json({ message: `error 500 undo, ${error}`})
      })
    }
})


// POST

// router.post("/", (req,res) => {
  
//   const userInfo = req.body;
//   Users.insert(userInfo)
//     .then(user => {
//       res.status(201).json(user)
//     })
//     .catch(error => {
//       res.status(500).json({ message: `error adding user, ${error}`})
//     })
// })

router.post("/", (req,res) => {
  
  const {name, bio} = req.body

  if (!name || !bio) {
    res.status(404).json({ message: "Enter the required information" })
  } else {
    Users.insert(req.body)
      .then(newUser => {
        res.status(200).json({
          message: `new user: ${newUser}`,
          newUser:req.body
      }).catch(error => {
        res.status(500).json({ message: "error 500 hundo"})
      })
      })
  }
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
