 

const ProfileShimmer = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-44 font-sans text-gray-800 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-start gap-8">
        {/* Profile Picture Skeleton */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gray-300 rounded-xl" />
        </div>

        {/* Right Section */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            {/* Name Skeleton */}
            <div className="w-1/3 h-6 bg-gray-300 rounded" />
            {/* Email Skeleton */}
            <div className="w-1/4 h-4 bg-gray-300 rounded" />
            {/* Edit Link Skeleton */}
            <div className="w-12 h-4 bg-gray-300 rounded" />
          </div>

          {/* Info Section Skeleton */}
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="flex flex-col gap-1" key={i}>
                <div className="w-1/3 h-3 bg-gray-300 rounded" />
                <div className="w-2/3 h-4 bg-gray-300 rounded" />
              </div>
            ))}
          </div>

          {/* Preferences Skeleton */}
          <div>
            <div className="w-24 h-3 bg-gray-300 rounded mb-2" />
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 px-6 py-2 rounded-full w-20 h-6"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShimmer;
