import React, { useState } from 'react'
import hero_left from "../assets/images/hero_left.svg"
import hero_right from "../assets/images/hero_right.svg"
import SingleDataset from '../components/SingleDataset'
import datasetMVP from '../data/datasetMVP'
import finetune from '../assets/images/finetune.webp'
import uiux from '../assets/images/uiux.webp'
import all from '../assets/images/all.png'
import "../styles/Home.css"
import Navbar from '../components/Navbar'
import Modalbox from '../components/Modalbox'



const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [singleInfo, setSingleInfo] = useState({})

    function closeBox() {
        document.querySelector('.all').style.filter = "blur(0)"
        setIsOpen(false)
    }

    if (isOpen === true) {
        document.querySelector('.all').style.filter = "blur(5px)"
    }

    return (
        <div className="home-fragment">
            <Navbar home={true} data={false}/>

            {/* modal box component */}
            {isOpen && <Modalbox info={singleInfo} closeBtn={closeBox} />}

            <div className="all">
                {/* hero section */}
                <div className="home">
                    <div className="left-portion">
                        <img src={hero_left} alt="" />
                    </div>
                    <div className="center-portion">
                        <div className="center-head">
                            What is Torque AI ?
                        </div>
                        <div className="center-para">
                            Torque AI is a platform that offers high-quality, curated datasets specifically tailored for training AI models. This platform would make it easy for individuals and organizations, even those without technical expertise, to access and use these datasets for fine-tuning and improving AI applications. It would cater to a variety of fields and needs, promoting efficient model training and enhancing accessibility to quality data.
                        </div>
                        <div className="home-btns-area">
                            <a href="/data" className="home-btns explore">Explore Datasets</a>
                            <a href="/data/create" className="home-btns upload">Upload a Dataset</a>
                        </div>
                    </div>
                    <div className="right-portion">
                        <img src={hero_right} alt="" />
                    </div>
                </div>

                {/* benefits section */}
                <div className="benifits-section">
                    <div className="benifits-head">Benefits</div>
                    <div className="top-section">
                        <div className="vast-lib box">
                            <div className="vast-lib-para">
                                By offering user-friendly access to curated datasets, the platform empowers individuals and small businesses to train AI models without requiring deep technical knowledge, making AI more inclusive.
                            </div>
                            <div className="section-img">
                                <img src={uiux} alt="" />
                            </div>
                        </div>
                        <div className="finetune box">
                            <div className="finetune-para">
                                Access to ready-to-use datasets speeds up the AI development process, enabling users to focus on fine-tuning and deploying models faster, which is especially valuable for startups and innovators working on time-sensitive projects.
                            </div>
                            <div className="section-img">
                                <img src={finetune} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="bottom-section">
                        <div className="all-para">
                            A single platform for generating images, videos, and audio streamlines workflows, providing consistent branding across formats without switching tools. It saves time and costs, enhances team collaboration, and leverages AI for cross-content synergy, enabling seamless, multi-channel content creation with unified analytics and personalized recommendations for impactful, cohesive media.etween multiple AI
                            tools.
                        </div>
                        <div className="bottom-section-img">
                            <img src={all} alt="" />
                        </div>
                    </div>
                </div>

                {/* trending datasets */}
                {/* <div className="trending-datasets">
                    <h1 className="trending-dataset-head">Trending DataSets</h1>
                    <div className="display-dataset-home">
                        {datasetMVP.map(data => {
                            return <SingleDataset key={data.id} id={data.id} img={data.img} title={data.title} description={data.description} downloadSrc={data.downloadSrc} click={setIsOpen} setInfo={setSingleInfo} />
                        })}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Home