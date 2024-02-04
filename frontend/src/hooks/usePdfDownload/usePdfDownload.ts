import { usePDF } from "@react-pdf/renderer";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useDeferredPromise } from "../useDeferredPromise/useDeferredPromise";

export type usePdfDownloadProps = {
  document?: ReactElement;
  filename?: string;
};

export function usePdfDownload({
  document: documentParam,
  filename: filenameParam,
}: usePdfDownloadProps) {
  const [updating, setUpdating] = useState(false);
  const [pdfInstance, updatePdfInstance] = usePDF({
    document: documentParam,
  });
  const currentDocument = useRef<ReactElement>();
  if (documentParam) {
    currentDocument.current = documentParam;
  }
  const filename = useRef<string>(filenameParam || "");
  const pdfUrl = useRef<string>("");
  const {
    promise: updatePromise,
    defer: getUpdatePromise,
  } = useDeferredPromise<void>();

  useEffect(() => {
    if (!pdfInstance.loading && pdfInstance.url) {
      setUpdating(false);
      pdfUrl.current = pdfInstance.url;
      updatePromise?.resolve();
    }
    if (!pdfInstance.loading && pdfInstance.error) {
      setUpdating(false);
      updatePromise?.reject(pdfInstance.error);
    }
  }, [pdfInstance, updating, updatePromise]);

  function updateDocument({
    document: newDocument,
    filename: newFilename,
  }: usePdfDownloadProps): Promise<void> {
    const promise = getUpdatePromise();

    if (
      newDocument &&
      !propsEqual(currentDocument.current?.props, newDocument)
    ) {
      currentDocument.current = newDocument;
      setUpdating(true);
      updatePdfInstance(newDocument);
    } else {
      setUpdating(false);
      promise.resolve();
    }

    if (newFilename) {
      filename.current = newFilename;
    }

    return promise.promise;
  }

  function downloadDocument(filenameOverride?: string) {
    if ((filenameOverride || filename.current) && pdfUrl.current) {
      const link = document.createElement("a");
      link.href = pdfUrl.current;
      link.setAttribute("download", filenameOverride ?? filename.current);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
    }
  }

  function propsEqual(
    a: { [index: string]: any } = {},
    b: { [index: string]: any } = {}
  ) {
    const oldPropsKeys = Object.keys(a);
    const newPropsKeys = Object.keys(b);

    if (oldPropsKeys.length !== newPropsKeys.length) {
      return false;
    }

    for (let i = 0; i < oldPropsKeys.length; i += 1) {
      const propName = oldPropsKeys[i];

      if (propName === "render" && !a[propName] !== !b[propName]) {
        return false;
      }

      if (propName !== "children" && a[propName] !== b[propName]) {
        if (
          typeof a[propName] === "object" &&
          typeof b[propName] === "object" &&
          propsEqual(a[propName], b[propName])
        ) {
          continue;
        }

        return false;
      }

      if (
        propName === "children" &&
        (typeof a[propName] === "string" || typeof b[propName] === "string")
      ) {
        return a[propName] === b[propName];
      }
    }

    return true;
  }

  return {
    download: downloadDocument,
    update: updateDocument,
    loading: updating,
    loadingPromise: updatePromise?.promise,
  };
}
