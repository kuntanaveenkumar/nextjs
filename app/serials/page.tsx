'use client'
import React, { useEffect, useState, FormEvent } from 'react';
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
const Pagination = dynamic(() => import('../pagination'), {
  loading: () => <p>Loading...</p>,
});
import { useTranslation } from "react-i18next";
type DataItem = {
  id: number;
  Iccid: string;
  name: string;
  deviceId: string;
  firmware: string;
  date1: string;
  date2: string;
  ratePlan: string;
  communicationPlan: string;
  client: string;
  rtype: string;
};
/*
import { grpc } from "@improbable-eng/grpc-web";
import { GetSerialsRequest } from './proto/service_pb'; // Generated from your .proto file
import { SerialService } from './proto/service_pb_service'; // Generated from your .proto file

const makeGrpcRequest = () => {
  const request = new GetSerialsRequest();
  request.setIccid("someIccid");
  request.setSortby("sortColumn");
  request.setSorttype("ASC");
  request.setCurrentPage(1);

  grpc.unary(SerialService.GetSerials, {
    request: request,
    host: "http://localhost:50051", // Your gRPC-web proxy server
    onEnd: (response) => {
      if (response.status === grpc.Code.OK) {
        console.log("gRPC Response: ", response.message);
      } else {
        console.error("gRPC Error: ", response.status);
      }
    },
  });
};
*/
export default function Serials() {
  const [data, setData] = useState<DataItem[]>([]);
  const [iccid, setIccid] = useState<string>();
  //const [loading, setLoading] = useState<boolean>(true);
  const [sortby, setSortby] = useState<string>("id");
  const [sorttype, setSorttype] = useState<string>("ASC");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10000);
  //const limit = useState<number>(25)
  const ShimmerTable = () => {
    return (
      <div className="w-full p-4">
        <div className="overflow-hidden border border-gray-300 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {Array.from({ length: 5 }).map((_, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 bg-gray-200 shimmer h-8 rounded"
                  ></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 5 }).map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 h-8 bg-gray-100 shimmer rounded"
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  async function getSerial(Iccid: string) {
    setIccid(Iccid)
  }
  const SortBy = (column: string) => {
    if (sorttype === column) {

      setSorttype(sortby === "ASC" ? "DESC" : "ASC");
    } else {

      setSortby(column);
      setSorttype("ASC");
    }
  };
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    try {
      console.log(event.currentTarget.name)
      const formData = new FormData(event.currentTarget)
      console.log(formData.get('name'))
      setIccid(formData.get('name') as string)
    } catch (error) {

      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const data = { "Iccid": iccid, "sortby": sortby, "sorttype": sorttype, "currentPage": currentPage };
        const res = await fetch('/api/data', {
          method: 'post',
          body: JSON.stringify(data),
        })
        const jsonData = await res.json();
        setData(jsonData.result.guides);
        setTotalPages(Math.ceil(parseInt(jsonData.result.count) / 25))
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        //setLoading(false);
      }
    }
    fetchData();
  }, [iccid, sortby, sorttype, currentPage]);
  const { t, i18n } = useTranslation();
  const columns = [
    { name: "id", label: "ID" },
    { name: "deviceId", label: "DeviceId" },
    { name: "firmware", label: t("serials.firmware") },
    { name: "date1", label: "Date1" },
    { name: "date2", label: "Date2" },
    { name: "ratePlan", label: t("serials.ratePlan") },
    { name: "communicationPlan", label: t("serials.communicationPlan") },
    { name: "client", label: "Client" },
    { name: "rtype", label: "Rtype" }
  ];

  const sortIcon = (column: string) => {
    return sortby === column
      ? sorttype === "ASC"
        ? <BsArrowDownCircle />
        : <BsArrowUpCircle />
      : null;
  };

  const tableHeaderClasses = "border border-slate-300 ...";

  return (
    <div>
      <Suspense fallback={<ShimmerTable />}>
        {
          iccid ? <div>
            {data.map((item) => (
              <div key={item.id} >
                Iccid: {item.Iccid}<br />
                Name:{item.name}

              </div>
            ))}
          </div> : <div className="overflow-x-auto">
            <form onSubmit={onSubmit} method="">
              <input type="text" name="name" />
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </form>
            <button onClick={() => i18n.changeLanguage("en")}>English</button>
            <button onClick={() => i18n.changeLanguage("fr")}>Français</button>
            <h1>{t("greeting")}</h1>
            <table cellPadding={5} cellSpacing={5} className="table-auto w-full border-collapse  border border-slate-400 ..." >
              <thead className="bg-fortinred text-white">
                <tr>
                  {columns && columns.map(({ name, label }) => (
                    <th
                      key={name}
                      onClick={() => SortBy(name)}
                      className={tableHeaderClasses}
                    >
                      {sortIcon(name)} {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} onClick={() => getSerial(item.Iccid)}>
                    <td className={tableHeaderClasses}>
                      {item.Iccid}
                    </td>
                    <td className={tableHeaderClasses}>
                      {item.deviceId}
                    </td>
                    <td className={tableHeaderClasses}>
                      {item.firmware}
                    </td>
                    <td className={tableHeaderClasses}>
                      {item.date1}
                    </td>
                    <td className={tableHeaderClasses}>
                      {item.date2}
                    </td>
                    <td className={tableHeaderClasses}>
                      {item.ratePlan}
                    </td>
                    <td className={tableHeaderClasses}>
                      {item.communicationPlan}
                    </td>
                    <td className={tableHeaderClasses}>
                      {item.client}
                    </td>
                    <td className={tableHeaderClasses}>
                      {item.rtype}
                    </td>
                  </tr>
                ))}
                <tr><td colSpan={8}>
                  <Pagination
                    nPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  /></td></tr>
              </tbody>
            </table></div>}
      </Suspense>
    </div>
  );
}
