import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { STATIC_TENDERS_V2 } from "./mockData";
import { TenderV2 } from "./types";
import { TenderListV2 } from "./components/TenderListV2";
import { TenderDetailsV2 } from "./components/TenderDetailsV2";
import { TenderUploadModalV2 } from "./components/TenderUploadModalV2";

export default function TendersRepositoryV2Page() {
  const { tenderId } = useParams<{ tenderId?: string }>();
  const navigate = useNavigate();

  const [tenders, setTenders] = useState<TenderV2[]>(STATIC_TENDERS_V2);
  const [selectedTender, setSelectedTender] = useState<TenderV2>(
    STATIC_TENDERS_V2[0],
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // If a tenderId is in the URL, match it
  useEffect(() => {
    if (tenderId) {
      const match = tenders.find(
        (t) =>
          t.id === tenderId ||
          t.tenderNumber.toLowerCase() === tenderId.toLowerCase(),
      );
      if (match) {
        setSelectedTender(match);
      }
    }
  }, [tenderId, tenders]);

  const isDetailsView = Boolean(tenderId);

  const handleOpenTender = (tender: TenderV2) => {
    setSelectedTender(tender);
    navigate(`/tenders-v2/${tender.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToRepository = () => {
    navigate("/tenders-v2");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTenderCreated = (newTender: TenderV2) => {
    setTenders((prev) => [newTender, ...prev]);
    setSelectedTender(newTender);
    navigate(`/tenders-v2/${newTender.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-2">
      {isDetailsView ? (
        <TenderDetailsV2
          tender={selectedTender}
          allTendersCount={tenders.length}
          onBackToRepository={handleBackToRepository}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
        />
      ) : (
        <TenderListV2
          tenders={tenders}
          selectedTender={selectedTender}
          onOpenTender={handleOpenTender}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
        />
      )}

      {/* Upload & Ingest RFP Modal */}
      <TenderUploadModalV2
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onTenderCreated={handleTenderCreated}
      />
    </div>
  );
}
