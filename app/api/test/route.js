export async function POST() {
    return new Response(JSON.stringify({ words: 'Hello' }), {
      status:200,
      headers: {
        'Content-Type': 'application/json'

      },
    });

}