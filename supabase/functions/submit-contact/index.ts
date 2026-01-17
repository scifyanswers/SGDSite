import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const AIRTABLE_API_URL = "https://api.airtable.com/v0/appoZcE3LSbmki0aE/Table%201";
const AIRTABLE_TOKEN = "patnfD6JnTmKdIsnm.0b8eedb296fcbc0d9bcda27fe4222a8c09e56597748f0d3dcfc1ca30bddba580";

interface ContactFormData {
  reason: string;
  name: string;
  company: string;
  email: string;
  description: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: ContactFormData = await req.json();

    const airtablePayload = {
      fields: {
        "Primary reason for reaching out": formData.reason,
        "Name": formData.name,
        "Company": formData.company || "",
        "Work email": formData.email,
        "Technical problem description": formData.description,
        "Submitted At": new Date().toISOString(),
      },
    };

    const response = await fetch(AIRTABLE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airtablePayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Airtable API error:", errorText);
      throw new Error(`Airtable API returned status ${response.status}`);
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error submitting to Airtable:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
