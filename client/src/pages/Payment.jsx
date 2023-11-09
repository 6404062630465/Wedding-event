import { useParams } from "react-router-dom"; // นำเข้า useParams จาก React Router
import { Link } from "react-router-dom";
import qrcode from "../assets/qrcode.jpg";
import NavbarUser from "../components/Navbar-user/NavbarUser";
import Button from "react-bootstrap/Button";

function Payment() {
  // ใช้ useParams เพื่อรับค่าวิธีการชำระเงินจาก URL

  const { paymentMethod } = useParams();

  // กำหนดข้อมูลวิธีการชำระเงิน
  const paymentData = {
    qrCode: {
      title: "ชำระด้วยสแกนคิวอาร์โค้ด",
      description: "สแกนคิวอาร์โค้ดด้านล่างเพื่อทำการชำระเงิน.",
    },
    bankTransfer: {
      title: "โอนผ่านบัญชีธนาคาร",
      description: "โอนเงินผ่านบัญชีธนาคารด้านล่างเพื่อทำการชำระเงิน.",
    },
  };

  
 

  return (
    <>
      <NavbarUser />
      <br />
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <h1>{paymentData[paymentMethod].title}</h1>
        <p>{paymentData[paymentMethod].description}</p>

        
        {paymentMethod === "qrCode" && (
          <>
            <div className="d-flex justify-content-center m-2 p-2 width-20">

              <img src={qrcode} alt="" />
            </div>
          </>
        )}
        {/* แสดงฟอร์มสำหรับโอนผ่านบัญชี */}
        {paymentMethod === "bankTransfer" && (
          <>
            <div className="d-flex-block justify-content-center m-2 p-2">
              <strong>ธนาคารไทยพาณิชย์&nbsp; </strong>
              <strong>ชื่อบัญชี : หุสนา สาและ&nbsp; </strong>
              <strong> เลขบัญชี : &nbsp;</strong>
              <strong
                contentEditable={true}
                onClick={(e) => {
                  const range = document.createRange();
                  range.selectNodeContents(e.target);
                  const selection = window.getSelection();
                  selection.removeAllRanges();
                  selection.addRange(range);
                  document.execCommand("copy");
                  alert("คัดลอกเลขบัญชีแล้ว");
                }}
              >
                2712484924
              </strong>
            </div>
          </>
        )}
        <div className="m-auto mb-3 p-3 d-flex flex-column align-items-center">
        <div>

          <label htmlFor="formFile" className="form-label">
            แนบหลักฐานการชำระเงิน
          </label>
          <input className="form-control" type="file" id="formFile" />
        </div>
        </div>
        <Link to={`/thankyou`}>
          <Button variant="primary">ยืนยันการชำระเงิน</Button>
        </Link>
      </div>
    </>
  );
}

export default Payment;