// for nodejs v14.17.4 version!
// because i use the current apis to input data, make sure api server is running.
require('dotenv').config({ path: '.env' })
const axios = require('axios').default
const fs = require('fs')

const COMPANY_DIR = 'dbSource/companies'
const API_URL = `http://${process.env.MONGODB_URL}:${process.env.PORT}`

const api = (resource) => `${API_URL}${resource}`

async function companyFiles() {
  const files = await fs.promises.readdir(COMPANY_DIR)
  for (const file of files) {
    const data = await fs.promises.readFile(`${COMPANY_DIR}/${file}`, 'utf-8')
    const source = JSON.parse(data)
    const res = await axios.post(api('/admin/company'), source.company)
    const companyId = res.data._id
    console.log(companyId)

    if (companyId) {
      for (const benton of source.menu) {
        const res = await axios.post(
          api(`/admin/company/${companyId}/benton`),
          benton,
        )
        console.log(res.data)
      }
    } else {
      console.log('errrr ')
      console.log(res.data)
      process.exit(1)
    }
  }
}

function main() {
  console.log(API_URL)
  companyFiles()
}

main()
