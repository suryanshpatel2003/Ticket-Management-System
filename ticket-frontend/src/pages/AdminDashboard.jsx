import { useEffect, useState } from "react"
import API from "../services/api"
import TicketCard from "../components/TicketCard"
import Navbar from "../components/Navbar"

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([])
  const [stats, setStats] = useState({})
  const [statusFilter, setStatusFilter] = useState("")

  const fetchTickets = async () => {
    try {
      const res = await API.get(`/tickets?status=${statusFilter}`)
      setTickets(res.data)
    } catch (err) {
      console.error("Error fetching tickets", err)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await API.get("/tickets/admin/stats")
      setStats(res.data)
    } catch (err) {
      console.error("Error fetching stats", err)
    }
  }

  useEffect(() => {
    fetchTickets()
    fetchStats()
  }, [statusFilter])

  const deleteTicket = async (id) => {
    await API.delete(`/tickets/${id}`)
    fetchTickets()
    fetchStats()
  }

  const updateStatus = async (id, status) => {
    await API.patch(`/tickets/${id}/status`, null, {
      params: { status },
    })
    fetchTickets()
    fetchStats()
  }

  const assignTicket = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      const userId = user?.id || 1

      if (!userId) {
        alert("User ID not found, please login again")
        return
      }

      await API.patch(`/tickets/${id}/assign`, null, {
        params: { user_id: userId },
      })

      fetchTickets()
      fetchStats()
    } catch (err) {
      console.error("Assign error:", err.response?.data || err)
    }
  }

  const inProgressCount = tickets.filter((t) => t.status === "in-progress").length

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="p-6 lg:p-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Admin <span className="text-indigo-600">Command Center</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic">
              Logged in as <span className="text-indigo-600 font-bold underline">Administrator</span>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <span className="pl-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filter By</span>
            <select
              className="px-4 py-2 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Systems</option>
              <option value="open">🟢 Open Tickets</option>
              <option value="in-progress">🔵 In Progress</option>
              <option value="closed">⚪ Resolved</option>
            </select>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Tickets" value={stats.total} icon="📁" theme="indigo" />
          <StatCard title="Open Requests" value={stats.open} icon="🔥" theme="amber" />
          <StatCard title="In Progress" value={inProgressCount} icon="⏳" theme="blue" />
          <StatCard title="Resolved" value={stats.closed} icon="✅" theme="emerald" />
        </div>

        {/* Tickets Grid Feed */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
             <h2 className="font-black text-slate-900 uppercase tracking-tighter text-lg">System Feed</h2>
             <div className="h-[2px] flex-grow bg-slate-200 rounded-full"></div>
          </div>

          {tickets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onDelete={deleteTicket}
                  onStatusChange={updateStatus}
                  onAssign={assignTicket}
                  isAdmin={true}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-slate-200">
              <div className="text-5xl mb-4 grayscale opacity-40">🎫</div>
              <h3 className="text-xl font-bold text-slate-300">Queue is empty</h3>
              <p className="text-slate-400 text-sm">No tickets found for this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// Reusable Premium StatCard
function StatCard({ title, value, icon, theme }) {
  const styles = {
    indigo: 'bg-indigo-600 shadow-indigo-200 text-white',
    amber: 'bg-white text-amber-600 border-slate-200',
    blue: 'bg-white text-blue-600 border-slate-200',
    emerald: 'bg-white text-emerald-600 border-slate-200'
  }

  return (
    <div className={`p-6 rounded-[2rem] border transition-all duration-300 hover:shadow-xl ${theme === 'indigo' ? styles.indigo : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-xl ${theme === 'indigo' ? 'bg-white/20' : 'bg-slate-50'}`}>
          {icon}
        </div>
        <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${theme === 'indigo' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
          Live
        </div>
      </div>
      <p className={`text-[11px] font-bold uppercase tracking-tight opacity-70 mb-1 ${theme === 'indigo' ? 'text-indigo-100' : 'text-slate-400'}`}>
        {title}
      </p>
      <h2 className={`text-4xl font-black ${theme === 'indigo' ? 'text-white' : 'text-slate-900'}`}>
        {value || 0}
      </h2>
    </div>
  )
}