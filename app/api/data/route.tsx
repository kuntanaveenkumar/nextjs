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
    const countquery = "SELECT count(*) as count FROM data "

    let query = "SELECT * FROM dataserials "
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
    console.log(query)
    console.log(countquery)
    const result = await pool.request().query(query);
    const countresult = await pool2.request().query(countquery);
    const res = { "status": { "code": "0", "description": "" }, "result": {"guides":result.recordset,"count":countresult.recordset[0]["count"] } }
    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
/*
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { getDbConnection } from '../../lib/db';

const PROTO_PATH = '../../generated/serials';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
console.log(PROTO_PATH)
const proto = grpc.loadPackageDefinition(packageDefinition).SerialService;
console.log(proto)
const getSerials = async (call:any, callback:any) => {
  const { Iccid, sortby, sorttype, currentPage } = call.request;

  const pool = await getDbConnection();
  const pool2 = await getDbConnection();

  try {
    let query = "SELECT * FROM serials";
    let countquery = "SELECT count(*) as count FROM serials";

    if (Iccid) query += ` WHERE Iccid='${Iccid}'`;

    if (sortby) {
      query += ` ORDER BY ${sortby} ${sorttype === "ASC" ? "ASC" : "DESC"}`;
    }

    let offset = 0;
    if (currentPage > 1) {
      offset = (currentPage - 1) * 25;
    }

    query += ` OFFSET ${offset} ROWS FETCH FIRST 25 ROWS ONLY`;
    console.log(query)
    const result = await pool.request().query(query);
    const countresult = await pool2.request().query(countquery);

    const response = {
      guides: result.recordset,
      count: countresult.recordset[0].count,
    };

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

const server = new grpc.Server();
server.addService(proto.serials, { GetSerials: getSerials });

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('gRPC server running at 127.0.0.1:50051');
server.start();

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
const PROTO_PATH = '../../proto/serials.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).Serials;
import { getDbConnection } from '../../lib/db';

const getSerials = async (call:any, callback:any) => {
  const { Iccid, sortby, sorttype, currentPage } = call.request;

  const pool = await getDbConnection();
  const pool2 = await getDbConnection();

  try {
    let query = "SELECT * FROM serials";
    let countquery = "SELECT count(*) as count FROM serials";

    if (Iccid) query += ` WHERE Iccid='${Iccid}'`;

    if (sortby) {
      query += ` ORDER BY ${sortby} ${sorttype === "ASC" ? "ASC" : "DESC"}`;
    }

    let offset = 0;
    if (currentPage > 1) {
      offset = (currentPage - 1) * 25;
    }

    query += ` OFFSET ${offset} ROWS FETCH FIRST 25 ROWS ONLY`;
    console.log(query)
    const result = await pool.request().query(query);
    const countresult = await pool2.request().query(countquery);

    const response = {
      guides: result.recordset,
      count: countresult.recordset[0].count,
    };

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

const server = new grpc.Server();
server.addService(proto.serials, { GetSerials: getSerials });

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('gRPC server running at http://127.0.0.1:50051');
server.start();
*/