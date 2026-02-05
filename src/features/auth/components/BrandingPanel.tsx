import { Camera, Sparkles } from "lucide-react"
import { Text } from"@/shared/components/common"

export function BrandingPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      {/* Gradient Background */}
       <div className="absolute inset-0 bg-gradient-to-b from-pink-300 via-pink-400 to-pink-300" />

      {/* Content */}
      <div className="relative z-10 flex flex-col w-full p-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <Text as="h1" variant="subtitle" color="white" className="font-semibold">
              PhotoGuru
            </Text>
            <Text variant="small" color="white" className="opacity-80">
              Professional Platform
            </Text>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-white" />
            <Text variant="small" color="white">
              Trusted by 10,000+ Photographers
            </Text>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4 leading-tight">
            Start your journey
            <br />
            <span >now</span>
          </h2>

          {/* Subtext */}
          <Text variant="small" color="white" align="center" className="opacity-90 mb-8" maxWidth="20rem">
            {"If you don't have an account yet, join us and start your journey."}
          </Text>

          {/* Sign Up Button */}
          <button className="px-16 py-3 rounded-full border-2 border-white/40 text-white hover:bg-white/10 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
