export const config = { runtime: 'edge' };

// Simpan nilai views di memory (reset setiap deploy)
let views = 0;

export default async function handler(req) {
  // handle preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  // handle POST untuk increment
  if (req.method === 'POST') {
    views++;
    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: corsHeaders(),
    });
  }

  // handle GET untuk baca nilai sekarang
  if (req.method === 'GET') {
    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: corsHeaders(),
    });
  }

  // method lain
  return new Response("Method not allowed", {
    status: 405,
    headers: corsHeaders(),
  });
}

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

