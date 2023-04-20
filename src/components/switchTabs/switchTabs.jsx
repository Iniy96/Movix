import React, { useState } from 'react'
import "./switchtabs.scss"

const switchTabs = ({data,onTabChange}) => {

    const [selectedTab, setselectedTab] = useState(0)
    const [left, setleft] = useState(0)

    const activeTab=(tab,index)=>{
        setleft(index * 100)
        setTimeout(()=>{
            setselectedTab(index)
        },300)
        onTabChange(tab,index)
    }

  return (
    <div className='switchingTabs'>
        <div className="tabItems">
            {
                data.map((tab,index)=>{
                  return  <span key={index} 
                    className={`tabItem ${selectedTab ===index?"active":""} `}
                    onClick={()=>activeTab(tab,index)}>
                        {tab}
                    </span>
                })
            }
            <span className="movingBg" style={{left}}>

            </span>
        </div>
    </div>
  )
}

export default switchTabs