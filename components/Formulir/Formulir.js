"use client";

import { useState } from "react";

import Kriteria from "./Components/Kriteria";
import Jarak from "./Components/Jarak";
import Fasilitas from "./Components/Fasilitas";
import AksesJalan from "./Components/AksesJalan";
import KelengkapanBarang from "./Components/KelengkapanBarang";
import Hiburan from "./Components/Hiburan";
import Hasil from "./Hasil";

const keys = [
  {
    poin: "J",
    key: "valueJ",
    title: "Jarak",
  },
  {
    poin: "F",
    key: "valueF",
    title: "Fasilitas",
  },
  {
    poin: "AJ",
    key: "valueAJ",
    title: "Akses Jalan",
  },
  {
    poin: "KB",
    key: "valueKB",
    title: "Kelengakapan Barang",
  },
  {
    poin: "H",
    key: "valueH",
    title: "Hiburan",
  },
];
const TOTAL = keys.length;

const keysAlternatif = [
  {
    poin: "DTS",
    key: "valueDTS",
    title: "Depok Town Square",
  },
  {
    poin: "MC",
    key: "valueMC",
    title: "Margo City",
  },
  {
    poin: "DM",
    key: "valueDM",
    title: "D'Mall",
  },
  {
    poin: "ID",
    key: "valueID",
    title: "ITC Depok",
  },
];

function Formulir() {
  const [dataKriteria, setDataKriteria] = useState(null);
  const [dataJarak, setDataJarak] = useState(null);
  const [dataFasilitas, setDataFasilitas] = useState(null);
  const [dataAksesJalan, setDataAksesJalan] = useState(null);
  const [dataKelengkapanBarang, setDataKelengkapanBarang] = useState(null);
  const [dataHiburan, setDataHiburan] = useState(null);

  const terimaDataDariKriteria = (data) => {
    setDataKriteria(data);
  };
  const terimaDataDariJarak = (data) => {
    setDataJarak(data);
  };
  const terimaDataDariFasilitas = (data) => {
    setDataFasilitas(data);
  };
  const terimaDataDariAksesJalan = (data) => {
    setDataAksesJalan(data);
  };
  const terimaDataDariKelengkapanBarang = (data) => {
    setDataKelengkapanBarang(data);
  };
  const terimaDataDariHiburan = (data) => {
    setDataHiburan(data);
  };

  return (
    <>
      <Kriteria
        keys={keys}
        TOTAL={TOTAL}
        kirimDataKeInduk={terimaDataDariKriteria}
      />

      {/* Alternatif  */}
      <Jarak keys={keysAlternatif} kirimDataKeInduk={terimaDataDariJarak} />
      <Fasilitas
        keys={keysAlternatif}
        kirimDataKeInduk={terimaDataDariFasilitas}
      />
      <AksesJalan
        keys={keysAlternatif}
        kirimDataKeInduk={terimaDataDariAksesJalan}
      />
      <KelengkapanBarang
        keys={keysAlternatif}
        kirimDataKeInduk={terimaDataDariKelengkapanBarang}
      />
      <Hiburan keys={keysAlternatif} kirimDataKeInduk={terimaDataDariHiburan} />

      <Hasil
        keys={keys}
        keysAlternatif={keysAlternatif}
        dataKriteria={dataKriteria}
        dataJarak={dataJarak}
        dataFasilitas={dataFasilitas}
        dataAksesJalan={dataAksesJalan}
        dataKelengkapanBarang={dataKelengkapanBarang}
        dataHiburan={dataHiburan}
      />
    </>
  );
}

export default Formulir;
