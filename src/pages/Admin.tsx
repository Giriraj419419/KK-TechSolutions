import { useState, useEffect } from 'react';
import { Trash2, Loader2, CalendarX2, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

interface Booking {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin-bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchBookings();
  }, []);

  const cancelBooking = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking? This will permanently delete it and release the slot.')) {
      return;
    }
    
    setCancellingId(id);
    try {
      const res = await fetch(`/api/admin-bookings?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setBookings(bookings.filter(b => b.id !== id));
      } else {
        alert('Failed to cancel booking.');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('An error occurred.');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-[auto] lg:min-h-[75vh] bg-[#060b13] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <SEO title="Admin Portal | KK Tech Solutions" description="Admin portal for KK Tech Solutions." noindex={true} />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage all consultation bookings</p>
          </div>
          <button 
            onClick={fetchBookings}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-colors"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
            <CalendarX2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Bookings Found</h3>
            <p className="text-gray-400">There are no upcoming consultations scheduled.</p>
          </div>
        ) : (
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="text-xs uppercase bg-black/40 text-gray-400 border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 font-bold tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Client</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Service</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                    <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-white">{b.date}</div>
                        <div className="text-cyan-400 font-medium">{b.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{b.name}</div>
                        <div className="text-gray-500">{b.email}</div>
                        {b.company && b.company !== 'N/A' && (
                          <div className="text-xs text-blue-400 mt-1">{b.company}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-semibold text-gray-300">
                          {b.service}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-green-400 font-bold text-xs uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => cancelBooking(b.id)}
                          disabled={cancellingId === b.id}
                          className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Cancel & Release Slot"
                        >
                          {cancellingId === b.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
