import React from 'react'

import type { Home } from '@/payload-types'

import { AttendanceRecord } from './ui-fragments'

interface ChecksTableProps {
  heading: string
  recordTitle: string
  records: NonNullable<Home['records']>
  rows: NonNullable<Home['checks']>
}

/** Apa saja yang diperiksa setiap kali karyawan absen, disajikan sebagai tabel tanpa garis. */
export const ChecksTable: React.FC<ChecksTableProps> = ({ heading, recordTitle, records, rows }) => {
  const [firstLine, ...restLines] = heading.split(' ')

  return (
    <section className="py-[calc(var(--section)/2)]" aria-labelledby="judul-pemeriksaan">
      <div className="wrap grid12">
        <h2 id="judul-pemeriksaan" data-reveal className="t-big col-span-12 lg:col-span-7">
          <span className="block">{firstLine}</span>
          {restLines.length > 0 && <span className="block md:pl-[16.66%]">{restLines.join(' ')}</span>}
        </h2>
        <div data-reveal className="col-span-12 mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0">
          <AttendanceRecord title={recordTitle} rows={records} />
        </div>

        <table className="col-span-12 mt-16 w-full border-collapse text-left md:mt-20">
          <thead className="sr-only">
            <tr>
              <th scope="col">Yang diperiksa</th>
              <th scope="col">Caranya</th>
              <th scope="col">Hasilnya</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id ?? row.what}
                data-reveal
                className="block py-3 odd:bg-paper-2 md:table-row md:py-0"
              >
                <th scope="row" className="block px-4 pt-1 text-[1.0625rem] font-bold md:table-cell md:w-[22%] md:py-3.5">
                  {row.what}
                </th>
                <td className="block px-4 md:table-cell md:w-[46%] md:py-3.5">{row.how}</td>
                <td className="block px-4 pb-1 font-semibold md:table-cell md:py-3.5 md:text-right">{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
