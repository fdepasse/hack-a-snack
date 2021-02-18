function buildObjectLog(obj) {
  if (!Object.keys(obj).length) return 'None'
  return JSON.stringify(obj, null, 4)
}

export default function logger(req, _res, next) {
  console.log(`--------------------------------
🔴 INCOMING REQUEST!
🔴 Request Method: ${req.method}
🔴 Request URL: ${req.url}
😺‍ Request Headers: ${buildObjectLog(req.headers)}
📦 Request Body: ${buildObjectLog(req.body)}
❓ Request Query: ${buildObjectLog(req.query)}
--------------------------------`)

  next()
}