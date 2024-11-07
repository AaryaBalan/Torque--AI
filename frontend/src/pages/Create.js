import React, { useEffect, useState } from 'react'
import '../styles/Create.css'
import Navbar from '../components/Navbar'


const Create = () => {
    // defining states
    const [AIcontent, setAIcontent] = useState("")
    const [prompt, setPrompt] = useState('')
    const [clickCount, setClickCount] = useState(0)
    const [msg, setMsg] = useState("")

    // generating AI content from backend and fetching it
    useEffect(() => {
        try {
            fetch('https://torque-ai-server.vercel.app/generate')
                .then(res => res.json())
                .then(data => setAIcontent(data))
        } catch (err) {
            console.log(err)
        }
    }, [clickCount])

    // generating the corresponding AI content based on the prompt
    async function generatePrompt() {
        fetch("https://torque-ai-server.vercel.app/push", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: { prompt } })
        }).then(() => {
            setAIcontent({ content: "Loading..." })
            setClickCount(prevCount => prevCount + 1)
        })
    }

    // adding data to the server
    async function addData() {
        if (prompt.length !== 0 && AIcontent.length !== 0) {
            fetch("https://torque-ai-server.vercel.app/addData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: prompt, data: AIcontent.content })
            })
            window.open("https://torque-ai.vercel.app/data", "_self")
        } else {
            setMsg("Fill the fields to add the data")
        }
    }

    function onText(val) {
        setAIcontent(val)
    }

    function getPrompt(val) {
        setPrompt(val)
    }



    return (
        <div className="create-fragement">
            <Navbar />
            <div className="create-area">
                <div className="create-type-area">
                    <a href="/data/create" className="create-type type-active">Upload Text</a>
                    <a href="csv" className="create-type">Upload CSV file</a>
                </div>
                <div className="title-area">
                    <input name='prompt' type="text" placeholder='Title of your content' onChange={(e) => getPrompt(e.target.value)} />
                    <button className='generate-with-ai-btn' onClick={generatePrompt}>Generate With AI</button>
                </div>
                <textarea name="create-text" id="createText" value={AIcontent.content} onChange={(e) => onText(e.target.value)}></textarea>
                <div className="msg-create">{msg}</div>
                <div className="save-data" onClick={addData}>Add Data</div>
            </div>
        </div>
    )
}

export default Create