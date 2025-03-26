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
  Id: number;
  fromState: string;
  toState: string;
  triggerAction: string;
  catId: string
};
export default function Rules() {
  const [data, setData] = useState<DataItem[]>([]);
  const [sortby, setSortby] = useState<string>("Id");
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

    } catch (error) {

      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {

        const data = { "sortby": sortby, "sorttype": sorttype, "currentPage": currentPage };
        const res = await fetch('/api/rules', {
          method: 'post',
          body: JSON.stringify(data),
        })
        const jsonData = await res.json();
        console.log(jsonData)
        setData(jsonData.result.rules);
        setTotalPages(Math.ceil(parseInt(jsonData.result.count) / 25))
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        //setLoading(false);
      }
    }
    fetchData();
  }, [sortby, sorttype, currentPage]);
  const { t, i18n } = useTranslation();
  const columns = [
    { name: "Id", label: "ID" },
    { name: "fromState", label: "fromState" },
    { name: "toState", label: t("serials.toState") }
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

        <div className="overflow-x-auto">
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
              {data && data.map((item) => (
                <tr key={item.Id} >
                  <td className={tableHeaderClasses}>
                    {item.Id}
                  </td>
                  <td className={tableHeaderClasses}>
                    {item.fromState}
                  </td>
                  <td className={tableHeaderClasses}>
                    {item.toState}
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
          </table></div>
      </Suspense>
    </div>
  );
}
