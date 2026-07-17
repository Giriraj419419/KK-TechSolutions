const url = "https://script.google.com/macros/s/AKfycbzUXqxjWNgQhMeURqGylnluZCG_i1zEIH2FzqkydEv-hY-JJwn3hbTct7UpJMlbMWSQ/exec";

async function run() {
  console.log("Fetching POST with get_bookings...");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: "2026-07-17",
        time: "10:00 AM",
        email: "test@example.com"
      })
    });
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text.substring(0, 500));
  } catch(e) {
    console.error(e);
  }
}
run();
