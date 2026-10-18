/** Hasil memuat data dari CMS: sukses membawa data, gagal membawa pesan agar halaman bisa menampilkan keadaan error. */
export type LoadResult<TData> = { isOk: true; data: TData } | { isOk: false; message: string }

export const loadSafely = async <TData>(
  label: string,
  load: () => Promise<TData>,
): Promise<LoadResult<TData>> => {
  try {
    return { isOk: true, data: await load() }
  } catch (error) {
    console.error(`Gagal memuat ${label} dari CMS`, error)

    return { isOk: false, message: `Konten ${label} belum bisa dimuat.` }
  }
}
