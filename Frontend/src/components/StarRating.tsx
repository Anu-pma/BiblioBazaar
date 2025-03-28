import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  onRate,
  interactive = false,
}: StarRatingProps) {
  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => (
        <button
          key={index}
          onClick={() => interactive && onRate?.(index + 1)}
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'} p-0.5`}
          disabled={!interactive}
        >
          <Star
            size={size}
            className={`${
              index < rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}