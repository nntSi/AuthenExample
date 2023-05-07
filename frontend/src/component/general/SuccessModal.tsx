import React from "react";

export default function SuccessModal() {
  return (
    <div>
      <div className="fixed z-50 font-noto p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center w-full bg-opacity-75 bg-black">
        <div className="relative w-full h-full max-w-sm md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className=" text-center py-6">
              <div className="success-animation p-12">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
              <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-400">
                การดำเนินการเสร็จสิ้น
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
