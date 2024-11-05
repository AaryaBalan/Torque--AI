import React from 'react'
import "../styles/MoreInfo.css"

const MoreInfo = () => {
    return (
        <div className="more-info-fragment">
            <div className="expore-btn">
                <a href="/home" className="explore-demo">Try our demo</a>
            </div>
            <div className="qa-block">
                <div className="statement">Problem Statement : </div>
                <div className="qa-sub-block">
                    <div className="question">1. Global Challenge in AI Development </div>
                    <div className="answer">Many companies struggle to build AI models due to the high cost, time, and effort required to find, label, and manage quality data. Existing solutions are often complex and expensive, making it challenging for teams to quickly access and prepare the data they need, ultimately slowing down AI development across industries.</div>
                </div>
                <div className="qa-sub-block">
                    <div className="question">2. Unique Data Challenges in the Indian AI Market</div>
                    <div className="answer">In India, there's a big gap in accessible, high-quality datasets tailored to the unique needs of local businesses and industries. Global datasets often don’t match the specific requirements of the Indian market, making it hard for companies here to train effective AI models. Currently, India lacks a dedicated platform to source and manage datasets suited to its diverse sectors, which slows down AI innovation and growth.</div>
                </div>
            </div>

            <div className="qa-block">
                <div className="statement">Solution : </div>
                <div className="qa-sub-block">
                    <div className="question">1. Global Solution for AI Data Accessibility</div>
                    <div className="answer">Torque is a platform where you can find the exact data you need to easily train or fine-tune AI models—no messy data cleaning or complex setup required. With ready-to-use, high-quality datasets, Torque makes it simple for anyone to get started with AI, helping companies and developers build smarter models faster and with less hassle.</div>
                </div>
                <div className="qa-sub-block">
                    <div className="question">2. Tailored Solutions for India’s Data Challenges</div>
                    <div className="answer">Additionally, Torque offers an accessible, India-focused platform that provides high-quality, customizable datasets tailored to local industry needs. By simplifying data sourcing, labeling, and management, Torque empowers Indian businesses, startups, and developers to efficiently train AI models that truly fit the unique demands of the Indian market. This platform bridges the gap between global datasets and local requirements, making AI development faster, more affordable, and better suited for India’s diverse sectors.</div>
                </div>
            </div>
        </div>
    )
}

export default MoreInfo