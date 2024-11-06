const express = require("express")
const app = express()
const cors = require('cors')
const pool = require('./pool')
const multer = require('multer')
const fs = require("fs").promises
const path = require("path")
require("dotenv").config()
const { formatDate } = require("./functions/backendFunc")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

app.use(express.json())


app.use(cors({
    origin: 'https://torque-ai.vercel.app'
}));

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
let AIcontent = ""
let prompt = { prompt: "type Hello! This is Torque AI, Enter a prompt to generate alone" }

// generate AI content
app.get('/generate', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt.prompt);
        AIcontent = result.response.text()
        prompt = { prompt: "type Hello! This is Torque AI, Enter a prompt to generate" }
        res.json({ content: result.response.text() })
    } catch (err) {
        res.json({ err: err, content: "Your prompt is violating our terms and conditions." })
    }
})

//push the prompt
app.post('/push', (req, res) => {
    prompt = req.body.prompt
    res.send(req.body)
})

// add data to the text data
app.post('/addData', async (req, res) => {
    const { title, data } = req.body
    const postTextData = await pool.query("INSERT INTO textdata (title, data, date) VALUES ($1, $2, $3)", [title, data, formatDate()])
    res.send(postTextData)
})

// getting all text data
app.get('/allData', async (req, res) => {
    const getTextData = await pool.query("SELECT * FROM textdata")
    res.json(getTextData.rows)
})

// getting particular data by id
app.get('/allData/:id', async (req, res) => {
    const getSingleData = await pool.query("SELECT * FROM textdata WHERE id = $1", [req.params.id])
    res.json(getSingleData.rows)
})

// csv files
app.get('/allFiles', async (req, res) => {
    const allFiles = await pool.query("SELECT * FROM csvdata")
    res.json(allFiles.rows)
})

app.post('/addFile', upload.single('uploadCsv'), async (req, res) => {
    try {
        const postCsvData = await pool.query("INSERT INTO csvdata (filename, filetype, size, title, date) VALUES ($1, $2, $3, $4, $5)", [req.file.originalname, req.file.mimetype, req.file.size, req.body.title, formatDate()])
        // res.send(req.file)
        console.log(req.body)
        res.redirect('http://localhost:3000/data')
    } catch (err) {
        console.log("fill the fields")
    }
})

app.get("/csvdata", async (req, res) => {
    const all = await pool.query("SELECT * FROM csvdata")
    res.json(all.rows)
})

app.get("/file/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * from csvdata WHERE id = $1", [req.params.id])
        const filename = result.rows[0].filename
        const size = result.rows[0].size
        const title = result.rows[0].title
        const date = result.rows[0].date
        const data = await fs.readFile(path.join(__dirname, 'uploads', `${filename}`), { encoding: 'utf8' });
        res.json({ filename: filename, "csvData": data, size: size, title: title, date: date })
    } catch (err) {
        console.log(err);
        res.send("No data found")
    }
})


// download 
app.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', fileName);

    // Set the file as an attachment to download
    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Error downloading the file:', err);
            res.status(500).send('Error downloading the file');
        }
    });
});


app.listen(process.env.PORT || 7000, () => {
    console.log(`server running in port ${process.env.PORT || 7000}`)
})