import React, { useState } from 'react'
import PostTime from './PostTime'
import Bar from './Bar'

function Main({ data, loading, setApi, api, events, exportToCsv }) {
    const [computed, setcomputed] = useState((new Date()).getTime())
    function handleToggle(e) {
        if (e.target.innerText == 'Today') {
            setApi('http://localhost:3005?past=1')
        }
        else if (e.target.innerText == '7D') {
            setApi('http://localhost:3005?past=7')
        }
        else if (e.target.innerText == '3M') {
            setApi('http://localhost:3005?past=90')
        }
        else if (e.target.innerText == '6M') {
            setApi('http://localhost:3005?past=180')
        }
        else {
            setApi('http://localhost:3005?past=30')
        }
        setcomputed((new Date()).getTime())
    }

    return (
        <div className='basis-2/3 p-3'>
            <section className='pl-8'>

                <h1 className='text-xl font-bold p-1 pb-0'>Untitled funnel</h1>
                <p className='text-sm p-1'>No description</p>
            </section>
            <section className='flex justify-between items-center p-4 m-4 text-md shadow-lg shadow-gray-400 border-gray-300 rounded-lg border-[1px]'>
                <div className="filter border-[1px] border-gray-400 border-opacity-75 rounded-md">
                    <button className='border-r-[1px] p-1 border-gray-400 px-2'>Custom</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 1] == '1' ? 'skyblue' : 'white'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>Today</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 1] == '7' ? 'skyblue' : 'white'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>7D</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 2] == '3' ? 'skyblue' : 'white'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>30D</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 2] == '9' ? 'skyblue' : 'white'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>3M</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 2] == '8' ? 'skyblue' : 'white'}` } } className='px-2 p-1'>6M</button>
                </div>
                <div className="refresh flex gap-2 items-center justify-center">
                    <button onClick={ handleToggle } className='flex items-center bg-blue-900 text-white p-1 px-3 rounded-full hover:saturate-150 gap-1 active:scale-95'> <img src={ require('../images/refresh.png') } className='h-3 w-3' alt="" /> Refresh</button>
                    <p className='text-sm'>Computed <PostTime date={ computed } /></p>
                </div>
            </section>
            { loading && <div className='w-full flex items-center justify-center p-5'>
                <img className='h-12 w-12' src={ require('../images/loading.gif') } alt="" />
            </div> }

            <div className='p-4 m-4 text-md shadow-lg shadow-gray-400 border-gray-300 rounded-lg border-[1px]'>
                <p className='m-2 p-1 rounded-md px-3 bg-blue-900 text-white w-fit'>Bar</p>
                { Object.keys(events).filter(x => events[x] == true).length == 0 && <p>Select an Event to show Data.</p> }
                <div className='flex flex-col gap-2 justify-between items-center'>


                    { Object.keys(events).filter(x => events[x] == true).map((event, i) => {
                        return <Bar data={ data } key={ event + i } event={ event } />
                    }) }
                </div>
            </div>
            <div className='p-4 m-4 text-md shadow-lg shadow-gray-400 border-gray-300 rounded-lg border-[1px]'>
                <button onClick={ exportToCsv } className='flex gap-1 items-center hover:scale-105 active:scale-95 duration-500'> <img src="https://img.icons8.com/external-regular-kawalan-studio/256/external-export-arrows-regular-kawalan-studio.png" className='
                h-5 w-5' alt="" /> Export to CSV</button>
            </div>

        </div>
    )
}

export default Main;