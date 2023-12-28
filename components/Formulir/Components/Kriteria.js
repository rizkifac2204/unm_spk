"use client";

import { useState, useEffect } from "react";

function Kriteria({ keys, TOTAL, kirimDataKeInduk }) {
  const [data, setData] = useState(
    keys.map((item) => {
      const values = {};
      keys.forEach((sub) => {
        values[`value${sub.poin}`] = "";
      });
      return { ...item, ...values };
    })
  );
  const [jumlah, setJumlah] = useState(
    keys.map((item) => {
      const values = {};
      keys.forEach((sub) => {
        values[`jumlah`] = "";
      });
      return { ...item, ...values };
    })
  );
  const [nl, setNl] = useState(
    keys.map((item) => {
      const values = {};
      keys.forEach((sub) => {
        values[`nl${sub.poin}`] = 0;
      });
      values[`pw`] = 0;
      return { ...item, ...values };
    })
  );
  const [rs, setRS] = useState(
    keys.map((item) => {
      const values = {};
      keys.forEach((sub) => {
        values[`rs${sub.poin}`] = 0;
      });
      return { ...item, ...values };
    })
  );

  function autoInput() {
    const autoData = keys.map((item) => {
      const values = {};
      if (item.poin == "J") {
        values[`valueJ`] = "1";
        values[`valueF`] = "0.95";
        values[`valueAJ`] = "1.88";
        values[`valueKB`] = "0.43";
        values[`valueH`] = "1.99";
      }
      if (item.poin == "F") {
        values[`valueJ`] = "1.05";
        values[`valueF`] = "1";
        values[`valueAJ`] = "0.71";
        values[`valueKB`] = "0.95";
        values[`valueH`] = "1.50";
      }
      if (item.poin == "AJ") {
        values[`valueJ`] = "0.51";
        values[`valueF`] = "1.42";
        values[`valueAJ`] = "1";
        values[`valueKB`] = "0.79";
        values[`valueH`] = "2.40";
      }
      if (item.poin == "KB") {
        values[`valueJ`] = "2.34";
        values[`valueF`] = "1.05";
        values[`valueAJ`] = "1.28";
        values[`valueKB`] = "1";
        values[`valueH`] = "4.67";
      }
      if (item.poin == "H") {
        values[`valueJ`] = "0.5";
        values[`valueF`] = "0.67";
        values[`valueAJ`] = "0.42";
        values[`valueKB`] = "0.21";
        values[`valueH`] = "1";
      }
      return { ...item, ...values };
    });
    setData(autoData);

    // Objek untuk menyimpan total masing-masing kunci
    const totals = {};

    autoData.forEach((obj) => {
      // Menjumlahkan nilai yang dimulai dengan kata "value" dari setiap objek
      Object.keys(obj)
        .filter((key) => key.startsWith("value"))
        .forEach((key) => {
          totals[key] = (totals[key] || 0) + parseFloat(obj[key] || 0);
        });
    });

    // Array baru untuk menyimpan hasil perhitungan
    const newArray = Object.keys(totals).map((key) => ({
      poin: key.substring(5),
      key: key,
      jumlah: totals[key],
    }));

    setJumlah(newArray);
  }

  const handleInputChangeAndSetJumlah = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(() => newData);

    const jml = data.reduce(
      (total, item) => total + (parseFloat(item[key]) || 0),
      0
    );
    const newJml = jumlah.map((item) => {
      if (item.key === key) {
        return { ...item, jumlah: jml };
      }
      return item;
    });

    setJumlah(() => newJml);
  };

  const averageNLColumn = (obj, sw) => {
    const totalNlt = Object.keys(obj)
      .filter((key) => key.startsWith(sw))
      .reduce((acc, key) => acc + obj[key], 0);

    return (
      totalNlt / Object.keys(obj).filter((key) => key.startsWith(sw)).length
    );
  };

  const sumRSColumn = (obj, sw) => {
    const total = Object.keys(obj)
      .filter((key) => key.startsWith(sw))
      .reduce((acc, key) => acc + obj[key], 0);

    return total;
  };

  const countRPW = (poin, rsValue) => {
    const pwValue = nl.find((j) => j.poin == poin)?.[`pw`] || 0;
    const hasil = rsValue / pwValue;
    if (isNaN(hasil)) return 0;
    return hasil;
  };

  useEffect(() => {
    const newNl = nl.map((item) => {
      const values = {};
      keys.forEach((sub) => {
        const dataValue =
          data.find((j) => j.poin == item.poin)?.[`value${sub.poin}`] || 0;
        const jumlahValue = jumlah.find((j) => j.poin == sub.poin)?.jumlah || 0;
        const hasil = dataValue / jumlahValue;
        values[`nl${sub.poin}`] = isNaN(hasil) ? 0 : hasil;
      });
      return {
        ...item,
        ...values,
      };
    });

    setNl(() =>
      newNl.map((item) => {
        return { ...item, pw: averageNLColumn(item, "nl") };
      })
    );
  }, [jumlah]);

  const sortNLColumn = (poin) => {
    const newArray = nl
      .map((item) => {
        return { ...item, valuesAverage: averageNLColumn(item, "nl") };
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

  useEffect(() => {
    const newRS = rs
      .map((item, index) => {
        const values = {};
        keys.forEach((sub) => {
          const dataValue =
            data.find((j) => j.poin == item.poin)?.[`value${sub.poin}`] || 0;
          const pwValue = nl.find((j) => j.poin == sub.poin)?.[`pw`] || 0;
          const hasil = dataValue * pwValue;
          values[`rs${sub.poin}`] = hasil;
        });
        return { ...item, ...values };
      })
      .map((item) => {
        const a = sumRSColumn(item, "rs");
        return { ...item, result: a };
      })
      .map((item) => {
        const b = countRPW(item.poin, item.result);
        return { ...item, rpw: b };
      });
    setRS(() => newRS);
  }, [nl]);

  function lamda() {
    const total = rs.reduce((acc, key) => acc + key?.rpw || 0, 0);
    return total / TOTAL;
  }

  function setCi() {
    return (lamda() - TOTAL) / (TOTAL - 1);
  }

  function setCr() {
    return setCi() / 1.12;
  }

  useEffect(() => {
    kirimDataKeInduk(nl);
  }, [nl]);

  return (
    <div className="mt-5 shadow p-2">
      <h1 className="text-xl font-bold mb-4">Kriteria</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 shadow-md">
            <div className="flex justify-between">
              <p className="font-semibold mb-3">Input Nilai</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm mb-3"
                onClick={autoInput}
              >
                Input Otomatis Sesuai Makalah
              </button>
            </div>

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
                                handleInputChangeAndSetJumlah(
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
                      {jumlah.map((j, i) => (
                        <td key={i} className="py-2 px-4 border-b">
                          {parseFloat(j.jumlah || 0).toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 shadow-md">
            <p className="font-semibold mb-6">Normalisasi</p>

            <div className="container mx-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      {nl.map((item, index) => (
                        <th key={index} className="py-2 px-4 border-b">
                          {item.poin}
                        </th>
                      ))}
                      <th className="py-2 px-4 border-b">Rata-Rata</th>
                      <th className="py-2 px-4 border-b">P</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nl.map((n, index) => (
                      <tr key={index}>
                        {keys.map((k, i) => (
                          <td key={i} className="py-2 px-2 border-b">
                            {parseFloat(n[`nl${k.poin}`]).toFixed(2)}
                          </td>
                        ))}
                        <td className="py-2 px-4 border-b">
                          {parseFloat(n.pw).toFixed(2)}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {sortNLColumn(n.poin)}
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
                    {rs.map((item, index) => (
                      <tr key={index}>
                        {keys.map((k, i) => (
                          <td key={i} className="py-2 px-4 border-b">
                            {parseFloat(item[`rs${k.poin}`]).toFixed(2)}
                          </td>
                        ))}
                        <td className="py-2 px-4 border-b">
                          {parseFloat(item?.result).toFixed(2)}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {parseFloat(item?.rpw).toFixed(2)}
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
                    <td className="py-2 px-4 border-b">
                      {parseFloat(lamda()).toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-4 border-b">CI</td>
                    <td className="py-2 px-4 border-b">
                      {parseFloat(setCi()).toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-4 border-b">CR</td>
                    <td className="py-2 px-4 border-b">
                      {parseFloat(setCr()).toFixed(2)}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kriteria;
