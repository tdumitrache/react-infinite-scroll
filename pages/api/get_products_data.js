export default async function handler(req, res) {
    try{
       const data = await fetch('https://www.theoutfit.ro/test-react/')
        res.status(200).json(data);
     } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
      }
    }