import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button, Input, Text } from "@/shared/components/common"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <Text as="h2" className="text-3xl font-bold text-[#1a1a2e] mb-2">
          Sign In
        </Text>
        <Text color="muted">Continue your creative journey</Text>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          inputSize="lg"
        />

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <Text as="label" className="text-sm font-medium text-gray-700">
              Password
            </Text>
            <a href="#" className="text-sm text-[#c44569] hover:underline">
              Forgot Password?
            </a>
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            inputSize="lg"
            icon={showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            onIconClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          fullWidth
          className="rounded-full py-3"
        >
          Sign In
        </Button>
      </form>

      {/* Sign Up Link */}
      <Text align="center" color="muted" className="mt-6">
        {"Don't have an account? "}
        <a href="#" className="text-[#c44569] hover:underline font-medium">
          Sign up
        </a>
      </Text>
    </div>
  )
}
