const router = require('express').Router();

//MODEL
const Users = require('../data/db')

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



module.exports = router;
