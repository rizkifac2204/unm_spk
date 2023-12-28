"use client";

import { useState } from "react";

function Info() {
  const [isCollapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Aplikasi Sistem Penunjang Keputusan - Kelompok 3
      </h1>

      <div className="bg-red-100 p-2">
        <div className="container mx-auto">
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleCollapse}
          >
            Klik Untuk Baca Keterangan Terlebih Dahulu
          </button>

          <div
            className={`mt-4 transition-all duration-500 ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            <div className="bg-white p-2">
              <h5>
                <b>- Aplikasi berjalan menggunakan reactjs</b>
              </h5>
              <h5>
                <b>
                  - Karena hanya menjalankan satu proses, aplikasi dirancang
                  tanpa database
                </b>
              </h5>
              <h5>
                <b>- Sistem Login-Logout masih tetap berjalan</b>
              </h5>
              <h5>
                <b>- Berikut keterangan/singkatan yang akan ditemukan</b>
              </h5>
              <div className="p-2">
                <ul>
                  <li>J = Jarak</li>
                  <li>F = Fasilitas</li>
                  <li>AJ = Akses Jalan</li>
                  <li>KB = Kelengkapan Barang</li>
                  <li>H = Hiburan</li>
                </ul>
              </div>
              <h5>
                <b>- Berikut nama Mall yang digunakan sebagai sample</b>
              </h5>
              <div className="p-2">
                <ul>
                  <li>DTS = Depok Town Square</li>
                  <li>MC = Margo City</li>
                  <li>DM = D Mall</li>
                  <li>ID = ITC Depok</li>
                </ul>
              </div>
              <h5>
                <b>- Apa yang harus dilakukan</b>
              </h5>
              <div className="p-2">
                <ol>
                  <li>
                    User menginputkan nilai pada field yang disediakan secara
                    manual
                  </li>
                  <li>
                    User dapat langsung klik pada tombol input otomatis yang
                    akan membuat value sesuai dengan makalah
                  </li>
                  <li>
                    Sistem akan secara otomatis merumuskan perhitungan
                    berdasarkan metode AHP
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
