import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Row, Col, Container } from "reactstrap";
import QrRead from "../QrcodeRead";
import LoginForm from "../../components/Login/index";

const QRCode = () => {
  const [showQRCode, setQrCode] = useState(false);
  const [dataQrCode, setDataQrCode] = useState({});

  return (
    <Container>
      <Row className={styles.row}>
        <Col className={styles.col}>
        </Col>
        <Col>
          <LoginForm  data={dataQrCode} />
          <div className={styles.qrContainer}>
            {showQRCode && <QrRead setDataLogin={setDataQrCode} />}
            {
              <button onClick={() => setQrCode(!showQRCode)}>
                Login with Qr Code
              </button>
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default QRCode;
