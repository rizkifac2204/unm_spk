"use client";

import { useState } from "react";

const keys = [
  {
    poin: "t1",
    key: "valuet1",
    title: "title 1",
    rpw: "",
  },
  {
    poin: "t2",
    key: "valuet2",
    title: "title 2",
    rpw: "",
  },
  {
    poin: "t3",
    key: "valuet3",
    title: "title 3",
    rpw: "",
  },
  {
    poin: "t4",
    key: "valuet4",
    title: "title 4",
    rpw: "",
  },
  {
    poin: "t5",
    key: "valuet5",
    title: "title 5",
    rpw: "",
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

  const keysToSum = keys.map((item) => {
    return item.key;
  });

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

  const sumColumnResultReCount = (obj) => {
    const newArray = keys.map((k, i) => {
      const toSum = parseFloat(
        multiplicationColumn(data[i], obj[`value${k.poin}`])
      );

      return { ...k, toSum };
    });

    const sum = newArray.reduce(
      (prev, key) => prev + (parseFloat(key[`toSum`]) || 0),
      0
    );

    return sum;
  };

  const rpw = (r, pw) => {
    const a = parseFloat(r) || 0;
    const b = parseFloat(pw) || 0;
    const hasil = parseFloat(a / b).toFixed(2);
    if (isNaN(hasil)) return 0;
    return hasil;
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Aplikasi Sistem Penunjang Keputusan - Kelompok 3
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 shadow-md">
            <p className="font-semibold mb-3">Input Nilai</p>

            <div className="container mx-auto">
              <div className="overflow-x-auto">
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
          </div>

          <div className="bg-white p-4 shadow-md">
            <p className="font-semibold mb-3">Normalisasi</p>

            <div className="container mx-auto">
              <div className="overflow-x-auto">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 bg-white p-4 shadow-md">
            <div className="container mx-auto">
              <div className="overflow-x-auto">
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
                          {parseFloat(sumColumnResultReCount(item)).toFixed(2)}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {rpw(
                            sumColumnResultReCount(item),
                            averageNLColumn(item)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 shadow-md">
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
