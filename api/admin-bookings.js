import supabase from './db-client.js';

export default async function handler(req, res) {
  // Simple basic auth or secret token in real world.
  // For this implementation, we allow access to demonstrate the functionality.

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        return res.status(500).json({ error: 'Failed to fetch bookings' });
      }

      return res.status(200).json({ success: true, bookings: data || [] });
    } catch (error) {
      console.error('API Failure:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Booking ID is required' });

      // We actually delete it so the slot becomes entirely free and the UNIQUE constraint is lifted.
      // Alternatively, we could update status to 'Cancelled' and remove date/time to avoid UNIQUE constraint clashes.
      // Deletion is the simplest way to free the constraint in Supabase without complex updates.
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error:', error);
        return res.status(500).json({ error: 'Failed to cancel booking' });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('API Failure:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
