import Head from "next/head";
import { useRouter } from "next/router";

import dbConnect from "@/db/dbConnect";
import QRCode from "@/db/models/QRCode";

import axios from "@/src/lib/axios";
import QRCodeForm, { QRCodeFormType } from "@/src/components/QRCodeForm";
import styles from "@/src/styles/QRCodeEditPage.module.css";

export async function getServerSideProps(context) {
  const { id } = context.query;
  await dbConnect();
  const qrCode = await QRCode.findById(id);

  if (!qrCode) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      qrCode: JSON.parse(JSON.stringify(qrCode)),
    },
  };
}

export default function QRCodeEditPage({ qrCode: initialQrCode }) {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (values) => {
    await axios.patch(`/qrcodes/${id}`, values);
    router.push("/qrcodes");
  };
  return (
    <>
      <Head>
        <title>QRCode 수정하기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>QRCode 수정하기</h1>
        <QRCodeForm
          type={QRCodeFormType.Edit}
          initialValues={initialQrCode}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
