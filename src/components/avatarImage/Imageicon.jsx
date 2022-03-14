import React from 'react'
import {icondata} from "./imageicondata"
import './avatarimage.css'
const Imageicon = () => {
  return (
    <>
    <div className="avatar_container" style={{zIndex: "99"}}>
      {
        icondata.map((data, id)=> {
          return (
            
              <div className="avatar_card" key={id}>
                <h2 className="heading">{data.heading}</h2>
                {/* <h2 className="heading2">{data.heading2}</h2>              */}
                <img src={data.img1} className='img_avatar' alt="" />
                <a href={data.link1}>{data.link1_name}</a>
                <a href={data.link2}>{data.link2_name}</a>
                <a href={data.link3}>{data.link3_name}</a>
                <a href="#" className="d_link">{data.link5_name}</a>
              </div>
            
          )
        })
      }
    </div>
    
    </>
  )
}

export default Imageicon