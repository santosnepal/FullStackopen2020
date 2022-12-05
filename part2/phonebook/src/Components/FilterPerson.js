import React from 'react'
const FilterPerson =(props)=>{
    const {handelFilterChange} = props
return(
    <div>
         filter shown with :<input onChange={handelFilterChange}/>
    </div>
)
}
export default FilterPerson