// import React from 'react'
// import car_accident from '../data/allDataSets/accidents.csv'
// import loan from '../data/allDataSets/loan_data.csv'
// import heart_attack from '../data/allDataSets/heart.csv'
// import companies from '../data/allDataSets/companies.csv'
// import netflix from '../data/allDataSets/netflix.csv'
// import students from '../data/allDataSets/student.csv'
// import bank from '../data/allDataSets/world_bank_dataset.csv'
// import share_market from '../data/allDataSets/stock.zip'
// import football from '../data/allDataSets/football_mini.csv'
// import ev from '../data/allDataSets/ev_charging_patterns.csv'
// import animals from '../data/allDataSets/animals.py'
// import fruits from '../data/allDataSets/fruits-360.zip'
// import mobile from '../data/allDataSets/user_behavior_dataset.csv'
// import spotify from '../data/allDataSets/spotify_songs.csv'

// const Modalbox = (props) => {

//     const files = [car_accident, loan, heart_attack, companies, netflix, students, bank, share_market, football, ev, animals, fruits, mobile, spotify]

//     const singleInfo = props.info
//     return (
//         <div className="open-box">
//             <div className="close-btn"><i class="fa-solid fa-circle-xmark" onClick={props.closeBtn}></i></div>
//             <div className="open-top">
//                 <div className="open-img">
//                     <img src={singleInfo.img} alt="" />
//                 </div>
//                 <div className="open-content">
//                     <div className="open-title">
//                         {singleInfo.title}
//                     </div>
//                     <div className="open-description">
//                         {singleInfo.description}
//                     </div>
//                     <div className="modal-type">CSV file</div>
//                 </div>
//             </div>
//             <div className="download-box">
//                 <a href={files[singleInfo.id-1]} className="download-btn">Download Dataset</a>
//             </div>
//         </div>
//     )
// }

// export default Modalbox