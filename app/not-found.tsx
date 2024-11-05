import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">404</h1>
            <p className="mt-2 text-base text-gray-500">Page not found</p>
            <p className="mt-1 text-sm text-gray-500">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-6">
              <Link href="/">
                <Button>Go back home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}