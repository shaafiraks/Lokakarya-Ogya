export interface HistoryTransaksiInterface {
    idHistoryBank: number;
    tanggal : Date;
    norek : number;
    statusKet : number;
    nama : string;
    uang : number;
    noRekTujuan : number;
    NamaTujuan: string;

    noTlp : number;
}
