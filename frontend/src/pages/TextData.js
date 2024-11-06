import React, { useEffect, useState } from 'react'
import textData from '../assets/images/data.jpg'
import "../styles/TextData.css"
import { formatContent, formatBytes } from '../functions/basicFunctions'
import Navbar from '../components/Navbar'


const TextData = (props) => {
    // defining states
    const [csvInfo, setCsvInfo] = useState({ isClick: true })
    const [singleData, setSingleData] = useState({})

    // fetching single data by slicing from the url
    useEffect(() => {
        console.log(window.location.pathname.split('/')[1])
        const id = window.location.pathname.split('/')[2]
        async function getTextData() {
            const response = await fetch(`https://torque-ai-server.vercel.app/allData/${id}`)
            const responseJSON = await response.json()
            setSingleData(responseJSON[0])
        }
        getTextData()
    }, [])

    const downloadTextFile = () => {
        const text = singleData.data
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element and trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${singleData.title}.txt`; // Specify the file name
        a.click();

        // Clean up by revoking the object URL
        URL.revokeObjectURL(url);
    };
    console.log(formatBytes(singleData.data && singleData.data.length))


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
            length: singleData.data.length,
            size: formatBytes(singleData.data.length),
            isClick: !prevInfo.isClick
        }))
    }

    return (
        <div className="text-data-fragment">
            <Navbar />
            <div className="info-area-textdata">
                <div className="infos">
                    <button className="getinfo" onClick={getInfo}>Get Information</button>
                    <div className="length info-head">
                        Text Length: <span className="info-vals">{csvInfo.length}</span>
                    </div>
                    <div className="byte-size info-head">
                        File Size: <span className="info-vals">{csvInfo.size}</span>
                    </div>
                    <div className="date info-head">Uploaded on: <span className="info-vals">{singleData.date}</span></div>
                </div>
                <button className='text-download' onClick={downloadTextFile} title={'Download ' + singleData.title}><i class="fa-solid fa-download"></i></button>
            </div>
            <div className="text-data-area">
                <div className="text-data-img-section">
                    <img src={textData} alt="" />
                </div>
                <div className="text-data-content">
                    <div className="text-data-head">
                        {singleData.title && singleData.title.slice(0, 50).toUpperCase()}{singleData.title && singleData.title.length > 50 && "..."}
                    </div>
                    <div
                        className="text-data-para"
                        dangerouslySetInnerHTML={{ __html: formatContent(singleData.data) }} // Renders HTML content
                    />
                </div>
            </div>
        </div>
    );
}

export default TextData