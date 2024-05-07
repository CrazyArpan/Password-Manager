import React from 'react';

function Footer() {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center h-24  w-full'>
      <div className='logo font-bold text-2xl'>
        <span className='text-green-500'>&lt;</span>
        Pass
        <span className='text-green-500'>OP/&gt;</span>
      </div>
      <div className='flex items-center'>
        Created with <img src="/heart2.png" alt="" className='ml-1 mr-1' style={{ width: '25px', height: '25px' }} /> by Arpan
      </div>
    </div>
  );
}

export default Footer;
