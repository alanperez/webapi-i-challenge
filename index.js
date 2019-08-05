// implement your API here
const server = require("./api/server")

const port = process.envPORT || 5000;

server.get("/", (req,res) => {
  res.send("The Homies")
})

server.listen(port, ()=> {
  console.log(`Server is live ${port}`)
})