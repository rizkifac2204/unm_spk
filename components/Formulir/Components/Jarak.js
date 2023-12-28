"use client";
import { useState, useEffect } from "react";

function Jarak({ keys, kirimDataKeInduk }) {
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

  function autoInput() {
    const autoData = keys.map((item) => {
      const values = {};
      if (item.poin == "DTS") {
        values[`valueDTS`] = "1";
        values[`valueMC`] = "0.25";
        values[`valueDM`] = "3";
        values[`valueID`] = "6";
      }
      if (item.poin == "MC") {
        values[`valueDTS`] = "4";
        values[`valueMC`] = "1";
        values[`valueDM`] = "0.2";
        values[`valueID`] = "5";
      }
      if (item.poin == "DM") {
        values[`valueDTS`] = "0.33";
        values[`valueMC`] = "5";
        values[`valueDM`] = "1";
        values[`valueID`] = "4";
      }
      if (item.poin == "ID") {
        values[`valueDTS`] = "0.17";
        values[`valueMC`] = "0.2";
        values[`valueDM`] = "0.25";
        values[`valueID`] = "1";
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

  useEffect(() => {
    kirimDataKeInduk(nl);
  }, [nl]);

  return (
    <div className="mt-5 shadow p-2">
      <h1 className="text-xl font-bold mb-4">Alternatif Jarak</h1>
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
                      <th className="py-2 px-4 border-b">JARAK</th>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jarak;
