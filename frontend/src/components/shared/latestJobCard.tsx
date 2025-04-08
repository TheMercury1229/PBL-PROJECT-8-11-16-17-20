import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { PreferredJobOutput } from '@/types/types';
import { getProperTitle } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, Clock, BadgeDollarSign } from 'lucide-react';

const LatestJobCard = ({ object }: { object: PreferredJobOutput }) => {
  const navigate = useNavigate();
  
  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Card clicked");
    navigate("/jobdesc", { state: object });
  };

  // Convert skills string to array if it's a string
  const skillsArray = typeof object.skills === 'string' 
    ? object.skills.split(' ').map(skill => skill.trim())
    : [];

  return (
    <Card 
      onClick={handleClick}
      className="transition-all duration-300 hover:shadow-lg hover:border-blue-200 cursor-pointer w-full"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-blue-800">
          {getProperTitle(object.job_title)}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {object.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          {object.experience && (
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{getProperTitle(object.experience)} Experience</span>
            </div>
          )}
          
          {object.salary_range && (
            <div className="flex items-center gap-1 text-gray-600">
              <BadgeDollarSign className="h-4 w-4" />
              <span>{object.salary_range}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start gap-3 pt-2">
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-600" />
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {getProperTitle(object.location)}
            </Badge>
          </div>
          
          {object.preference && (
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-gray-600" />
              <Badge variant="outline" className="bg-gray-50">
                {object.preference}
              </Badge>
            </div>
          )}
        </div>
        
        {skillsArray.length > 0 && (
          <div className="flex flex-wrap gap-5 w-full">
            {skillsArray.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                {getProperTitle(skill)}
              </Badge>
            ))}
            {skillsArray.length > 3 && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                +{skillsArray.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default LatestJobCard;