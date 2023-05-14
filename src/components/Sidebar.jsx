import React, { useEffect, useState } from 'react'
import Filter from './Filter';


function Sidebar({ showEvent, isStacked, stackBy, setstackBy, setshowEvent, setData, data, events, computed, isUser2, setisUser2, days }) {
    const [filters, setfilters] = useState(
        {
            browser: null,
            operating_system: null,
            device_category: null,
            referrer: null,
            country: null,
            region: null,
            city: null,
            week_start_date: null,
            month_start_date: null,
            quarter_start_date: null,
            hour: null,

            channel: null,

        }

    )
    const [errMsg, seterrMsg] = useState("")
    const [addFilters, setaddFilters] = useState([])

    function handleInput(e) {

        const { value } = e.target;
        if (value == 'select') return;

        setshowEvent(prev => [...prev, value])

        e.target.value = 'select'

    }
    function handleDelete(e, event) {
        setshowEvent(prev => {
            let i = prev.indexOf(event);
            let newArr = [...prev];
            newArr.splice(i, 1);
            return newArr
        })

    }
    function addFilter() {
        setaddFilters(prev => (
            [...prev, prev.length + 1]
        ))
    }
    useEffect(() => {
        let tempData = [...data.datefiltered]
        console.log(filters);
        for (let key in filters) {
            console.log(key, filters[key])
            if (!filters[key]) continue;
            else {
                tempData = tempData.filter((x) => {
                    return x[key] == filters[key]
                })
            }
        }
        console.log(tempData)
        console.log('changed', days)
        setData(prev => (
            { ...prev, filtered: [...tempData] }
        ))

    }, [filters, days, computed])

    const [user2filters, setuser2filters] = useState(
        {
            browser: null,
            operating_system: null,
            device_category: null,
            referrer: null,
            country: null,
            region: null,
            city: null,
            week_start_date: null,
            month_start_date: null,
            quarter_start_date: null,
            hour: null,

            channel: null,
        }

    )
    const [user2addfilters, setuser2addfilters] = useState([])

    function user2addFilter() {
        setuser2addfilters(prev => (
            [...prev, prev.length + 1]
        ))
    }
    useEffect(() => {
        let tempData = [...data.datefiltered]

        for (let key in user2filters) {
            // console.log(key, user2filters[key])
            if (!user2filters[key]) continue;
            else {
                tempData = tempData.filter((x) => {
                    return x[key] == user2filters[key]
                })
            }
        }
        // console.log(tempData)
        setData(prev => (
            { ...prev, user2filtered: [...tempData] }
        ))
    }, [user2filters, days])
    function addUser2() {
        if (isStacked) {
            seterrMsg('Cannot add segment while stacked.')
            setTimeout(() => {
                seterrMsg('')
            }, 5000);
            return;
        }
        setisUser2(true);
    }
    function handleUser2Delete() {
        setisUser2(false);
        setuser2addfilters([]);
        setuser2filters(
            {
                browser: null,
                operating_system: null,
                device_category: null,
                referrer: null,
                country: null,
                region: null,
                city: null,
                week_start_date: null,
                month_start_date: null,
                quarter_start_date: null,
                hour: null,
                channel: null,
            }
        )
    }

    function handleStack(e) {
        const { value } = e.target;
        if (value == 'select') return;
        setstackBy(prev => {
            let tmp = { ...prev };
            for (let key in tmp) {
                tmp[key] = false
            }
            return { ...tmp, [value]: true }
        })

    }
    return (

        <div className='basis-1/2 flex h-screen border-r-2 border-gray-300'>
            <section className='basis-1/12 bg-blue-900'></section>
            <section className='basis-11/12  p-4'>
                <select name="allUsers" id="" className='w-44 p-[2px] border-[1px] border-gray-300 text-gray-500 rounded-md'>
                    <option value="exploreUsers" selected>Explore Users</option>
                </select>
                <div className="event border-t-2 border-gray-300 mt-4 p-2">
                    <div className="users pb-4">
                        <header className='flex justify-between p-2'>
                            <div className='flex justify-center items-center gap-2'>
                                {/* Dropdown is to Match the UI and not currently in use */ }
                                <select name="users" id="" className='w-14 p-[2px] border-[1px] border-gray-300 text-gray-500 rounded-md'>
                                    <option value="" selected>All</option>
                                    <option value="" disabled>Active</option>
                                    <option value="" disabled>New</option>
                                    <option value="" disabled>Unique</option>
                                </select>
                                <p>User 1</p>
                                <select name="operand" id="" className='border-[1px] p-[2px] border-gray-300 text-gray-500 rounded-md'>
                                    <option value="" selected>and</option>
                                    <option value="" >or</option>
                                </select>
                            </div>
                            <div>

                                <button onClick={ addFilter } className='p-1 px-3 border-gray-300 font-bold'>+ where</button>

                            </div>
                        </header>
                        <section className=''>
                            { addFilters.map((x, i) => {
                                return <Filter user2={ false } setfilters={ setfilters } i={ i } id={ i } setaddFilters={ setaddFilters } key={ x } x={ x } data={ data } filters={ filters } />
                            }) }
                        </section>
                    </div>
                    { !isUser2 && <button className='p-1 m-2 px-2 font-semibold' onClick={ addUser2 }>+  Add Segment</button> }
                    { isUser2 && <>
                        <div className="users border-b-2 border-gray-300 pb-4">
                            <header className='flex p-2 justify-between'>
                                <div className='flex justify-center items-center gap-2'>
                                    <select name="users" id="" className='w-14 p-[2px] border-[1px] border-gray-300 text-gray-500 rounded-md'>
                                        <option value="" selected>All</option>
                                        <option value="" disabled>Active</option>
                                        <option value="" disabled>New</option>
                                        <option value="" disabled>Unique</option>
                                    </select>
                                    <p>User 2</p>
                                    <select name="operand" id="" className='border-[1px] p-[2px] border-gray-300 text-gray-500 rounded-md'>
                                        <option value="" selected>and</option>
                                        <option value="" >or</option>
                                    </select>
                                </div>
                                <div className='flex justify-center items-center'>

                                    <button onClick={ user2addFilter } className='p-1 px-3 border-gray-300 font-bold'>+ where</button>

                                    <button className='px-2' onClick={ handleUser2Delete }><img src={ require('../images/delete.png') } alt="" className='h-6 w-6' /></button>
                                </div>
                            </header>
                            <section className=''>
                                { user2addfilters.map((x, i) => {
                                    return <Filter user2={ true } setfilters={ setuser2filters } id={ i } setaddFilters={ setuser2addfilters } key={ x } x={ x } data={ data } filters={ user2filters } />
                                }) }
                            </section>
                        </div>

                    </>
                    }
                    { isStacked && <section className='flex items-center'>
                        <p>Compare by</p>
                        <select onInput={ handleStack } name="stack" id="stack" className='m-4 hover:cursor-pointer w-44 p-[2px] border-[1px] border-gray-300 text-gray-500 rounded-md focus:outline-none disabled:opacity-50 disabled:bg-gray-600'>
                            <option value="select" selected>Select</option>
                            { Object.keys(stackBy).map((event, i) => (
                                <option selected={ stackBy[event] } className='p-1 disabled:opacity-50 disabled:bg-[#437eeb] disabled:text-white' key={ i } value={ event }>{ event }</option>
                            )) }

                        </select>
                    </section> }
                    <h1 className='m-2 text-lg font-semibold'>Events performed in following order</h1>
                    <section className='flex flex-col gap-1'>
                        { showEvent.map((event, i) => (
                            <div className='p-1 m-1 flex justify-between'>
                                <p key={ i }>
                                    <span className='p-1 m-1 border-[1px] rounded-md border-gray-200'>Click</span>
                                    <span className='p-1 m-1 border-[1px] rounded-md border-gray-200'>{ event }</span>
                                </p>
                                <button onClick={ (e) => handleDelete(e, event) }>
                                    <img src={ require('../images/delete.png') } alt="" className='h-6 w-6' />
                                </button>
                            </div>

                        )) }
                    </section>
                    <select onInput={ handleInput } name="events" id="cars" className='m-4 hover:cursor-pointer w-44 p-[2px] border-[1px] border-gray-300 text-gray-500 rounded-md focus:outline-none disabled:opacity-50 disabled:bg-gray-600'>
                        <option value="select" selected>Select</option>
                        { events.map((event, i) => (
                            <option className='p-1 disabled:opacity-50 disabled:bg-[#437eeb] disabled:text-white' key={ i } disabled={ showEvent.includes(event) } value={ event }>{ event }</option>
                        )) }

                    </select>

                </div>
                { errMsg != '' && <p className='text-sm text-red-500 text-center'>{ errMsg }</p> }

            </section>
        </div >
    )
}

export default Sidebar