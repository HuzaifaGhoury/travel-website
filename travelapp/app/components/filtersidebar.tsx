import React from 'react';

const FilterSidebar = () => {
  return (
    <div className='lg:w-80 sm:w-full'>
      <div className="lg:w-80 sm:w-full bg-gray-300 h-96">
        <div className="flex gap-60">
          <h3>Filter</h3>
          <h3>Reset</h3>
        </div>
        <div className="flex items-center mt-5">
              <input type="checkbox" className="form-checkbox h-5 w-5 border-2 border-mustard text-mustard" />
              <label className="ml-2">Checkbox Label</label>
              <br/>
              
            </div>
            </div>
            </div>
  );
}

export default FilterSidebar;