"use client";

import { useState } from "react";

const keys = [
  {
    poin: "t1",
    title: "title 1",
  },
  {
    poin: "t2",
    title: "title 2",
  },
  {
    poin: "t3",
    title: "title 3",
  },
  {
    poin: "t4",
    title: "title 4",
  },
  {
    poin: "t5",
    title: "title 5",
  },
];

const initialData = keys.map((item) => {
  const values = {};
  keys.forEach((sub) => {
    values[`value${sub.poin}`] = "";
  });
  return { ...item, ...values };
});

function Utama() {
  const [data, setData] = useState(initialData);

  const handleInputChange = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  const calculateColumnTotal = (columnName) => {
    return data.reduce(
      (total, item) => total + (parseFloat(item[columnName]) || 0),
      0
    );
  };

  const divisionNLColumn = (columnName, value) => {
    const totalColumn = parseFloat(calculateColumnTotal(columnName));
    const parsedValue = parseFloat(value);

    if (isNaN(totalColumn) || isNaN(parsedValue) || totalColumn === 0) {
      return 0; // atau nilai default sesuai kebutuhan Anda
    }

    return parsedValue / totalColumn;
  };

  const averageNLColumn = (obj) => {
    const keysToSum = ["valuet1", "valuet2", "valuet3", "valuet4", "valuet5"];
    const sum = keysToSum.reduce(
      (acc, key) => acc + (parseFloat(divisionNLColumn(key, obj[key])) || 0),
      0
    );
    return sum / 5;
  };

  const sortNLColumn = (poin) => {
    const newArray = data
      .map((item) => {
        return { ...item, valuesAverage: averageNLColumn(item) };
      })
      .sort((a, b) => {
        // Jika salah satu dari valuesAverage kosong, letakkan di akhir
        if (!a.valuesAverage && b.valuesAverage) return 1;
        if (a.valuesAverage && !b.valuesAverage) return -1;
        // Mengurutkan berdasarkan valuesAverage dari terbesar ke terkecil
        return (
          parseFloat(b.valuesAverage || 0) - parseFloat(a.valuesAverage || 0)
        );
      });

    const findingIndex = newArray.findIndex((item) => item.poin === poin);

    return findingIndex + 1;
  };

  const multiplicationColumn = (objSpecific, value) => {
    const parsedValue = parseFloat(value);
    const averageColumnValue = parseFloat(averageNLColumn(objSpecific));

    if (
      isNaN(averageColumnValue) ||
      isNaN(parsedValue) ||
      averageColumnValue === 0
    ) {
      return 0;
    }

    return averageColumnValue * parsedValue;
  };

  const sumColumnResult = (index) => {
    const keysToSum = ["valuet1", "valuet2", "valuet3", "valuet4", "valuet5"];
    const sum = keysToSum.reduce(
      (acc, key) =>
        acc +
        (parseFloat(multiplicationColumn(data[index], data[index][key])) || 0),
      0
    );
    return 0;
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Aplikasi Sistem Penunjang Keputusan - Kelompok 3
        </h1>

        {/* <ul>
          {keys.map((item, idx) => (
            <li key={idx}>{JSON.stringify(item)}</li>
          ))}
        </ul>
        <ul>
          {data.map((item, idx) => (
            <li key={idx}>{JSON.stringify(item)}</li>
          ))}
        </ul> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 shadow-md">
            <p className="font-semibold mb-3">Input Nilai</p>

            <div className="container mx-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Kriteria</th>
                    {keys.map((item, i) => (
                      <th key={i} className="py-2 px-4 border-b">
                        {item.poin}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-2 border-b">{item.poin}</td>

                      {keys.map((k, i) => (
                        <td key={i} className="py-2 px-2 border-b">
                          <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            value={item[`value${k.poin}`]}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                `value${k.poin}`,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}

                  <tr>
                    <td className="py-2 px-4 border-b">Jumlah</td>
                    {keys.map((k, i) => (
                      <td key={i} className="py-2 px-4 border-b">
                        {parseFloat(
                          calculateColumnTotal(`value${k.poin}`)
                        ).toFixed(2)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-4 shadow-md">
            <p className="font-semibold mb-3">Normalisasi</p>

            <div className="container mx-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    {keys.map((item, index) => (
                      <th key={index} className="py-2 px-4 border-b">
                        {item.poin}
                      </th>
                    ))}
                    <th className="py-2 px-4 border-b">PW</th>
                    <th className="py-2 px-4 border-b">P</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      {keys.map((k, i) => (
                        <td key={i} className="py-2 px-4 border-b">
                          {parseFloat(
                            divisionNLColumn(
                              `value${k.poin}`,
                              item[`value${k.poin}`]
                            )
                          ).toFixed(2)}
                        </td>
                      ))}
                      <td className="py-2 px-4 border-b">
                        {parseFloat(averageNLColumn(item)).toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {sortNLColumn(item.poin)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9 bg-white p-4 shadow-md">
            <div className="container mx-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th colSpan={5} className="py-2 px-4 border-b"></th>
                    <th className="py-2 px-4 border-b">Result</th>
                    <th className="py-2 px-4 border-b">R/PW</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      {keys.map((k, i) => (
                        <td key={i} className="py-2 px-4 border-b">
                          {parseFloat(
                            multiplicationColumn(
                              data[i],
                              item[`value${k.poin}`]
                            )
                          ).toFixed(2)}
                        </td>
                      ))}
                      <td className="py-2 px-4 border-b">
                        {parseFloat(sumColumnResult(index)).toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b">-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-3 bg-white p-4 shadow-md">
            <div className="container mx-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">lamda max</td>
                    <td className="py-2 px-4 border-b">-</td>
                  </tr>

                  <tr>
                    <td className="py-2 px-4 border-b">CI</td>
                    <td className="py-2 px-4 border-b">-</td>
                  </tr>

                  <tr>
                    <td className="py-2 px-4 border-b">CR</td>
                    <td className="py-2 px-4 border-b">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Utama;
