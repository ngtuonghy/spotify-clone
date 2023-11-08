"use client";

import AuthModal from "@/components/AuthModal";
import EditModal from "@/components/EditModal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <AuthModal />
      <UploadModal />
      <EditModal />
    </div>
  );
};

export default ModalProvider;
