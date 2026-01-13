'use client';
export default function Page4() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-12 transform transition-all hover:scale-105 duration-300 border border-gray-700 flex flex-col items-center justify-center">

                    {/* Heading */}
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
                        Group 4
                    </h1>

                    {/* Thank You Message */}
                    <p className="text-3xl text-gray-200 font-medium text-center">
                        Thankyou.
                    </p>

                    {/* Decorative Elements */}
                    <div className="flex justify-center gap-3 mt-8">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}