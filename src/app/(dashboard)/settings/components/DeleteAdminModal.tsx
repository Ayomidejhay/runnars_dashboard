"use client";

export default function DeleteAdminModal({
  adminName,
  onConfirm,
  onCancel,
  isLoading,
}: {
  adminName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl py-6 px-[40px] w-[456px] h-[268px] flex flex-col justify-center text-center">
        <h3 className="text-2xl font-semibold mb-2 text-deepblue">
          Delete Admin
        </h3>

        <p className="text-sm text-gray-700 mb-10">
          Are you sure you want to delete this user? They will no longer have access to the Admin portal.
        </p>

        <div className="flex justify-end gap-3 text-sm">
          <button
            onClick={onCancel}
            className="border border-[#FFECEB] rounded-[100px]  w-[180px] h-[56px] flex items-center justify-center text-[#E41C11] bg-[#FFECEB]"
            disabled={isLoading}
          >
            No, Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="border border-[#FF3729] rounded-[100px]  w-[180px] h-[56px] flex items-center justify-center text-[#FFFFFF] bg-[#FF3729]"
          >
            {isLoading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
