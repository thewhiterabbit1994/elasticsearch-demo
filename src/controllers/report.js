import Report from 'models/report'

import writeSingleReport from '@lib/elastic/write/report'

// this could be dealt with better but this suffice
// usually I put these functions in utils folder but right now this is a good place
const isReportValid = report => {
  return !(
    !report.title ||
    !report.description ||
    !report.location ||
    !report.location.lat ||
    !report.location.lon
  )
}

const submitReport = async (req, res) => {

  if (!isReportValid(req.body)) return res.status(522).json({ msg: 'bad inputs' });
  
  try {

    const thisReport = await Report.create(req.body)

    // were intreseted in the plain object not the mongoos doc, hence deepClone
    writeSingleReport(deepClone(thisReport))

    res.status(200).json({ msg: 'ok' })
    
  } catch (error) {
    print('error in submit report')
    res.status(500).json({ msg: error.message })
  }
}

export default {
  submitReport
}