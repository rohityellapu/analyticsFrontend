import React, { useEffect, useState } from 'react'
import PostTime from './PostTime'
import Bar from './Bar'

function Main({ computed, isStacked, stackBy, setisStacked, setcomputed, showEvent, setData, data, loading, setDays, days, exportToCsv, isUser2 }) {
    const [stacks, setstacks] = useState([])
    const [errMsg, seterrMsg] = useState("")
    useEffect(() => {
        if (!isStacked || Object.entries(stackBy).filter((val) => stackBy[val[0]]).length == 0) return;
        let tmp = [...data.filtered];
        let stks = {}

        let compare = Object.entries(stackBy).filter((val) => stackBy[val[0]])[0][0];
        for (let obj of tmp) {
            if (stks[obj[compare]]) stks[obj[compare]] += 1;
            else stks[obj[compare]] = 1
        }
        stks = Object.entries(stks)
        stks.sort((a, b) => b[1] - a[1])
        let others = ['Others', 0, 0.0]
        for (let i = 0; i < stks.length; i++) {
            stks[i][2] = (stks[i][1] * 100 / tmp.length).toFixed(1)
            if (i > 3) {
                others[1] = others[1] + stks[i][1]
                others[2] = (others[2] + (stks[i][1] * 100 / tmp.length))
            }
        }

        let top5 = stks.slice(0, 4);
        if (stks.length > 5) {
            others[2] = Math.ceil(others[2])
            top5.push(others)
        }

        setstacks(top5);
    }, [isStacked, stackBy, data])


    function handleToggle(e) {
        switch (e.target.innerText) {
            case 'Today':
                // Should be changed to new Date() in production
                var now = new Date('2023-04-17');
                var filter = new Date(now.getTime() - 1 * 24 * 3600 * 1000);
                var newData = data.unfiltered.filter((val) => {
                    return filter <= (new Date(val.date))
                });
                console.log(newData);
                setData(prev => {
                    return {
                        ...prev, datefiltered: newData
                    }
                })
                break;

            case '7D':
                var now = new Date('2023-04-17');
                var filter = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
                var newData = data.unfiltered.filter((val) => {
                    return filter <= (new Date(val.date))
                });
                console.log(newData);
                setData(prev => {
                    return {
                        ...prev, datefiltered: newData
                    }
                })
                break;
            case '3M':

                var now = new Date('2023-04-17');
                var filter = new Date(now.getTime() - 90 * 24 * 3600 * 1000);
                var newData = data.unfiltered.filter((val) => {
                    return filter <= (new Date(val.date))
                });
                console.log(newData);
                setData(prev => {
                    return {
                        ...prev, datefiltered: newData
                    }
                })
                break;
            case '2M':
                var now = new Date('2023-04-17');
                var filter = new Date(now.getTime() - 60 * 24 * 3600 * 1000);
                var newData = data.unfiltered.filter((val) => {
                    return filter <= (new Date(val.date))
                });
                console.log(newData);
                setData(prev => {
                    return {
                        ...prev, datefiltered: newData
                    }
                })
                break;
            case '45D':
                var now = new Date('2023-04-17');
                var filter = new Date(now.getTime() - 45 * 24 * 3600 * 1000);
                var newData = data.unfiltered.filter((val) => {
                    return filter <= (new Date(val.date))
                });
                console.log(newData);
                setData(prev => {
                    return {
                        ...prev, datefiltered: newData
                    }
                })
                break;
            default:
                var now = new Date('2023-04-17');
                var filter = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
                var newData = data.unfiltered.filter((val) => {
                    return filter <= (new Date(val.date))
                });
                console.log(newData);
                setData(prev => {
                    return {
                        ...prev, datefiltered: newData
                    }
                })
                break;


        }
        if (e.target.innerText == 'Today') {
            setDays('1')
        }
        else if (e.target.innerText == '7D') {
            setDays('7')
        }
        else if (e.target.innerText == '45D') {
            setDays('45')
        }
        else if (e.target.innerText == '3M') {
            setDays('90')
        }
        else if (e.target.innerText == '2M') {
            setDays('60')
        }
        else {
            setDays('30')
        }

    }
    function handleRefresh() {

        setcomputed((new Date()).getTime())
    }
    function handleBar() {
        if (isUser2) {
            seterrMsg('Cannot convert to segment on two segments.')
            setTimeout(() => {
                seterrMsg('')
            }, 5000);
            return
        }
        setisStacked(prev => !prev)
    }

    return (
        <div className='basis-1/2 p-3'>
            <section className='pl-8'>

                <h1 className='text-xl font-bold p-1 pb-0'>Untitled funnel</h1>
                <p className='text-sm p-1'>No description</p>
            </section>
            <section className='flex justify-between items-center p-4 m-4 text-md shadow-lg shadow-gray-400 border-gray-300 rounded-lg border-[1px]'>
                <div className="filter border-[1px] border-gray-400 border-opacity-75 rounded-full">

                    <button onClick={ handleToggle } style={ { background: `${days[days.length - 1] == '1' ? '#437eeb' : 'white'}`, color: `${days[days.length - 1] == '1' ? 'white' : 'black'}` } } className='border-r-[1px] border-gray-400 px-2 p-1 rounded-l-full'>Today</button>
                    <button onClick={ handleToggle } style={ { background: `${days[days.length - 1] == '7' ? '#437eeb' : 'white'}`, color: `${days[days.length - 1] == '7' ? 'white' : 'black'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>7D</button>
                    <button onClick={ handleToggle } style={ { background: `${days[days.length - 2] == '3' ? '#437eeb' : 'white'}`, color: `${days[days.length - 2] == '3' ? 'white' : 'black'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>30D</button>
                    <button onClick={ handleToggle } style={ { background: `${days[days.length - 2] == '4' ? '#437eeb' : 'white'}`, color: `${days[days.length - 2] == '4' ? 'white' : 'black'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>45D</button>
                    <button onClick={ handleToggle } style={ { background: `${days[days.length - 2] == '6' ? '#437eeb' : 'white'}`, color: `${days[days.length - 2] == '6' ? 'white' : 'black'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>2M</button>
                    <button onClick={ handleToggle } style={ { background: `${days[days.length - 2] == '9' ? '#437eeb' : 'white'}`, color: `${days[days.length - 2] == '9' ? 'white' : 'black'}` } } className='border-r-[1px] border-gray-400 px-2 p-1 rounded-r-full'>3M</button>

                </div>
                <div className="refresh flex gap-2 items-center justify-center">
                    <button onClick={ handleRefresh } className='flex items-center bg-[#437EEB] text-white p-1 px-3 rounded-full hover:saturate-150 gap-1 active:scale-95'> <img src={ require('../images/refresh.png') } className='h-3 w-3' alt="" /> Refresh</button>
                    <p className='text-sm'>Computed <PostTime date={ computed } /></p>
                </div>
            </section>
            { loading && <div className='w-full flex items-center justify-center p-5'>
                <img className='h-12 w-12' src={ require('../images/loading.gif') } alt="" />
            </div> }

            <div className='p-4 m-4 text-md shadow-lg shadow-gray-400 border-gray-300 rounded-lg border-[1px]'>
                <div className="filter border-[1px] w-fit border-gray-400 rounded-md my-4 border-opacity-75">

                    <button onClick={ handleBar } style={ { background: `${!isStacked ? '#437eeb' : 'white'}`, color: `${!isStacked ? 'white' : 'black'}` } } className='border-r-[1px] border-gray-400 px-2 p-1 rounded-l-md'>Bar</button>
                    <button onClick={ handleBar } style={ { background: `${isStacked ? '#437eeb' : 'white'}`, color: `${isStacked ? 'white' : 'black'}` } } className='border-r-[1px] border-gray-400 px-2 p-1 rounded-r-md'>Stacked</button>

                </div>
                { showEvent.length == 0 && <p>Select an Event to show Data.</p> }
                { isStacked && <section className='flex items-center justify-center gap-5 my-5'>
                    { stacks.map((stack, i) => {
                        return <div className='flex-col justify-center text-center items-center'>
                            <div className='flex justify-center items-center gap-1'>
                                <div className={ `w-4 h-4 rounded-full bg-blue-${(5 - i) + 2}00` }></div>
                                <h4 className='text-sm font-semibold'>{ stack[0] }</h4>
                            </div>
                            <p className='text-xs'>Conversion rate</p>
                            <p className='text-xs'>{ stack[2] }%</p>
                        </div>
                    }) }


                </section> }
                <div className={ isUser2 && 'flex gap-1 gap-x-6' }>

                    <div className='flex basis-1/2 flex-col gap-2 justify-between items-center'>
                        <h1>User segment 1</h1>

                        { showEvent.map((event, i) => {
                            return <Bar user2={ false } stacks={ stacks } isStacked={ isStacked } stackBy={ stackBy } days={ days } data={ data } key={ event + i } event={ event } />
                        }) }
                    </div>
                    { isUser2 && <div className='flex basis-1/2 flex-col gap-2 justify-between items-center'>
                        <h1>User segment 2</h1>

                        { showEvent.map((event, i) => {
                            return <Bar user2={ true } stacks={ stacks } isStacked={ isStacked } stackBy={ stackBy } days={ days } data={ data } key={ event + i } event={ event } />
                        }) }
                    </div> }
                </div>
            </div>
            <div className='p-4 m-4 text-md shadow-lg shadow-gray-400 border-gray-300 rounded-lg border-[1px]'>
                <button onClick={ exportToCsv } className='flex gap-1 items-center hover:scale-105 active:scale-95 duration-500'> <img src={ require('../images/export.png') } className='
                h-5 w-5' alt="" /> Export to CSV</button>
            </div>
            { errMsg != '' && <p className='text-sm text-red-500 text-center'>{ errMsg }</p> }

        </div>
    )
}

export default Main;