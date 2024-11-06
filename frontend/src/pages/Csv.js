import React, { useState } from 'react'
import '../styles/Csv.css'
import Navbar from '../components/Navbar'


const Csv = () => {

    const [fileStatus, setFileStatus] = useState(`No File uploaded (only CSV File)`); // Track the file name
    const fileUploaded = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileStatus("File Uploaded");
        }
    };

    function submitCsv() {
        if (fileStatus === "No File uploaded") {
            setFileStatus("Must need to upload the file")
        }
    }


    return (
        <>
            <Navbar />
            <div className="csv-fragment">
                <div className="create-type-area">
                    <a href="/data/create" className="create-type">Upload Text</a>
                    <a href="/data/csv" className="create-type type-active">Upload CSV file</a>
                </div>
                <form action="https://torque-ai-server.vercel.app/addFile" method="POST" enctype="multipart/form-data" className="csv-area">
                    <label className='upload-csv-label' htmlFor="uploadCsv">Upload a CSV</label>
                    <input type="file" name="uploadCsv" id="uploadCsv" onChange={fileUploaded} required accept='.csv' />
                    <div className="file-name">
                        {fileStatus}
                    </div>
                    <input type="text" className="file-title" placeholder='File Title' name='title' required />
                    <button type='submit' className="addFile" onClick={submitCsv}>Add File</button>
                </form>
            </div>
        </>
    )
}

export default Csv