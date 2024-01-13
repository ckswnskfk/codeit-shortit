import Head from "next/head";
import QRCodeForm from "@/src/components/QRCodeForm";
import styles from "@/src/styles/QRCodeCreatePage.module.css";
import axios from "@/src/lib/axios";
import { useRouter } from "next/router";

export default function QRCodeCreatePage() {
  const router = useRouter();

  const handleSubmit = async (values) => {
    await axios.post("/qrcodes", values);
    router.push("/qrcodes");
  };

  return (
    <>
      <Head>
        <title>새 QRCode 추가 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>새 QRCode 추가</h1>
        <QRCodeForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
