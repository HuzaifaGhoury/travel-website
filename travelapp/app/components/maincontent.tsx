import React, { ChangeEvent, MouseEvent } from 'react';
import CommonBtn from './commonbtn';
import { useAppContext } from '../components/context';

const MainContent: React.FC = () => {
const { searchTerm, setSearchTerm } = useAppContext();

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
const newValue = e.target.value;
    setSearchTerm(newValue);
    console.log('Input value:', newValue);
};

const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Performing search with:', searchTerm);
};

return (
    <div className="relative bg-transparent-500 p-4 text-center mt-32">
      <h1 className="text-6xl font-bold">Enjoy Your Vacation With Us</h1>
      <p className="mt-10 text-2xl">
        Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum lorem sit
      </p>

      <div className="mt-8 flex items-center justify-center">
        <input
          className="w-96 h-12 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <CommonBtn buttonText="Search" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default MainContent; 