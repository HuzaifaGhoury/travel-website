"use client"
import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import { useLazyQuery } from '@apollo/client';
import { GetExperienceFilter} from '../graphql/queries';
import Filter from '../components/filtersidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../components/starrating'
import { useAppContext } from '../components/context';


interface Experience {
  id: string;
  mainImageUrl: string;
  name:string;
  highlights:string;
  averageRating:string;
  location:string;
  duration:string;
  experienceDate: { price: number }[];
}

const Page = () => {
  const { searchTerm, setSearchTerm } = useAppContext();
  const [loadExperiences, { loading, error, data }] = useLazyQuery(GetExperienceFilter);

  useEffect(() => {
    if (searchTerm) {
      loadExperiences({ variables: {searchTerm}});
    }
  }, [searchTerm, loadExperiences]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const experiences: Experience[] = data?.experienceFilter || [];

  const filteredExperiences = experiences.filter((experience) =>
    experience.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  
  return (
    <Layout>
      <div className="flex gap-10">
        <div>
          <Filter/>
        </div>
        <div>
          <h1 className="text-xl ml-2">Experiences</h1>
          <div className="flex flex-col gap-4 mt-3">
            {experiences.map((experience: Experience) => (
             <div className='flex'>
               <div key={experience.id} className="relative border border-solid border-gray-300 rounded-xl w-60 h-52">
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`absolute top-2 right-2 text-xl cursor-pointer ${
                    likedImages.includes(experience.id) ? 'text-red-500' : 'text-white '
                  }`}
                  onClick={() => handleLike(experience.id)}
                />
                <img
                  src={experience.mainImageUrl}
                  alt={`Experience ${experience.id}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="p-4">
                <div className='flex justify-between'>
                  <div><h2 className="text-lg font-bold">{experience.name}</h2></div>
                  <div >
                  {experience.experienceDate.map((date, index) => (
  <p>Price: ${getMinimumPrice(experience.experienceDate)}</p>))}
                </div>
                </div>
<div className='flex gap-10'>
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