'use client';

import PetFitScore from "./PetFitScore";


type PetInfoProps = {
  pet: {
    petName: string;
    breed: string;
    status: string;
    age: string;
    weight?: string;
    ownerName: string;
    petfitScore: number;
    scoreChange?: number;
    percentile?: number;
  };
};

const PetInfo = ({ pet }: PetInfoProps) => {
  return (
    <div className="p-6 bg-white  border border-neutral-200  rounded-lg">
      <h2 className="text-lg font-semibold text-neutral-900  mb-4">
        Pet information
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-3xl">
            🐕
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-neutral-900 ">
                {pet.petName}
              </span>
              <span className="text-sm text-neutral-500">
                ({pet.breed})
              </span>
            </div>

            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium w-fit mt-1">
              {pet.status}
            </span>

            <div className="text-sm text-neutral-500 mt-1">
              {pet.age} years
            </div>
            <div className="text-sm text-neutral-500">
              {pet.weight}
            </div>
            <div className="text-sm text-neutral-500">
              Owned by {pet.ownerName}
            </div>
          </div>
        </div>

        <PetFitScore
          score={pet.petfitScore}
          label="PetFit Score"
          change={`${pet.scoreChange}`}
          percentile={`${pet.percentile}`}
        />
      </div>
    </div>
  );
};

export default PetInfo;
