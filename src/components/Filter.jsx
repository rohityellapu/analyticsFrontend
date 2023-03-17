import React, { useState } from 'react'

function Filter({ filters, x, setfilters, id, setaddFilters, data }) {
    const [filtervalues, setfiltervalues] = useState(['Chrome', 'Safari'])
    const [filterName, setName] = useState('')
    function handleFilter(e) {
        const { value } = e.target;
        setName(value)
        let temp = [...data.filtered]
        let options = new Set()
        switch (value) {

            case 'browser':
                setfiltervalues(['Chrome', 'Safari', 'Firefox']);
                break;
            case 'operating_system':
                setfiltervalues(['iPhone', 'Windows', 'Linux', 'Macintosh', 'X11', 'Android 12'])
                break;
            case 'country':
                options.clear()
                for (let record of temp) {
                    options.add(record.country)
                }
                setfiltervalues([...options])

                break;
            case 'region':

                options.clear()
                for (let record of temp) {
                    options.add(record.region)
                }
                setfiltervalues([...options])
                // if (filters['country']) {

                // }
                // setfiltervalues(['Telangana', 'Maharashtra','Tamil Nadu', 'Andhra Pradesh'])
                break;
            case 'city':
                options.clear()
                for (let record of temp) {
                    options.add(record.region)
                }
                setfiltervalues([...options])
                // setfiltervalues(['Bengaluru', 'Hyderabad', 'Mumbai', 'Kolkata'])
                break;
            case 'device_category':
                setfiltervalues(['Desktop', 'Mobile'])

        }
        e.target.disabled = true
    }
    function handleFilterValue(e) {
        const { value } = e.target;
        setfilters(prev => (
            { ...prev, [filterName]: value }
        ))
        e.target.disabled = true
    }
    function handleDelete() {
        setfilters(prev => (
            { ...prev, [filterName]: null }
        ))
        setaddFilters(prev => {
            let temp = [...prev];
            temp.splice(id, 1);
            return temp;
        })
    }
    return (
        <div className='flex gap-1 items-center justify-between'>
            <span className='p-1 m-2 px-3 border-[1px] border-gray-200'>Where</span>
            <select className='w-20' name={ `filterName${x}` } onInput={ handleFilter } id="">
                <option value="" disabled selected>Select</option>
                { Object.keys(filters).map(x1 => {
                    return <option value={ x1 }>
                        { x1 }
                    </option>
                }) }
            </select>
            <span className='p-1 px-3 m-2 border-[1px] border-gray-200'>=</span>
            <select className="w-20" onInput={ handleFilterValue } name="filer_value" id="">
                <option value="" disabled selected>Select</option>
                { filtervalues.map(x => {
                    return <option value={ x }>{ x }</option>
                }) }
            </select>
            <button className='w-10' onClick={ handleDelete }> <img src="https://img.icons8.com/ios-glyphs/256/trash--v3.png" alt="" className='h-6 w-6' /></button>
        </div>
    )
}

export default Filter