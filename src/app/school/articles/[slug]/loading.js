import { EsyLoader } from "@/components/EsyLoader";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex justify-center" style={{ color: "#00A896" }}>
            <EsyLoader size={48} label="Loading article" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Article...
          </h2>
          <p className="text-gray-600">
            Please wait while we load the content for you.
          </p>
        </div>
      </div>
    </div>
  );
} 