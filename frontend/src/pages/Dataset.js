import React, { useState, useEffect } from 'react'
import SingleDataset from '../components/SingleDataset'
import datasetMVP from '../data/datasetMVP'
// import loan from '../data/allDataSets/accidents.csv'
import dataImg from "../assets/images/data.jpg"
import Modalbox from '../components/Modalbox'
import '../styles/Dataset.css'
import csvImg from "../assets/images/csv.png"
import { formatBytes, formatContent } from '../functions/basicFunctions'
import nodata from '../assets/images/no_data.avif'
import Navbar from '../components/Navbar'


const Dataset = (props) => {
    // defining states 
    const [mvpData, setMvpData] = useState(datasetMVP)
    const [isOpen, setIsOpen] = useState(false)
    const [singleInfo, setSingleInfo] = useState({})
    const [textData, setTextData] = useState([])
    const [csvData, setCsvData] = useState([])
    const [textDataSearch, setTextDataSearch] = useState()
    const [csvDataSearch, setCsvDataSearch] = useState()
    const [filter, setFilter] = useState(0) // 0 = all, 1 = text, 2 = csv
    console.log(textData)

    // fetching data using useEffect
    useEffect(() => {
        async function getData() {
            const response = await fetch("https://torque-ai-server.vercel.app/allData")
            const responseJSON = await response.json()
            console.log(responseJSON)
            setTextData(responseJSON)
            setTextDataSearch(responseJSON)
        }

        async function getCsvData() {
            const response = await fetch("https://torque-ai-server.vercel.app/csvdata")
            const responseJSON = await response.json()
            console.log(responseJSON)
            setCsvData(responseJSON)
            setCsvDataSearch(responseJSON)
        }
        getData()
        getCsvData()
    }, [])

    // search function to search the dataset when user starts to type
    function search(val) {
        setMvpData(
            datasetMVP.filter(data => {
                return data.title.toLocaleLowerCase().includes(val.toLocaleLowerCase())
            })
        )
        setTextData(
            textDataSearch.filter(data => {
                return data.title.toLocaleLowerCase().includes(val.toLocaleLowerCase())
            })
        )
        setCsvData(
            csvDataSearch.filter(data => {
                return data.title.toLocaleLowerCase().includes(val.toLocaleLowerCase())
            })
        )

    }

    // close function of the modal box
    function closeBox() {
        document.querySelector('.dataset-page').style.filter = "blur(0)"
        setIsOpen(false)
    }

    // setting single data to display in modal box
    function setSingleData(img, title, para) {
        props.setSingleData({ img, title, para })
    }

    // if modal box open then apply the animation
    if (isOpen === true) {
        document.querySelector('.dataset-page').style.filter = "blur(5px)"
    }

    function filterFunction(val) {
        setFilter(Number(val))
    }

    return (
        <div className="data-set-fragments">
            <Navbar home={false} data={true} />

            {/* modal box component */}
            {isOpen && <Modalbox info={singleInfo} closeBtn={closeBox} />}

            {/* dataset page */}
            <div className="dataset-page">
                <div className="content">
                    <div className="content-head">Datasets</div>
                    <div className="content-para">Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.</div>
                    <div className="content-btns">
                        <a href='data/create' className="new-data-set-btn"><i class="fa-solid fa-plus"></i> Upload Dataset</a>
                    </div>
                </div>

                {/* filter component */}
                <div className="filter-component">
                    <div className="filter-area">
                        <select name="filter" id="filter" onChange={(e) => filterFunction(e.target.value)}>
                            <option value="0" onClick={() => setFilter(0)}>All</option>
                            <option value="1" onClick={() => setFilter(1)}>Text</option>
                            <option value="2" onClick={() => setFilter(2)}>Csv</option>
                        </select>
                    </div>
                </div>

                {/* search bar component */}
                <div className="searchbar-fragment">
                    <div className="searchbar">
                        <input type="text" placeholder='Search Datasets' onChange={(e) => search(e.target.value)} />
                    </div>
                </div>

                {/* {
                    [0, 2].includes(filter) &&
                    <div className="csv-data-trending">
                        <div className="dataset-content">
                            <div className="dataset-content-head"><i class="fa-solid fa-chart-simple" style={{ color: "#ffffff" }}></i> Trending Datasets</div>
                        </div>
                        displaying all dataset by map method
                        <div className="display-dataset">
                            {mvpData.map(data => {
                                return <SingleDataset key={data.id} url={data.url} id={data.id} img={data.img} title={data.title} description={data.description} downloadSrc={data.downloadSrc} click={setIsOpen} setInfo={setSingleInfo} />
                            })}
                            {
                                mvpData.length === 0 && <img src={nodata} alt='' className='nodata-img'></img>
                            }
                        </div>
                        <hr />
                    </div>
                } */}

                {
                    [0, 1].includes(filter) &&
                    <div className="text-set-section">
                        {/* text data section */}
                        <div className="text-section-head"><i class="fa-regular fa-file-lines"></i> Text Datasets</div>
                        <div className="text-data-container">
                            {
                                textData.map(data => {
                                    return (
                                        <div className="text-data-box">
                                            <div className="text-data-img">
                                                <img src={dataImg} alt="" />
                                            </div>
                                            <a href={"data/" + data.id} className="text-data-title" onClick={() => setSingleData(dataImg, data.title, data.data)}>
                                                {data.title && data.title.slice(0, 50).toUpperCase()}{data.title.length > 50 && "..."}
                                            </a>
                                            <div className="text-data-description" dangerouslySetInnerHTML={{ __html: formatContent(data.data && data.data.slice(0, 100) + "...") }}>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                textData.length === 0 && <img src={nodata} alt='' className='nodata-img'></img>
                            }

                        </div>
                        <hr />
                    </div>
                }

                {
                    [0, 2].includes(filter) &&
                    <div className="csv-data-container">
                        {/* CSV data */}
                        <div className="csv-data-area">
                            <div className="csv-data-head"><i class="fa-solid fa-file-csv"></i> CSV Datasets</div>
                            <div className="csv-data-section">
                                {
                                    csvData.map(data => {
                                        return (
                                            <div className="csv-box">
                                                <div className="csv-img">
                                                    <img src={csvImg} alt="" />
                                                </div>
                                                <a href={"csvData/" + data.id} className="csv-title">{data.title && data.title.toUpperCase()}</a>
                                                <div className="filename stats"><span>File name:</span> {data.filename}</div>
                                                <div className="file-type stats"><span>File type:</span> {data.filetype || "Zip"}</div>
                                                <div className="file-size stats"><span>Size:</span> {formatBytes(data.size)}</div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    csvData.length === 0 && <img src={nodata} alt='' className='nodata-img'></img>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dataset