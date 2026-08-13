import { NextResponse } from "next/server";

// Lead form handler. Validates the submission server-side and returns a
// success payload. Wire up real delivery (e.g. Resend, SMTP, or a CRM
// webhook) by reading `RESEND_API_KEY` / `LEAD_INBOX_EMAIL` from env and
// sending the message inside the try block below — no external call is
// made yet because no credentials were provided.
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const buildingType = String(formData.get("buildingType") || "").trim();

    if (!name || !phone || !email || !buildingType) {
      return NextResponse.json(
        { ok: false, error: "Vyplňte prosím jméno, telefon, e-mail a typ objektu." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ ok: false, error: "Zadejte platnou e-mailovou adresu." }, { status: 400 });
    }

    const photos = formData.getAll("photos").filter((item): item is File => item instanceof File && item.size > 0);

    // TODO: send an email / webhook notification here once credentials exist.
    console.info("[poptavka] new lead", {
      name,
      phone,
      email,
      service: formData.get("service"),
      buildingType,
      area: formData.get("area"),
      message: formData.get("message"),
      photoCount: photos.length,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[poptavka] failed to process submission", error);
    return NextResponse.json({ ok: false, error: "Poptávku se nepodařilo odeslat. Zkuste to prosím znovu." }, { status: 500 });
  }
}
