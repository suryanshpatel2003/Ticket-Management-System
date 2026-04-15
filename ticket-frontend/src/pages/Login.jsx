import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import API from "../services/api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      // 🔥 FIX: JSON body send karna hai (NOT params)
      const res = await API.post("/auth/login", {
        email,
        password,
      })

      console.log("Login success:", res.data)

      login(res.data)

      if (res.data.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/dashboard")
      }

    } catch (err) {
      console.error("Login error:", err.response?.data || err)
      alert(err.response?.data?.detail || "Login failed ❌")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md px-6 z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl shadow-indigo-100 mb-4 border border-indigo-50">
            <span className="text-3xl">🎫</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">
            Welcome <span className="text-indigo-600">Back</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Log in to manage your support tickets
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100"
        >
          <div className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-xs text-slate-500">Email</label>
              <input
                type="email"
                required
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-slate-500">Password</label>
              <input
                type="password"
                required
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition">
              Sign In →
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}