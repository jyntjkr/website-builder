import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Create your personal website in minutes
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Build a professional personal website with our easy-to-use generator. 
            No coding required. Get your own subdomain instantly.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link href="/generator">
              <Button size="lg" className="rounded-full">
                Create Your Website
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Easy to Use</h3>
                <p className="mt-2 text-base text-gray-500">
                  Fill out a simple form with your information and get a beautiful website instantly.
                </p>
              </div>
            </div>
            <div className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Custom Domain</h3>
                <p className="mt-2 text-base text-gray-500">
                  Get your own custom subdomain instantly after creating your website.
                </p>
              </div>
            </div>
            <div className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Professional Design</h3>
                <p className="mt-2 text-base text-gray-500">
                  Modern, responsive design that looks great on all devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}