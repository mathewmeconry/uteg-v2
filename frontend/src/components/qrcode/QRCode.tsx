import { useEffect, useState } from "react";
import { default as QRCodeLib } from "qrcode";
import { Image } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

export type QRCodeProps = {
  value: string;
  inPDF?: boolean;
  margin?: number;
  scale?: number;
};

export type QRCodePropsPDF = QRCodeProps & {
  inPDF: true;
  style?: Style | Style[];
};

export type QRCodePropsReact = QRCodeProps & {
  inPDF?: false;
  style?: React.CSSProperties;
};

export function QRCode(props: QRCodePropsPDF | QRCodePropsReact) {
  const [dataURL, setDataURL] = useState<string>("");

  useEffect(() => {
    QRCodeLib.toDataURL(
      props.value,
      {
        errorCorrectionLevel: "M",
        margin: props.margin ?? 0,
        scale: props.scale ?? 5,
      },
      (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        setDataURL(url);
      }
    );
  }, [props.value, props.margin, props.scale]);

  if (!dataURL) {
    return null;
  }

  if (props.inPDF) {
    return <Image src={dataURL} style={{ ...props.style }} />;
  }

  return <img src={dataURL} style={props.style} />;
}
