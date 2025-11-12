export const config = {
  runtime: 'edge', // pastikan pakai edge runtime
};

let views = 0;

export default async function handler(req) {
  if (req.method === 'POST') {
    views++;
  }

  return new Response(
    JSON.stringify({ views }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  );
}
