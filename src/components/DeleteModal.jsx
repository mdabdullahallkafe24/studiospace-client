
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trash2, X, AlertTriangle } from "lucide-react";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  studioName = "this studio",
}) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (!onConfirm) {
      toast.info("Delete functionality will work after backend integration.");
      return;
    }

    try {
      setLoading(true);
      await onConfirm();
      toast.success("Studio deleted successfully.");
      onClose?.();
    } catch (error) {
      toast.error(error.message || "Failed to delete studio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangle size={27} />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            disabled={loading}
            className="rounded-full bg-[#F0EEE8] p-2 text-[#252724] hover:bg-[#E5E1D8]"
          >
            <X size={18} />
          </button>
        </div>

        <h2
          id="delete-title"
          className="text-2xl font-semibold text-[#252724]"
        >
          Delete Studio?
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#777970]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#252724]">
            {studioName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn flex-1 rounded-xl border-[#E9E6DE] bg-white text-[#252724] hover:bg-[#F0EEE8]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
           
          >
            <Trash2 size={16} />
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
