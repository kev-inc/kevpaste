// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type PasteData = {
  body: string;
};

type PasteError = {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PasteData | PasteError>,
) {
  const {
    query: { id }, body,
    method,
  } = req;
  const { PASTEBIN_API_TOKEN } = process.env

  if (method === "GET") {
    if (id) {
      const url = 'https://pastebin.com/raw/' + id
      const response = await fetch(url)
      if (response.status !== 200) {
        return res.status(404).json({ error: "Not found" })
      }
      const data = await response.text()
      res.status(200).json({ body: data });
    } else {
      res.status(400).json({ error: "id missing" });
    }
  } else if (method === "POST") {
    if (!PASTEBIN_API_TOKEN) {
      return res.status(400).json({ error: "Missing PASTEBIN_API_TOKEN"})
    }
    if (!body) {
      return res.status(400).json({ error: "Missing body"})
    }

    const url = 'https://pastebin.com/api/api_post.php'
    const payload = new FormData()
    payload.append('api_dev_key', PASTEBIN_API_TOKEN)
    payload.append('api_option', 'paste')
    payload.append('api_paste_code', body.body)
    payload.append('api_paste_format', 'text')
    const response = await fetch(url, {
      method: 'POST',
      body: payload,
    })
    if (response.status !== 200) {
      return res.status(400).json({ error: JSON.stringify(payload) })
    }
    const resUrl = await response.text()
    const id = resUrl.replace('https://pastebin.com/', '')
    res.status(200).json({ body: id });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
