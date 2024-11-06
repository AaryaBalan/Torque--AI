import React, { useEffect, useState } from 'react'
import "../styles/SingleCsvData.css"
import { formatBytes } from '../functions/basicFunctions'
import Navbar from '../components/Navbar'


const SingleCsv = () => {

    const [csvData, setCsvData] = useState({})
    const [csvInfo, setCsvInfo] = useState({ isClick: true })
    console.log(csvData)


    useEffect(() => {
        async function getCsvData() {
            const id = window.location.pathname.split('/')[2]
            const response = await fetch(`https://torque-ai-server.vercel.app/file/${id}`)
            const responseJSON = await response.json()
            setCsvData(responseJSON)
        }
        getCsvData()
    }, [])

    // csv parser
    function parseCSVData(csv) {
        const delimiters = [',', ';', '\t', '|']
        const rows = csv.split("\n").slice(0, 21); // Get the first 21 rows
        const data = [];
        for (const row of rows) {
            const columns = [];
            let current = '';
            let insideQuotes = false;
            for (let char of row) {
                if (char === '"') {
                    // Toggle the insideQuotes flag
                    insideQuotes = !insideQuotes;
                } else if (delimiters.includes(char) && !insideQuotes) {
                    // If we encounter a comma and we're not inside quotes, push the current value
                    columns.push(current.trim());
                    current = ''; // Reset current for the next value
                } else {
                    // Accumulate characters for the current value
                    current += char;
                }
            }
            // Push the last value after the loop
            columns.push(current.trim());
            // Handle empty fields
            for (let i = 0; i < columns.length; i++) {
                if (columns[i] === '') {
                    columns[i] = ''; // Explicitly set empty strings
                }
            }
            data.push(columns); // Add the processed row to the data
        }
        return data; // Return the parsed data
    }


    const downloadFile = (fileName) => {
        // The URL to your backend download endpoint
        const url = `https://torque-ai-server.vercel.app/download/${fileName}`;
        // Create an anchor element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
    };

    const rows = parseCSVData(csvData.csvData || "");
    const headers = rows[0];
    const data = rows.slice(1);
    console.log(data.length)

    function getInfo() {
        console.log(csvInfo.isClick)
        const element = document.querySelectorAll('.info-head')
        const button = document.querySelector('.getinfo')
        if (csvInfo.isClick) {
            button.style.backgroundColor = "#c54aca"
            element.forEach(e => e.style.display = "block")
        } else {
            button.style.backgroundColor = "#384450"
            element.forEach(e => e.style.display = "none")
        }
        setCsvInfo(prevInfo => ({
            rowLength: csvData.csvData.split("\n").length,
            colLength: headers.length,
            size: formatBytes(csvData.size),
            isClick: !prevInfo.isClick
        }))
    }

    return (
        <>
            <Navbar />
            <div className="info-area">
                <div className="infos">
                    <button className="getinfo" onClick={getInfo}>Get Information</button>
                    <div className="row-length info-head">
                        Row Length: <span className="info-vals">{csvInfo.rowLength}</span>
                    </div>
                    <div className="col-length info-head">
                        Column Length: <span className="info-vals">{csvInfo.colLength}</span>
                    </div>
                    <div className="byte-size info-head">
                        File Size: <span className="info-vals">{csvInfo.size}</span>
                    </div>
                    <div className="date info-head">Uploaded on: <span className="info-vals">{csvData.date}</span></div>
                </div>
                <div className="single-title">{csvData.title}</div>
                <button class="text-download csv-download" title={"Download " + csvData.filename} onClick={() => downloadFile(csvData.filename)}><i class="fa-solid fa-download" aria-hidden="true"></i></button>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header.trim().toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell.trim().replace(/"/g, "")}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="view-more">...Download to to view more</div>
            </div>
        </>
    );
}

export default SingleCsv