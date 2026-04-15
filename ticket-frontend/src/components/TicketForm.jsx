import { useState } from "react"
import API from "../services/api"

export default function TicketForm({ onAdd }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("low")
  const [category, setCategory] = useState("general")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post("/tickets", null, {
        params: { title, description, priority, category },
      })
      onAdd()
      setTitle("")
      setDescription("")
      setPriority("low")
      setCategory("general")
    } catch (err) {
      console.error("Failed to create ticket", err)
    }
  }

  return (
    <div className="max-w-md mx-auto mb-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 p-7 rounded-[2.5rem] shadow-xl shadow-slate-200/40 relative overflow-hidden"
      >
        {/* Subtle Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-blue-600" />

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-xl font-[1000] text-slate-900 tracking-tight">Create Ticket</h2>
        </div>

        <div className="space-y-4">
          {/* Title Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Issue Title</label>
            <input
              placeholder="What's going on?"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Detailed Description</label>
            <textarea
              placeholder="Provide more context..."
              rows="3"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Selection Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Priority</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Category</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="general">General</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Req</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full mt-4 group relative flex items-center justify-center px-4 py-4 font-black text-[11px] uppercase tracking-widest text-white transition-all duration-300 bg-slate-900 rounded-2xl hover:bg-indigo-600 shadow-xl shadow-slate-200 active:scale-[0.98]">
            <span className="flex items-center gap-2">
              Generate Ticket
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}