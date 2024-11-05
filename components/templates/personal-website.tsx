'use client'

import { Mail, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { WebsiteData } from "@/lib/types"

interface PersonalWebsiteProps {
  data: WebsiteData;
}

export default function PersonalWebsite({ data }: PersonalWebsiteProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
      {/* Header Section */}
      <header className="text-center max-w-2xl mx-auto w-full">
        <p className="text-[#5eead4] tracking-wide mb-4">
          <span className="mr-2">ENGINEER.</span>
          <span>MUSICIAN.</span>
        </p>
        <h1 className="text-5xl font-bold mb-8 tracking-tight">
          {data.name.toUpperCase()}
        </h1>
        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image
            src={data.profileImage || "/profile.jpg"}
            alt="Profile"
            width={192}
            height={192}
            className="rounded-full object-cover"
            priority
          />
        </div>
        <div className="flex justify-center gap-4">
          <Link href={data.twitterUrl} className="hover:text-[#5eead4] transition-colors">
            <Twitter className="w-6 h-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href={`mailto:${data.email}`} className="hover:text-[#5eead4] transition-colors">
            <Mail className="w-6 h-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </header>

      {/* Projects Section */}
      <section className="max-w-4xl w-full mt-20">
        <h2 className="text-2xl text-center mb-12">Projects I have worked on..</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: data.project1Title, image: data.project1Image },
            { title: data.project2Title, image: data.project2Image }
          ].map((project, index) => (
            <Link key={index} href="#" className="block">
              <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-[#5eead4] transition-colors">
                <CardContent className="p-0">
                  <Image
                    src={project.image || `/project${index + 1}.jpg`}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg text-white">{project.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Video Section */}
      {data.videoUrl && (
        <section className="max-w-4xl w-full mt-12">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={data.videoUrl}
              title="Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="max-w-md w-full mt-12">
        <h2 className="text-2xl text-center mb-6">Stay up to date</h2>
        <form className="space-y-4">
          <Input
            type="text"
            placeholder="Name"
            className="bg-transparent border-zinc-800 focus:border-[#5eead4] transition-colors"
          />
          <Input
            type="email"
            placeholder="Email"
            className="bg-transparent border-zinc-800 focus:border-[#5eead4] transition-colors"
          />
          <Button
            type="submit"
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            Join Me!
          </Button>
        </form>
      </section>
    </div>
  )
}