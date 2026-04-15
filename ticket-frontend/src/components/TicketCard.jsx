export default function TicketCard({ ticket, onDelete, onStatusChange, onAssign, isAdmin }) {
  const config = {
    high: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', dot: 'bg-rose-500' },
    medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', dot: 'bg-amber-500' },
    low: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', dot: 'bg-indigo-500' }
  }

  const theme = config[ticket.priority?.toLowerCase()] || config.low

  const formatDate = (date) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="relative bg-white border border-slate-200 rounded-[2rem] transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1 overflow-hidden group">
      
      {/* Top Section: Title & Priority */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${theme.bg} ${theme.text} ${theme.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
            {ticket.priority}
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
            ID-{ticket.id?.toString().slice(-5)}
          </span>
        </div>

        <h2 className="text-lg font-black text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
          {ticket.title}
        </h2>
        <p className="text-xs text-slate-500 line-clamp-2 font-medium leading-relaxed">
          {ticket.description}
        </p>

        {/* Category & Assignee Info */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/50 flex items-center gap-1">
            📁 {ticket.category}
          </span>
          <div className="flex items-center gap-1.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${ticket.assigned_to ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
              {ticket.assigned_to ? '👤' : '?'}
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              {ticket.assigned_to ? `User ${ticket.assigned_to}` : "Unassigned"}
            </span>
          </div>
        </div>
      </div>

      {/* Perforated Divider (Ticket Aesthetic) */}
      <div className="relative px-4">
        <div className="border-t-2 border-dashed border-slate-100 w-full"></div>
        {/* Ticket Notches */}
        <div className="absolute -left-3 -top-2 w-5 h-5 bg-slate-50 border border-slate-200 rounded-full"></div>
        <div className="absolute -right-3 -top-2 w-5 h-5 bg-slate-50 border border-slate-200 rounded-full"></div>
      </div>

      {/* Bottom Section: Date & Actions */}
      <div className="bg-slate-50/50 p-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-[10px]">📅</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">{formatDate(ticket.created_at)}</span>
          </div>
          <span className="text-[10px] font-black text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
            {ticket.status}
          </span>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1.5">
            {isAdmin && !ticket.assigned_to && (
              <button
                onClick={() => onAssign(ticket.id)}
                className="bg-indigo-600 text-white px-3 py-1.5 text-[10px] font-black uppercase rounded-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95"
              >
                Claim Ticket
              </button>
            )}

            {isAdmin && ticket.status !== "closed" && (
              <>
                <button
                  onClick={() => onStatusChange(ticket.id, "in-progress")}
                  className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg hover:bg-slate-50 transition"
                >
                  ⚡ Start
                </button>
                <button
                  onClick={() => onStatusChange(ticket.id, "closed")}
                  className="bg-emerald-600 text-white px-3 py-1.5 text-[10px] font-black uppercase rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition active:scale-95"
                >
                  Done
                </button>
              </>
            )}
          </div>

          {onDelete && (
            <button
              onClick={() => onDelete(ticket.id)}
              className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
              title="Delete Permanently"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}