// export const getParticipationDisplayValue = (
//   participationRules: {
//     whoCanParticipate: string;
//     segmentCriteria?: {
//       petFitScoreRange?: string;
//       specificPetTypes?: string[];
//     };
//   }
// ): string => {
//   const { whoCanParticipate, segmentCriteria } = participationRules;

//   switch (whoCanParticipate) {
//     case "specific_pet_type": {
//       const pets = segmentCriteria?.specificPetTypes ?? [];
//       return pets.length > 0 ? pets.join(", ") : "Specific pet type";
//     }

//     case "users_with_min_fit_score": {
//       return segmentCriteria?.petFitScoreRange
//         ? `PetFit score: ${segmentCriteria.petFitScoreRange}`
//         : "Users with minimum PetFit score";
//     }

//     case "new_users":
//       return "New users";

//     case "all_users":
//       return "All users";

//     default:
//       return whoCanParticipate.replace(/_/g, " ");
//   }
// };


export const getParticipationDisplayValue = (
  whoCanParticipate: string,
): string => {
  switch (whoCanParticipate) {
    case "all_users":
      return "All users";

    case "new_users":
      return "New users";

    case "specific_pet_types":
      return "Specific pet types";

    case "users_with_min_fit_score":
      return "Users with minimum PetFit score";

    default:
      return whoCanParticipate.replace(/_/g, " ");
  }
};
