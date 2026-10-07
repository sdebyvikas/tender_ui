import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { STATIC_TENDERS_V2 } from "./mockData";
import { TenderV2 } from "./types";
import { TenderListV2 } from "./components/TenderListV2";
import { TenderDetailsV2 } from "./components/TenderDetailsV2";

export default function TendersRepositoryV2Page() {
  const { tenderId } = useParams<{ tenderId?: string }>();
  const navigate = useNavigate();

  const [selectedTender, setSelectedTender] = useState<TenderV2>(
    STATIC_TENDERS_V2[0],
  );

  // If a tenderId is in the URL, match it
  useEffect(() => {
    if (tenderId) {
      const match = STATIC_TENDERS_V2.find(
        (t) =>
          t.id === tenderId ||
          t.tenderNumber.toLowerCase() === tenderId.toLowerCase(),
      );
      if (match) {
        setSelectedTender(match);
      }
    }
  }, [tenderId]);

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

  return (
    <div className="w-full max-w-7xl mx-auto py-2">
      {isDetailsView ? (
        <TenderDetailsV2
          tender={selectedTender}
          allTendersCount={STATIC_TENDERS_V2.length}
          onBackToRepository={handleBackToRepository}
        />
      ) : (
        <TenderListV2
          tenders={STATIC_TENDERS_V2}
          selectedTender={selectedTender}
          onOpenTender={handleOpenTender}
        />
      )}
    </div>
  );
}
