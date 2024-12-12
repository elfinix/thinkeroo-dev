import React from 'react';
import { Dot } from 'lucide-react';

function StudentClassPageOverview() {
  return (
    <div className="flex min-h-screen bg-primary-1 text-text-1 font-lexend ml-40"> {/* Adjust margins here for header and menu */}
      <div className="flex-1 p-4 md:p-6">
        <div className="p-4 flex flex-col space-y-4 mt-5">
          <div className="flex space-x-4">
            {/* Class Detail */}
            <div className="border-2 border-primary-3 p-4 rounded-xl w-60">
              <h2 className="text-xl text-text-1 font-semibold mb-4">Class Detail</h2>
              <p className="text-text-2 text-sm">Class Code:</p>
              <p className="text-base text-text-1 mb-3">wts-ygv-qsc</p>

              <p className="text-text-2 text-sm">Class Limit: </p>
              <p className="text-base text-text-1 mb-3">30</p>

              <p className="text-text-2 text-sm">Students:</p>
              <p className="text-base text-text-1 mb-3">29 Students</p>

              <p className="text-text-2 text-sm">Created: </p>
              <p className="text-base text-text-1 mb-3">11/20/2024</p>
            </div>

            {/* Class Image and Title */}
            <div className="border-2 border-primary-3 rounded-xl flex-1 relative">
              <img
                alt="Class banner with CSS3, XML, PHP icons"
                className="rounded-xl w-full h-full object-cover"
                src="https://via.placeholder.com/900x200"
              />
              <h2 className="absolute bottom-6 left-6 text-3xl font-semibold text-white z-10">
                Web System Technology 1
              </h2>
            </div>
          </div>

          {/* Message */}
          <div className="border-2 border-primary-3 p-4 rounded-xl ml-64">
            <div className="flex items-center mb-2">
              <img
                alt="User profile picture"
                className="w-10 h-10 rounded-full mr-2"
                height="40"
                src="https://storage.googleapis.com/a1aa/image/FjzTrAFWW146Pp2dZH4z7ZDU3IcpFhjS0BkG0wIyLAqiJTeJA.jpg"
                width="40"
              />
              <div className="flex items-center space-x-2">
                <p className="text-text-1">John Doe</p>
                <Dot className="text-text-2" size={20} />
                <p className="text-text-2">1:48 AM</p>
              </div>
            </div>
            <p className="text-text-1">
              Hello! This will be our class that we will use on this subject. All of the quizzes that we need to complete during this semester will be posted here on this channel. Please let me know if there are still students within your class that are not in this channel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentClassPageOverview;
