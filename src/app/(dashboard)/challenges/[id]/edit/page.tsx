// "use client";

// import React from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import BasicInfo from "../../(new-challenge)/new-challenge/components/BasicInfo";
// import Reward from "../../(new-challenge)/new-challenge/components/Reward";
// import Schedule from "../../(new-challenge)/new-challenge/components/Schedule";
// import GoalMetric from "../../(new-challenge)/new-challenge/components/GoalMetric";

// import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
// import { useSubmitChallenge } from "@/hooks/useSubmitChallenge";
// import { useChallenge } from "@/hooks/useChallenges";

// export default function Page({ params }: { params: { id: string } }) {
//   const { id } = params;
//   const router = useRouter();

//   const { submit, isLoading } = useSubmitChallenge({ mode: "edit" });

//   const {
//     step,
//     setStep,
//     isStepValid,
//     markStepTouched,
//     basicInfo,
//   } = useChallengeBuilderStore();

//   const [showDiscardModal, setShowDiscardModal] = React.useState(false);

//   const steps = ["Basic Info", "Goal & Metric", "Schedule", "Rewards"];

//   /* -----------------------------
//      Navigation (same as create)
//   ------------------------------ */
//   const nextStep = () => {
//     markStepTouched(step);
//     if (!isStepValid(step)) return;
//     setStep(Math.min(step + 1, steps.length));
//   };

//   const prevStep = () => setStep(Math.max(step - 1, 1));

//   /* -----------------------------
//      Discard (NO reset yet)
//   ------------------------------ */
//   const handleDiscard = () => {
//     router.push("/challenges");
//   };

//   if (!id) return null;

//   return (
//     <div>
//       {/* HEADER */}
//       <div className="flex justify-between items-center border-b border-[#E1E1E1] px-10">
//         <div className="flex gap-4 items-center h-14">
//           <button onClick={() => setShowDiscardModal(true)}>
//             <Image src="/close.svg" alt="close" width={24} height={24} />
//           </button>

//           <p className="text-[24px] text-deepblue capitalize font-bold">
//             edit challenge
//           </p>
//         </div>
//       </div>

//       <div className="flex border-b border-[#E1E1E1]">
//         <div className="basis-[60%] pt-6 px-10 flex flex-col gap-6">
//           {step === 1 && <BasicInfo />}
//           {step === 2 && <GoalMetric />}
//           {step === 3 && <Schedule />}
//           {step === 4 && <Reward />}
//         </div>

//         {/* MOBILE PREVIEW */}
//         <div className="basis-[40%] border-l border-[#E1E1E1] h-[850px] p-6">
//           <p className="font-bold text-deepblue text-[20px] mb-14">
//             Preview mobile
//           </p>

//           <div className="relative flex justify-center mt-14">
//             <Image src="/iphone.svg" alt="phone" width={308} height={622} />

//             <div className="absolute top-[50px] w-[250px] bg-white z-10 rounded-xl shadow">
//               <div className="p-3">
//                 <h2 className="mt-4 text-[18px] font-bold text-deepblue">
//                   {basicInfo.challengeName}
//                 </h2>

//                 <p className="text-[14px] text-gray-500 mt-1">
//                   Challenge Type :{" "}
//                   <span className="capitalize">
//                     {basicInfo.challengeType}
//                   </span>
//                 </p>

//                 <p className="text-[14px] text-gray-700 mt-3 line-clamp-4">
//                   {basicInfo.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* NAVIGATION */}
//       <div
//         className={`flex mt-6 px-10 ${
//           step === 1 ? "justify-end" : "justify-between"
//         }`}
//       >
//         {step > 1 && (
//           <button
//             onClick={prevStep}
//             className="bg-brightblue rounded-[32px] text-white w-[90px] h-[48px]"
//           >
//             Back
//           </button>
//         )}

//         {step < steps.length && (
//           <button
//             onClick={nextStep}
//             disabled={!isStepValid(step)}
//             className={`rounded-[32px] w-[190px] h-[48px] ${
//               isStepValid(step)
//                 ? "bg-brightblue text-white"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             Next: {steps[step]} →
//           </button>
//         )}

//         {step === steps.length && (
//           <button
//             disabled
//             className="bg-gray-300 rounded-[32px] text-gray-500 w-[120px] h-[48px]"
//           >
//             Update
//           </button>
//         )}
//       </div>

//       {/* DISCARD MODAL */}
//       {showDiscardModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
//             <h3 className="text-[18px] font-bold text-deepblue mb-4">
//               Exit Edit Mode?
//             </h3>
//             <p className="text-[14px] text-gray-600 mb-6">
//               Any unsaved changes will be lost.
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowDiscardModal(false)}
//                 className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDiscard}
//                 className="px-4 py-2 rounded-lg bg-red-500 text-white"
//               >
//                 Exit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import BasicInfo from "../../(new-challenge)/new-challenge/components/BasicInfo";
import Reward from "../../(new-challenge)/new-challenge/components/Reward";
import Schedule from "../../(new-challenge)/new-challenge/components/Schedule";
import GoalMetric from "../../(new-challenge)/new-challenge/components/GoalMetric";

import { useChallengeBuilderStore } from "@/stores/useChallengeBuilderStore";
import { useSubmitChallenge } from "@/hooks/useSubmitChallenge";
import { useChallenge } from "@/hooks/useChallenges";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    step,
    setStep,
    isStepValid,
    markStepTouched,
    basicInfo,
    initializeFromApi,
    hasHydratedFromServer,
    reset,
  } = useChallengeBuilderStore();

  const { submit, isLoading: isSubmitting } = useSubmitChallenge({
    mode: "edit",
    challengeId: id ?? "",
  });

  const { data: challengeData, isLoading, error } = useChallenge(id as string);

  const mode = useChallengeBuilderStore((s) => s.mode);

  const [loadedChallengeId, setLoadedChallengeId] = useState<string | null>(null);

  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const steps = ["Basic Info", "Goal & Metric", "Schedule", "Rewards"];

  // useEffect(() => {
  //   if (!challengeData || !id || hasHydratedFromServer) return;



  //   initializeFromApi(challengeData.data, id);
  //   toast.success("Challenge loaded for editing");
  // }, [
  //   challengeData,
  //   id,
  //   hasHydratedFromServer,
  //   initializeFromApi,
  //   reset,
  //   mode,
  // ]);

    useEffect(() => {
    if (!challengeData || !id) return;

    // Only reset + load if it's a new challenge ID
    if (loadedChallengeId !== id) {
      reset(); // clear previous challenge state
      initializeFromApi(challengeData.data, id);
      setLoadedChallengeId(id);
      toast.success("Challenge loaded for editing");
    }
  }, [challengeData, id, initializeFromApi, reset,mode, loadedChallengeId]);

  const nextStep = () => {
    markStepTouched(step);
    if (!isStepValid(step)) return;
    setStep(Math.min(step + 1, steps.length));
  };
  const prevStep = () => setStep(Math.max(step - 1, 1));

  // Discard changes
  const handleDiscard = () => {
    reset();
    router.push("/challenges");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading challenge: {error.message}</p>;

  return (
    <div>
      {/* HEADER */}
      <div className="flex gap-4 items-center border-b border-[#E1E1E1] px-10 mb-5">
        <button
          //cursor-pointer
          onClick={() => router.back()}
          className="flex gap-4 items-center text-deepblue"
        >
          <Image src="/arrow-back.svg" alt="icon" width={18} height={14} />
          
        </button>
        <div className="flex justify-between items-center">
          <h1 className="capitalize text-[24px] font-bold text-deepblue">
            edit challenges details
          </h1>
        </div>
      </div>

      <div className="flex border-b border-[#E1E1E1]">
        <div className="basis-[60%] pt-6 px-10 flex flex-col gap-6">
          {step === 1 && <BasicInfo />}
          {step === 2 && <GoalMetric />}
          {step === 3 && <Schedule />}
          {step === 4 && <Reward />}
        </div>

        {/* MOBILE PREVIEW */}
        <div className="basis-[40%] border-l border-[#E1E1E1] h-[850px] p-6">
          <p className="font-bold text-deepblue text-[20px] mb-14">
            Preview mobile
          </p>

          <div className="relative flex justify-center mt-14">
            <Image src="/iphone.svg" alt="phone" width={308} height={622} />
            <div className="absolute top-[50px] w-[250px] bg-white z-10 rounded-xl shadow">
              {basicInfo.coverImage && (
                <Image
                  src={URL.createObjectURL(basicInfo.coverImage)}
                  alt="cover"
                  width={260}
                  height={120}
                  className="rounded-t-xl object-cover"
                />
              )}
              <div className="p-3">
                <h2 className="mt-4 text-[18px] font-bold text-deepblue">
                  {basicInfo.challengeName}
                </h2>

                <p className="text-[14px] text-gray-500 mt-1">
                  Challenge Type :{" "}
                  <span className="capitalize">{basicInfo.challengeType}</span>
                </p>

                <p className="text-[14px] text-gray-700 mt-3 line-clamp-4">
                  {basicInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div
        className={`flex mt-6 px-10 ${step === 1 ? "justify-end" : "justify-between"}`}
      >
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-brightblue rounded-[32px] text-white w-[90px] h-[48px]"
          >
            Back
          </button>
        )}

        {step < steps.length && (
          <button
            onClick={nextStep}
            disabled={!isStepValid(step)}
            className={`rounded-[32px] w-[190px] h-[48px] ${
              isStepValid(step)
                ? "bg-brightblue text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next: {steps[step]} →
          </button>
        )}

        {step === steps.length && (
          <button
            onClick={submit}
            disabled={!isStepValid(step) || isSubmitting}
            className={`rounded-[32px] w-[120px] h-[48px] ${
              isStepValid(step) && !isSubmitting
                ? "bg-brightblue text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        )}
      </div>

      {/* DISCARD MODAL */}
      {showDiscardModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
            <h3 className="text-[18px] font-bold text-deepblue mb-4">
              Exit Edit Mode?
            </h3>
            <p className="text-[14px] text-gray-600 mb-6">
              Any unsaved changes will be lost.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDiscardModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDiscard}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
