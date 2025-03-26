import { NextResponse } from 'next/server';
import { getDbConnection } from '../../lib/db';
// import Serials from "../../models/Serials";
// import sequelize from "../../lib/sequelize";


export async function POST(request: Request) {
  // await sequelize.sync();
  // const serials = await Serials.findAll();
  // console.log(serials)
  const pool = await getDbConnection();
  const pool2 = await getDbConnection();
  try {
    //let iccid = JSON.parse(JSON.stringify(request.body))
    const data = await request.json();
    const countquery = "SELECT count(*) as count FROM sims "

    let query = "SELECT * FROM sims "
    if (data.Iccid)
      query += " WHERE Iccid='" + data.Iccid + "'"

    if (data.sortby)
      if (data.sorttype == "ASC")
        query += " order by " + data.sortby + " DESC"
      else
        query += " order by " + data.sortby + " ASC"
    let page = 0;
    if (parseInt(data.currentPage) > 1) {
      page = (data.currentPage - 1) * 25;
    }
    if (data.currentPage)
      query += " OFFSET " + page + " ROWS FETCH FIRST 25 ROWS ONLY"
    // console.log(query)
    // console.log(countquery)
    const result = await pool.request().query(query);
    const countresult = await pool2.request().query(countquery);
    const res = { "status": { "code": "0", "description": "" }, "result": { "simcards": result.recordset, "count": countresult.recordset[0]["count"] } }
    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}