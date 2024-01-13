import Head from "next/head";
import QRCodeList from "@/src/components/QRCodeList";
import Button from "@/src/components/Button";
import Link from "@/src/components/Link";
import styles from "@/src/styles/QRCodeListPage.module.css";
import dbConnect from "@/db/dbConnect";
import QRCode from "@/db/models/QRCode";
import axios from "@/src/lib/axios";
import { useState } from "react";

export async function getServerSideProps() {
  await dbConnect();
  const qrCodes = await QRCode.find();

  return {
    props: {
      qrCodes: JSON.parse(JSON.stringify(qrCodes)),
    },
  };
}

export default function QRCodeListPage({ qrCodes: initialQrCodes }) {
  const [qrCodes, setQrCodes] = useState(initialQrCodes);

  const handleDelete = async (id) => {
    await axios.delete(`/qrcodes/${id}`);
    setQrCodes((prevQrCodes) =>
      prevQrCodes.filter((qrCodes) => qrCodes._id !== id)
    );
  };
  return (
    <>
      <Head>
        <title>QRCode 만들기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>QRCode 만들기</h1>
          <Button as={Link} href="/qrcodes/new">
            새로 만들기
          </Button>
        </header>
        <QRCodeList items={qrCodes} onDelete={handleDelete} />
      </div>
    </>
  );
}
