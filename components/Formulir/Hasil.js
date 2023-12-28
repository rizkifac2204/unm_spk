"use client";
import dynamic from "next/dynamic";
const MyChart = dynamic(() => import("./Diagram"), { ssr: false });
import { useEffect, useState } from "react";

export default function Hasil({
  keys,
  keysAlternatif,
  dataKriteria,
  dataJarak,
  dataFasilitas,
  dataAksesJalan,
  dataKelengkapanBarang,
  dataHiburan,
}) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const [data, setData] = useState(null);
  const [dp, setDp] = useState(
    keysAlternatif.map((item, index) => {
      const values = {};
      keys.forEach((sub) => {
        values[`dp${sub.poin}`] = 0;
      });
      values[`sum`] = 0;
      values[`color`] = COLORS[index];
      values[`title`] = item.title;
      return { poin: item.poin, ...values };
    })
  );

  useEffect(() => {
    const newArray = keysAlternatif?.map((alt) => {
      const newobj = {};

      newobj.poin = alt.poin;
      newobj.J = dataJarak?.find((item) => item.poin == alt.poin)?.pw || "";
      newobj.F = dataFasilitas?.find((item) => item.poin == alt.poin)?.pw || "";
      newobj.AJ =
        dataAksesJalan?.find((item) => item.poin == alt.poin)?.pw || "";
      newobj.KB =
        dataKelengkapanBarang?.find((item) => item.poin == alt.poin)?.pw || "";
      newobj.H = dataHiburan?.find((item) => item.poin == alt.poin)?.pw || "";

      return newobj;
    });

    setData(newArray);
  }, [
    keys,
    keysAlternatif,
    dataKriteria,
    dataJarak,
    dataFasilitas,
    dataAksesJalan,
    dataKelengkapanBarang,
    dataHiburan,
  ]);

  const sumDPColumn = (obj, sw) => {
    const totalNlt = Object.keys(obj)
      .filter((key) => key.startsWith(sw))
      .reduce((acc, key) => acc + obj[key], 0);

    return totalNlt;
  };

  useEffect(() => {
    const newDp = dp.map((item) => {
      const values = {};
      keys.forEach((sub) => {
        const dataValue =
          data?.find((j) => j.poin == item.poin)?.[sub.poin] || 0;
        const jumlahValue =
          dataKriteria?.find((j) => j.poin == sub.poin)?.pw || 0;
        const hasil = dataValue * jumlahValue;
        values[`dp${sub.poin}`] = isNaN(hasil) ? 0 : hasil;
      });
      return {
        ...item,
        ...values,
      };
    });
    setDp(() =>
      newDp.map((item) => {
        return { ...item, sum: sumDPColumn(item, "dp") };
      })
    );
  }, [data]);

  const sortDPColumn = (poin) => {
    const newArray = dp
      .map((item) => {
        return { ...item, valuesAverage: sumDPColumn(item, "dp") };
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

  return (
    <div className="mt-5 shadow p-2">
      <h1 className="text-xl font-bold mb-4">HASIL PERHITUNGAN</h1>
      <div className="container mx-auto">
        <div className="bg-white p-4 shadow-md">
          <div className="container mx-auto mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <tbody>
                  <tr>
                    <td className="py-2 px-2 border-b text-center"></td>
                    {keys.map((item, index) => (
                      <td key={index} className="py-2 px-2 border-b">
                        <b>{item.poin}</b>
                      </td>
                    ))}
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="py-2 px-2 border-b"></td>
                    {dataKriteria?.map((item, index) => (
                      <td key={index} className="py-2 px-2 border-b">
                        {parseFloat(item.pw).toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  {data?.map((n, index) => (
                    <tr key={index}>
                      <td className="py-2 px-2 border-b">{n.poin}</td>
                      {keys.map((k, i) => (
                        <td key={i} className="py-2 px-2 border-b">
                          {parseFloat(n[k.poin] || 0).toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="container mx-auto mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <tbody>
                  <tr>
                    <td className="py-2 px-2 border-b text-center" colSpan={6}>
                      Decision Priority
                    </td>
                    <td className="py-2 px-2 border-b text-center">HASIL</td>
                  </tr>
                </tbody>
                <tbody>
                  {dp?.map((n, index) => (
                    <tr key={index}>
                      <td className="py-2 px-2 border-b">{n.poin}</td>
                      {keys.map((k, i) => (
                        <td key={i} className="py-2 px-2 border-b">
                          {parseFloat(n[`dp${k.poin}`] || 0).toFixed(2)}
                        </td>
                      ))}
                      <td className="py-2 px-2 border-b">
                        <b>{parseFloat(n.sum || 0).toFixed(2)}</b>
                        <span className="ml-5">{`(${sortDPColumn(
                          n.poin
                        )})`}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="container mx-auto">
            <div className="flex jjustify-around">
              <div>
                <MyChart dp={dp} />
              </div>
              <div className="flex items-center justify-center">
                <ul>
                  {dp?.map((item, index) => (
                    <li
                      key={index}
                      className="mb-2 p-2"
                      style={{ backgroundColor: item.color, color: "white" }}
                    >
                      {item.title} = {parseFloat(item.sum || 0).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
