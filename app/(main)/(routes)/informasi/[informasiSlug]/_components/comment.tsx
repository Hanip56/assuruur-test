import React from "react";

const Comment = () => {
  return (
    <div className="space-y-6 border-b py-8">
      <div className="flex items-center justify-between">
        {/* user */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-1">
            <b>Kaedehara</b>
            <small>25 Februari 2024</small>
          </div>
        </div>
        {/* reply */}
        <button className="font-semibold text-blueAssuruur px-4 py-2 hover:opacity-70">
          Reply
        </button>
      </div>
      <div>
        <p className="text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          est laudantium sed.
        </p>
      </div>
    </div>
  );
};

export default Comment;
