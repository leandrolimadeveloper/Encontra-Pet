import app from './app'

const port = 3333
app.listen(port, err => {
   err ? console.log(err) : console.log(`Server running at: http://localhost:${port}`)
})
