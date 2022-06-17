import app from './app'

const port = 3333
app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`)
})
