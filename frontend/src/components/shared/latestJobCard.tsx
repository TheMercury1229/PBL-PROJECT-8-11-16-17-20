import { Badge } from '../ui/badge';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { PreferredJobOutput } from '@/types/types';



const LatestJobCard = ({ object }: { object: PreferredJobOutput }) => {

  const navigate = useNavigate();
  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Card clicked");
    navigate("/jobdesc" , { state: object });
  };
  return (
    <div
      onClick={handleClick}
      className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'
    >
      <div>
        <h1 className='font-bold text-lg'>{object.job_title}</h1>
        <p className='text-sm text-gray-600'>{object.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <p>{object.location}</p>
      </div>
    </div>
  );
};

export default LatestJobCard;
