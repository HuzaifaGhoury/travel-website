"use client"
import React, { useState, useEffect  } from 'react';
import Layout from '../layout';
import { useLazyQuery } from '@apollo/client';
import { GetExperienceFilter } from '../graphql/queries';
import FilterSidebar from '../components/filtersidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart , faTimes } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../components/starrating'
// import CommonBtn from '../components/commonbtn';
import roadimg from '../../public/Images/roadimg.jpg'
import Image from 'next/image';
import Select from 'react-select';


interface Experience {
  id: string;
  mainImageUrl: string;
  name: string;
  highlights: string;
  averageRating: string;
  location: string;
  duration: string;
  experienceDate: { price: number }[]; 
}
   
const Page: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [initialExperiences, setInitialExperiences] = useState<Experience[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [fetchExperienceFilter, { data }] = useLazyQuery(GetExperienceFilter);
  const [selectedDuration, setSelectedDuration] = useState<string>('');


  const fetchData = async () => {
    try {
      const result = await fetchExperienceFilter({
        variables: {
          search: searchTerm,
          durations: selectedDuration !== '' ? [parseInt(selectedDuration)] : null,
        },
      });

      // console.log(result, 'result');
  
      if (result?.data?.experienceFilter) {
        setExperiences(result.data.experienceFilter);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error fetching data: ${error.message}`);
      } else {
        console.error('Unknown error fetching data');
      }
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [searchTerm, selectedDuration]);

  useEffect(() => {
    setInitialExperiences(experiences);
  }, [experiences]);

  const [likedImages, setLikedImages] = useState<string[]>([]);

  const handleLike = (experienceId: string) => {
    if (likedImages.includes(experienceId)) {
      setLikedImages((prevLikedImages) => prevLikedImages.filter((id) => id !== experienceId));
    } else {
      setLikedImages((prevLikedImages) => [...prevLikedImages, experienceId]);
    }
  };

  const getMinimumPrice = (prices: { price: number }[]): number | string => {
    if (prices.length === 0) {
      return 'No price available';
    }

    const minimumPrice = Math.min(...prices.map((date) => date.price));

    return minimumPrice;
  };

  const handleChange = (inputValue: string) => {
    setSearchTerm(inputValue);
  };
  
  const handleSearch = () => {
    console.log('Button clicked!');
        if (searchTerm.trim() !== '') {
      fetchData();
    } else {
      setExperiences(initialExperiences);
    }
  };
  
  
  const handleClearSearch = () => {
    setSearchTerm('');
    setExperiences(initialExperiences);
  };
  


  const handleFilterChange = (duration: string) => {
    setSelectedDuration(duration);
    filterExperiencesByDuration(duration);
  };

  const filterExperiencesByDuration = (duration: string) => {
    if (!duration) {
      setExperiences(initialExperiences); 
      return;
    }
    
    const [min, max] = duration.split('-').map(Number);
    const filteredExperiences = initialExperiences.filter((experience) => {
      const experienceDuration = parseInt(experience.duration, 10);
      return experienceDuration >= min && experienceDuration <= max;
    });

    setExperiences(filteredExperiences);
  };

  const options = experiences.map((experience) => ({
    value: experience.id,
    label: experience.name,
  }));

  return ( 
    <Layout>
      <div>
        <div className='relative w-full h-screen'>
          <Image src={roadimg} alt='bg-image' className='w-full h-full object-cover' />
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <h1 className='text-6xl font-bold'>Trust Our Experineces</h1>
            <p className='mt-10 text-2xl'>Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum lorem sit</p>
         <div className='flex'>

       
            <Select
  className='w-96'
  options={options}
  placeholder='Search...'
  isSearchable
  onInputChange={handleChange}
/>

<button onClick={handleSearch}>Search</button>
</div>
{searchTerm && (
  <FontAwesomeIcon
    icon={faTimes}
    className='absolute top-2 pl-52 text-xl cursor-pointer text-gray-500'
    onClick={handleClearSearch}
    />
    )}
{/* <button onClick={handleSearch}>Search</button> */}

</div>
</div>

        <div className="flex gap-6 ">
          <div>
          <FilterSidebar handleFilterChange={handleFilterChange} selectedDuration={selectedDuration} />

          </div>
          <div className=' flex gap-7 flex-col pb-3 pt-3'>
            {experiences.map((experience: Experience) => (
              <div className="flex" key={experience.id}>
                <div className="relative border border-solid border-gray-300 rounded-xl w-60 h-52">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`absolute top-2 right-2 text-xl cursor-pointer ${likedImages.includes(
                      experience.id
                    ) ? 'text-red-500' : 'text-white '}`}
                    onClick={() => handleLike(experience.id)}
                  />
                  <img
                    src={experience.mainImageUrl}
                    alt={`Experience ${experience.id}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-lg font-bold">{experience.name}</h2>
                    </div>
                    <div>
                      {experience.experienceDate.map((date, index) => (
                        <p>Price: ${getMinimumPrice(experience.experienceDate)}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div>
                      {experience.averageRating !== null ? (
                        <StarRating rating={parseFloat(experience.averageRating)} />
                      ) : (
                        <p>No Rating</p>
                      )}
                    </div>
                    <div>
                      <p>{experience.location}</p>
                    </div>
                  </div>
                  <div>
                    {Array.isArray(experience.highlights) && experience.highlights.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {experience.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No highlights available</p>
                    )}
                  </div>
                  <div>
                    <p>{experience.duration} Days</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
     
    </Layout>
  );
};

export default Page;