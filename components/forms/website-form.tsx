'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WebsiteData } from "@/lib/types"
import PersonalWebsite from "../templates/personal-website"

export default function WebsiteForm() {
  const [formData, setFormData] = useState<WebsiteData>({
    name: "",
    title: "",
    profileImage: "",
    twitterUrl: "",
    email: "",
    project1Title: "",
    project1Image: "",
    project2Title: "",
    project2Image: "",
    videoUrl: "",
    username: ""
  })

  const [isDeploying, setIsDeploying] = useState(false)
  const [deployedUrl, setDeployedUrl] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDeploying(true)
    setError("")

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setDeployedUrl(data.deployedUrl)
      } else {
        setError(data.error || 'Failed to deploy website')
      }
    } catch (err) {
      setError('An error occurred while deploying the website')
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <h1 className="text-3xl font-bold mb-8">Create Your Personal Website</h1>
          <form onSubmit={handleDeploy} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div>
              <Label htmlFor="username">Username (for your subdomain)</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                pattern="[a-z0-9-]+"
                title="Lowercase letters, numbers, and hyphens only"
              />
            </div>
            
            {/* Rest of the form fields */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {/* Add all other form fields similarly */}
            
            <Button
              type="submit"
              className="w-full"
              disabled={isDeploying}
            >
              {isDeploying ? 'Deploying...' : 'Deploy Website'}
            </Button>

            {error && (
              <p className="text-red-500 mt-2">{error}</p>
            )}

            {deployedUrl && (
              <div className="mt-4">
                <p className="text-green-600">Website deployed successfully!</p>
                <a
                  href={deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit your website
                </a>
              </div>
            )}
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
          <div className="border rounded-lg overflow-hidden">
            <PersonalWebsite data={formData} />
          </div>
        </div>
      </div>
    </div>
  )
}