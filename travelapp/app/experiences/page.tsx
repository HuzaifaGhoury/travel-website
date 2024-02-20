"use client"
import React, { useState, useEffect , ChangeEvent, MouseEvent } from 'react';
import Layout from '../layout';
import { useLazyQuery } from '@apollo/client';
import { GetExperienceFilter } from '../graphql/queries';
import Filter from '../components/filtersidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../components/starrating'
// import { useAppContext } from '../components/context';
import CommonBtn from '../components/commonbtn';

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
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [fetchExperienceFilter, { data }] = useLazyQuery(GetExperienceFilter);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchExperienceFilter({
          variables: {
            search: searchTerm,
          },
        });

        setExperiences(result?.data?.experienceFilter || []);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error fetching data: ${error.message}`);
        } else {
          console.error('Unknown error fetching data');
        }
      }
    };

    fetchData();
  }, [searchTerm]);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    console.log('Input value:', newValue);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    if (searchTerm) {
      console.log(searchTerm, 'search term');
      console.log(experiences, 'original experiences');

      const updatedFilteredExperiences = experiences.filter((experience: Experience) =>
        experience.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log(updatedFilteredExperiences, 'filtered experiences');
      setExperiences(updatedFilteredExperiences);
    }
  };

  return (
    <Layout>
      <div className="flex gap-10">
        
        <div>
          <Filter />
        </div>
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
        <div>
          <h1 className="text-xl ml-2">Experiences</h1>
          <div className="flex flex-col gap-4 mt-3">
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
                        <p key={index}>Price: ${getMinimumPrice(experience.experienceDate)}</p>
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