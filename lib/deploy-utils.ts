import { WebsiteData } from './types'

// Types for Vercel API responses
interface VercelDeployment {
  id: string
  url: string
  alias: string[]
  readyState: string
}

interface VercelProject {
  id: string
  name: string
}

export async function deployWebsite(data: WebsiteData) {
  try {
    if (!process.env.VERCEL_AUTH_TOKEN) {
      throw new Error('VERCEL_AUTH_TOKEN not configured')
    }

    if (!process.env.VERCEL_TEAM_ID) {
      throw new Error('VERCEL_TEAM_ID not configured')
    }

    // 1. Create a new project on Vercel
    const project = await createVercelProject(data.username)

    // 2. Create deployment files
    const files = await createDeploymentFiles(data)

    // 3. Create deployment
    const deployment = await createVercelDeployment(project.id, files)

    // 4. Add custom domain
    await addCustomDomain(project.id, data.username)

    // 5. Wait for deployment to be ready
    const deployedUrl = await waitForDeployment(deployment.id)

    return {
      success: true,
      deployedUrl: `https://${data.username}.yourdomain.com`
    }
  } catch (error) {
    console.error('Deployment error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to deploy website'
    }
  }
}

async function createVercelProject(username: string): Promise<VercelProject> {
  const response = await fetch('https://api.vercel.com/v9/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: username,
      framework: 'nextjs',
      gitRepository: null, // For direct deployments
      teamId: process.env.VERCEL_TEAM_ID,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create project: ${await response.text()}`)
  }

  return response.json()
}

async function createDeploymentFiles(data: WebsiteData) {
  // Generate the website files
  const files = [
    {
      file: 'package.json',
      data: JSON.stringify({
        name: data.username,
        version: '1.0.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
        },
        dependencies: {
          next: '^14.0.0',
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          'lucide-react': '^0.263.1',
        },
      }),
    },
    {
      file: 'pages/index.js',
      data: `
        import { PersonalWebsite } from '../components/templates/personal-website'
        
        export default function Home() {
          return <PersonalWebsite data={${JSON.stringify(data)}} />
        }
        
        export async function getStaticProps() {
          return {
            props: {},
            revalidate: 60,
          }
        }
      `,
    },
    // Add other necessary files (components, styles, etc.)
  ]

  // Convert files to base64
  return files.map(({ file, data }) => ({
    file,
    data: Buffer.from(data).toString('base64'),
  }))
}

async function createVercelDeployment(projectId: string, files: any[]): Promise<VercelDeployment> {
  const response = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: projectId,
      files,
      projectId,
      target: 'production',
      teamId: process.env.VERCEL_TEAM_ID,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create deployment: ${await response.text()}`)
  }

  return response.json()
}

async function addCustomDomain(projectId: string, username: string) {
  const domain = `${username}.yourdomain.com`
  
  const response = await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: domain,
      teamId: process.env.VERCEL_TEAM_ID,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to add custom domain: ${await response.text()}`)
  }

  return response.json()
}

async function waitForDeployment(deploymentId: string, maxAttempts = 20): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to check deployment status: ${await response.text()}`)
    }

    const deployment: VercelDeployment = await response.json()

    if (deployment.readyState === 'READY') {
      return deployment.url
    }

    if (deployment.readyState === 'ERROR') {
      throw new Error('Deployment failed')
    }

    // Wait for 2 seconds before next check
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  throw new Error('Deployment timeout')
}