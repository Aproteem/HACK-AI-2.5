import React from 'react'
import RiskMeter from './RiskMeter'

const Summary = () => {
    const riskPercentage = 90;

  return (
    <div className="flex flex-col items-center w-full ">
        <div className="flex flex-col items-center justify-center mt-16 text-white w-full">
          <h1 className="text-5xl font-bold mb-6">  Our LLM's take on file_name_description</h1>
          <div className='flex flex-row gap-14'>
              <div className='w-[40vw] h-full px-3 py-5 rounded-[25px] border-[5px] bg-transparent flex flex-col text-center justify-center'>
                <div className='text-[24px] font-bold'>Executive summary</div>
                <div className='text-[14px] font-bold opacity-70'>sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY </div>
              </div>
              <div className='w-[40vw] h-full px-3 py-5 rounded-[25px] border-[5px] bg-transparent flex flex-col text-center justify-center'>
                <div className='text-[24px] font-bold'>Corporate overview</div>
                <div className='text-[14px] font-bold opacity-70'>sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY sUMMARY </div>
              </div>
            </div>
          <div className="text-center text-md  font-bold mb-16 w-1/2"> </div>
        </div>
        <div className='flex flex-row justify-around items-center gap-14 bg-black/80 p-6 rounded-[20px]'>
          <div className='flex flex-row gap-14'>
            <div className='flex flex-col gap-14'>
              <div className='w-[260px] h-[120px] rounded-[25px] border-[3px] bg-transparent flex flex-col text-center justify-center'>
                <div className='text-[24px] font-bold'>Revenue</div>
                <div className='text-[18px] font-bold opacity-89'>INR 120 Million</div>
              </div>
              <div className='w-[260px] h-[120px] rounded-[25px] border-[3px] bg-transparent flex flex-col text-center justify-center'>
                <div className='text-[24px] font-bold'>Revenue</div>
                <div className='text-[18px] font-bold opacity-89'>INR 120 Million</div>
              </div>
            </div>
            <div className='flex flex-col gap-14'>
              <div className='w-[260px] h-[120px] rounded-[25px] border-[3px] bg-transparent flex flex-col text-center justify-center'>
                <div className='text-[24px] font-bold'>Revenue</div>
                <div className='text-[18px] font-bold opacity-89'>INR 120 Million</div>
              </div>
              <div className='w-[260px] h-[120px] rounded-[25px] border-[3px] bg-transparent flex flex-col text-center justify-center'>
                <div className='text-[24px] font-bold'>Revenue</div>
                <div className='text-[18px] font-bold opacity-89'>INR 120 Million</div>
              </div>
            </div>
          </div>
          <RiskMeter  value={1001} increase={true} header={"Revenue"}/>
          <RiskMeter value={750} increase={false} header={"Profit"}/>
      </div>
    </div>
  )
}

export default Summary