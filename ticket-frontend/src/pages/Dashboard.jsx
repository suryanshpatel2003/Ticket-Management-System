import { useEffect, useState } from "react"
import API from "../services/api"
import TicketForm from "../components/TicketForm"
import TicketCard from "../components/TicketCard"
import Navbar from "../components/Navbar"

export default function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [statusFilter, setStatusFilter] = useState("")

  const fetchTickets = async () => {
    const res = await API.get(`/tickets?status=${statusFilter}`)
    setTickets(res.data)
  }

  useEffect(() => {
    fetchTickets()
  }, [statusFilter])

  const deleteTicket = async (id) => {
    await API.delete(`/tickets/${id}`)
    fetchTickets()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="p-6 lg:p-10 max-w-7xl mx-auto">
        
        {/* Header Section with Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Control <span className="text-indigo-600">Center</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              You have <span className="text-indigo-600 font-bold">{tickets.length}</span> active support requests
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
            <span className="pl-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Filter:</span>
            <select
              className="px-4 py-2 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Tickets</option>
              <option value="open">🟢 Open</option>
              <option value="in-progress">🔵 In Progress</option>
              <option value="closed">⚪ Closed</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left Side: Create Form (Fixed Position on Desktop) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
               <TicketForm onAdd={fetchTickets} />
               
               {/* Quick Info Card */}
               <div className="mt-6 bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200">
                 <h3 className="font-bold text-lg mb-2">Need Help? 💡</h3>
                 <p className="text-indigo-100 text-xs leading-relaxed opacity-90">
                   High priority tickets are handled within 2 hours. Make sure to provide a clear description for faster resolution.
                 </p>
               </div>
            </div>
          </div>

          {/* Right Side: Tickets Grid */}
          <div className="lg:col-span-8">
            {tickets.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {tickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onDelete={deleteTicket}
                    // onStatusChange={updateStatus} // Ensure this is passed if needed
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="text-6xl mb-4 text-slate-200">🎫</div>
                <h3 className="text-xl font-bold text-slate-400">No tickets found</h3>
                <p className="text-slate-400 text-sm">Try changing the filter or create a new ticket.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}